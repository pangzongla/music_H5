<!--迷你播放器-->
<template>
  <div>
    <div v-show="!fullScreen" class="mini-player">
      <!--歌名显示区域-->
      <div class="player-info" @click="toggleShow(true)">
        <div class="player-img rotate" :class="rotateStop">
          <img :src="songImg" alt="">
        </div>
        <div>
          <p class="player-name">{{songName}}</p>
          <p class="player-artists">
            <span v-for="(item, index) in songArtists" :key="index">{{item.name}}</span>
          </p>
        </div>
      </div>
      <!--播放键区域-->
      <div class="player-operate">
        <i class="iconfont icon-op" @click="togglePlay" :class="playIcon"></i>
        <i class="iconfont icon-xiayiqu" @click="next"></i>
      </div>
      <!--进度条-->
      <div class="mini-progress" :style="{width:`${barPercent}`}"></div>
    </div>
<!--全屏音乐播放器-->
    <transition name="player">
      <div class="player" v-show="fullScreen" :style="{'backgroundImage': `url(${songImg})`}">
        <div class="player-mask"></div>
        <!--顶部区域-->
        <div class="player-header">
          <i class="iconfont icon-xia" @click="toggleShow(false)"></i>
          <div class="header-info">
            <p>{{songName}}</p>
            <p class="header-artists">
              <span v-for="(item, index) in songArtists" :key="index">{{item.name}}</span>
            </p>
          </div>
        </div>
        <!--中间区域-->
        <swiper class="swiper-container" :options="swiperOption">
           <!--转盘-->
          <swiper-slide class="img-container">
            <img class="rotate" :class="rotateStop" :src="songImg" alt="">
            <i class="iconfont icon-xiai" :class="{'icon-xiai-red': isLove}" @click="addToLove"></i>
          </swiper-slide>
          <!--歌词-->
          <swiper-slide class="lyric-container">
            <scroll ref="lyricScroll" class="lyric-scroll">
              <div>
                <ul v-if="lyricLines.length > 0">
                  <li ref="lyricLine" class="list-item" :class="{'active': index === currentLineNumber}" v-for="(item, index) in lyricLines" :key="index">
                    {{item.txt}}
                  </li>
                </ul>
                <div v-else>暂无歌词</div>
              </div>
            </scroll>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!--底部区域-->
        <div class="player-operate">
          <div class="operate-mask"></div>
          <div class="progress">
            <span class="time">{{formatTime(currentTime)}}</span>
            <!--进度条-->
            <div class="progress-bar" ref="progressBar" @click="progressClick">
              <div class="bar-moved" :style="{width: `${barPercent}`}"></div>
              <div class="bar-btn" :style="{left: `${barPercent}`}" @touchmove.prevent = "progressMove" @touchend="progressEnd"></div>
            </div>
            <span class="time">{{formatTime(overTime)}}</span>
          </div>
          <div class="operate-icon">
            <i class="iconfont ft-40" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont icon-shangyiqu ft-80" @click="prev"></i>
            <i class="iconfont ft-100" @click="togglePlay" :class="playIcon"></i>
            <i class="iconfont icon-xiayiqu ft-80" @click="next"></i>
            <i class="iconfont icon-more ft-40" @click="togglePlayListShow"></i>
          </div>
        </div>
      </div>
    </transition>
    <!--。。。的页面-->
    <div v-if="playListShow" class="playlist-mask" @click="togglePlayListShow"></div>
    <transition name="playList">
      <scroll v-if="playListShow" class="playList-scroll">
        <ul>
          <li v-for="(item, index) in playList" :key="index" @click="addToPlay(index)">
            <p>{{item.name}} - <span class="artists-name" v-for="(arItem, arIndex) in item.ar" :key="arIndex">{{arItem.name}}</span></p>
            <i class="iconfont icon-shanchu2" @click.stop="delFromPlayList(item)"></i>
          </li>
        </ul>
        <div class="close" @click="togglePlayListShow">关闭</div>
      </scroll>
    </transition>
<!--播放器-->
    <audio :src="musicData.url" ref="audio" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex';
  import { playMode } from '../common/js/aliasConfig';
  // eslint-disable-next-line import/extensions
  import scroll from './scroll';

  export default {
    name: 'player',
    components: {
      scroll
    },
    data() {
      return {
        // 全局播放器开关
        fullScreen: false,
        // 歌词区轮播图切换的设置
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        // 存放歌曲的资源
        musicData: {},
        // 存放歌曲歌词的资源
        lyricData: null,
        // 是否正在播放
        playing: false,
        loaded: false,
        // 存放歌曲现在的播放时间
        currentTime: 0,
        // 存放歌曲的结束时间
        overTime: 0,
        // 控制要不要实时获取进度条时间的开关
        touchBarWillMove: false,
        // 格式化处理好后的歌词信息
        lyricLines: [],
        // 存储到哪句歌词的信息
        currentLineNumber: 0,
        // 是否显示。。。
        playListShow: false
      };
    },
    computed: {
      ...mapGetters([
        'isFullScreen',
        'playList',
        'sequencesList',
        'currentIndex',
        'nowMode',
        'currentSong',
        'isLove'
      ]),
      // 判断当前是否有歌曲播放，有的话就显示，没有的话就...
      // 歌名
      songName() {
        return this.currentSong ? this.currentSong.name : '暂无播放歌曲';
      },
      // 歌手
      songArtists() {
        return this.currentSong ? this.currentSong.ar : [];
      },
      // 图片
      songImg() {
        return this.currentSong && this.currentSong.al.picUrl ? `${this.currentSong.al.picUrl}?param=400y400` : require('../assets/image/user-bg.png');
      },
      // 判断歌曲是否正在播放给予对应图标
      playIcon() {
        return this.playing ? 'icon-bofang' : 'icon-zanting';
      },
      // 判断播放模式给予对应图标
      modeIcon() {
        // eslint-disable-next-line no-nested-ternary
        return this.nowMode === playMode.sequences ? 'icon-liebiaoxunhuan' : (this.nowMode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suiji');
      },
      // 计算歌曲进度条百分比
      barPercent() {
        let p = this.currentTime / this.overTime;
        if (p === 0) {
          return 0;
        }
        p = Number(p * 100).toFixed();
        return `${p}%`;
      },
      // 判断是否要旋转光盘
      rotateStop() {
        return this.playing ? '' : 'rotate-stop';
      }
    },
    watch: {
      // 如果正在播放的歌曲发生变化（和还有没播放歌曲时要求播放歌曲），那么重新请求歌曲播放资源地址
      currentSong(newVal, oldVal) {
        if (oldVal === undefined || newVal.id !== oldVal.id) {
          this.getMusicUrl(newVal.id);
          this.getLyricData(newVal.id);
        }
      }
    },
    methods: {
      ...mapMutations([
        'SET_FULLSCREEN',
        'SET_CURRENT_INDEX',
        'SET_MODE',
        'SET_PLAY_LIST',
        'DEL_FROM_PLAY_LIST',
        'SET_HISTORY_LIST',
        'SET_LOVE_LIST',
        'DEL_FROM_LOVE_LIST'
      ]),
      // 点击是否全屏显示播放器
      toggleShow(val) {
        this.fullScreen = val;
      },
      // 请求歌曲播放资源
      async getMusicUrl(id) {
        const { data } = await axios.get(`/song/url?id=${id}`);
        if (data.code === 200 && data.data[0].code === 200) {
          // 获取歌曲资源并且保存
          // eslint-disable-next-line prefer-destructuring
          this.musicData = data.data[0];
          // 等dom数即时渲染完毕
          this.$nextTick(() => {
            this.togglePlay(true);
            this.SET_HISTORY_LIST(this.currentSong);
          });
        }
      },
      // 请歌词的资源
      async getLyricData(id) {
        const { data } = await axios.get(`/lyric?id=${id}`);
        if (data.code === 200 && data.lrc) {
          // 获取歌词并保存
          this.lyricData = data.lrc.lyric;
          this.initLines();
        } else {
          this.lyricData = null;
        }
      },
      // 点击播放按钮
      togglePlay(val) {
        // 没有歌曲正在播放就什么都不做
        if (!this.currentSong) return;
        // 如果传入判断，就赋值判断
        if (val === true || val === false) {
          this.playing = val;
        } else {
          // 没有传入就取反
          this.playing = !this.playing;
        }
        // 判断播放器是播放还是暂停
        if (this.playing) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      },
      // 点击上一首
      prev() {
        const len = this.playList.length;
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
          newIndex = len - 1;
        }
        this.SET_CURRENT_INDEX(newIndex);
      },
      // 点击下一首
      next() {
        const len = this.playList.length;
        let newIndex = this.currentIndex + 1;
        if (newIndex === len) {
          newIndex = 0;
        }
        this.SET_CURRENT_INDEX(newIndex);
      },
      // 点击更改播放模式
      changeMode() {
        const modeNumber = (this.nowMode + 1) % 3;
        this.SET_MODE(modeNumber);
        // 创建一个临时播放列表
        let newPlayList = [];
        // 如果是随机模式就触发生成随机歌曲列表的方法，放进临时播放列表内
        if (this.nowMode === playMode.random) {
          newPlayList = this.getRandomList(this.sequencesList);
        } else {
          // 不是就正序播放，放进临时列表
          newPlayList = this.sequencesList;
        }
        // 将临时列表中正在播放的歌曲下标，并将临时播放单存入state中
        const newIndex = newPlayList.findIndex((item) => item.id === this.currentSong.id);
        this.SET_PLAY_LIST(newPlayList);
        this.SET_CURRENT_INDEX(newIndex);
      },
      // 处理成随机播放歌曲列表
      getRandomList(arr) {
        const newArr = [].concat(arr);
        // eslint-disable-next-line no-unused-vars
        return newArr.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
      },
      // 当歌曲播放结束时，自动执行
      end() {
        if (this.nowMode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      // 循环播放的逻辑
      loop() {
        this.$refs.audio.currenTime = 0;
        this.$refs.audio.play();
      },
      songLoad() {
        this.loaded = true;
      },
      // 在歌曲播放的时候：不断更新歌曲现在播放的时间和播放结束的时间
      updateTime(e) {
        // 加入这个开关防止播放的时候拖动进度条出现跳动的情况
        if (!this.touchBarWillMove) {
          this.currentTime = e.target.currentTime;
          this.overTime = e.target.duration;
        }
        // 有歌词时，就滚动歌词
        if (this.lyricData) {
          this.moveLyric();
        }
      },
      // 将播放时间处理成00:00的格式
      formatTime(val) {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(val)) return '00:00';
        let m = Math.floor(val / 60);
        let s = Math.floor(val % 60);
        if (m < 10) {
          m = `0${m}`;
        }
        if (s < 10) {
          s = `0${s}`;
        }
        return `${m}:${s}`;
      },
      // -----------------------------------------------------------------------------重点多看
      // 获取鼠标点击时触摸点在进度条框的可操作区的x轴
      progressMove(e) {
        this.touchBarWillMove = true;
        const touchPageX = e.touches[0].pageX;
        this.calcPercent(touchPageX);
      },
      // 点击进度条播放歌曲逻辑
      progressClick(e) {
        this.touchBarWillMove = true;
        const touchPageX = e.pageX;
        this.calcPercent(touchPageX);
        this.resetPlayer();
      },
      // 拖动进度条改变歌曲时间的逻辑
      calcPercent(x) {
        // 获取进度条框与左边的距离和自身的宽度
        const innerLeft = this.$refs.progressBar.offsetLeft;
        const barWidth = this.$refs.progressBar.clientWidth;
        // 获取进度条的长度
        let movedWidth = x - innerLeft;
        // 控制进度条不要超出进度框
        if (movedWidth > barWidth) movedWidth = barWidth;
        if (movedWidth < 0) movedWidth = 0;
        // let songScale = movedWidth / barWidth;
        // 获取即时的时间
        this.currentTime = this.overTime * (movedWidth / barWidth);
        // 滚动歌词
        this.moveLyric();
      },
      // 鼠标松开进度条后，歌曲按拖动的时间播放
      progressEnd() {
        this.resetPlayer();
      },
      // 更新播放
      resetPlayer() {
        this.$refs.audio.currentTime = this.currentTime;
        this.togglePlay(true);
        this.touchBarWillMove = false;
      },
      // 对歌词数据进行格式化处理
      initLines() {
        this.lyricLines = [];
        if (this.lyricData) {
          const lines = this.lyricData.split('\n');
          // eslint-disable-next-line no-plusplus,no-empty
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // 正则表达式把时间分成分和秒
            const timeExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/g;
            const result = timeExp.exec(line);
            // console.log(result);
            if (result) {
              // 把时间全部转换成毫秒
              const time = Number(result[1] * 60 * 1000) + Number(result[2] * 1000);
              // 把时间格式剔除，得到纯歌词
              const txt = line.replace(timeExp, '').trim();
              // 格式化歌词
              this.lyricLines.push({
                time,
                txt
              });
            }
          }
        }
      },
      // 滚动歌词的方法
      moveLyric() {
        this.currentLineNumber = this.findCurrentNumber(this.currentTime * 1000);
        // 当到第七句歌词时，开始滚动歌词
        if (this.currentLineNumber > 6) {
          this.$refs.lyricScroll.scrollToElement(this.$refs.lyricLine[this.currentLineNumber - 6], 1000);
        } else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000);
        }
      },
      // 找到现在播放到哪句歌词
      findCurrentNumber(time) {
        // 当现在的歌曲时间点小于歌词时间点时返回下标，返回的也就是正在唱的那一句歌词的下标
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.lyricLines.length; i++) {
          if (time < this.lyricLines[i].time) {
            return i - 1;
          }
        }
        // 当到最后一句歌词时，一直展示到合区结束
        return this.lyricLines.length - 1;
      },
      // 显示。。。内容
      togglePlayListShow() {
        this.playListShow = !this.playListShow;
      },
      // 点击。。。里面的歌曲插入播放
      addToPlay(index) {
        this.SET_CURRENT_INDEX(index);
        this.togglePlayListShow();
      },
      // 点击。。。里的删除
      delFromPlayList(item) {
        this.DEL_FROM_PLAY_LIST({
          delSong: item,
          curSong: this.currentSong
        });
      },
      // 添加到喜爱歌曲的列表
      addToLove() {
        if (this.isLove) {
          this.DEL_FROM_LOVE_LIST(this.currentSong);
        } else {
          this.SET_LOVE_LIST(this.currentSong);
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .mini-player{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #150a06;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 10px 30px 10px 20px;
    z-index: 9999;
    .player-info{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .player-img{
      width: 80px;
      height: 80px;
      flex-shrink: 0;// 不贡献空间值
      overflow: hidden;
      border-radius: 50%;
      border: 4PX solid #695945;
      margin-right: 20px;
      img{
        width: 100%;
      }
    }
    .player-name{
      font-size: 26px;
      margin-bottom: 10px;
      line-height: 30px;
    }
    .player-artists{
      font-size: 20px;
      color: #b2b2b2;
    }
    .player-operate{
      i{
        font-size: 65px;
        color: #c9c3c1;
      }
      .icon-op{
        margin-right: 50px;
      }
    }
    .mini-progress{
      height: 6px;
      background-color: #f2353c;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background: cover center center/no-repeat;
    overflow: hidden;
    color: white;
    &::after{
      content: '';
      background: inherit;// 继承父元素
      position: absolute;
      top: -40px;
      left: -40px;
      width: calc(100% + 80px);
      height: calc(100% + 80px);
      filter: blur(20px);
      z-index: -2;
    }
    .player-mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: .5;
      z-index: -1;
    }
    .player-header{
      height: 60px;
      padding: 30px;
      i{
        font-size: 46px;
        position: absolute;
        left: 30px;
        top: 30px;
      }
      .header-info{
        width: 70%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 30px;
      }
      .header-artists{
        font-size: 18px;
        color: #b2b2b2;
        margin-top: 12px;
      }
    }
    .swiper-container{
      width: 100%;
      height: calc(100% - 360px);
    }
    .img-container{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img{
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 20PX solid #2b433c;
      }
      i{
        position: absolute;
        left: 30px;
        bottom: 30px;
        font-size: 50px;
        color: #c4c9bb;
      }
    }
    .player-operate{
      width: 100%;
      height: 300px;
      position: relative;
      .operate-mask{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.1);
        z-index: -1;
      }
    }
    .progress{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 50px;
      padding: 30px;
      .time{
        width: 60px;
      }
      .progress-bar{
        width: 560px;
        height: 4px;
        background-color: #7e7374;
        position: relative;
        margin: 0 30px;
      }
      .bar-moved{
        position: absolute;
        left: 0;
        top: 0;
        height: 4px;
        background-color: #f2353c;
      }
      .bar-btn{
        position: absolute;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        border: 5PX solid #5d5759;
        transform: translate3d(-50%,-50%,0);
      }
    }
    .operate-icon{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      color: #c4c9bb;
      .ft-40{
        font-size: 40px;
        width: 40px;
      }
      .ft-80{
        font-size: 80px;
      }
      .ft-100{
        font-size: 100px;
      }
    }
  }
  /*运动状态*/
  .player-enter-active, .player-leave-active{
    transition: all .3s;
    opacity: 1;
    .player-header, .player-operate{
      transform: translate3d(0,0,0);
      transition: all .3s cubic-bezier(0.86,0.18,0.82,1.32);
    }
  }
  /*初始状态*/
  .player-enter, .player-leave-to{
    opacity: 0;
    .player-header{
      transform: translateY(-100px);
    }
    .player-operate{
      transform: translateY(100px);
    }
  }
  .lyric-container{
    height: 100%;
    box-sizing: border-box;
    padding: 30px 30px 70px 30px;
    overflow: hidden;
    .lyric-scroll{
      height: 100%;
      width: 100%;
      color: white;
      overflow: hidden;
      text-align: center;
      .list-item{
        font-size: 24px;
        line-height: 1.5;
        min-height: 50px;
        opacity: .5;
        &.active{
          opacity: 1;
        }
      }
    }
  }
  .playList-scroll{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 800px;
    overflow: hidden;
    z-index: 999999;
    background-color: white;
    border-radius: 10px 10px 0 0;
    ul{
      padding-bottom: 80px;
      li{
        padding: 30px 20px;
        font-size: 24px;
        border-bottom: 1PX solid #e6e6e6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .artists-name{
        font-size: 18px;
        color: #b3b3b3;
      }
      i{
        font-size: 34px;
        color: lightgray;
      }
    }
    .close{
      line-height: 80px;
      font-size: 30px;
      color: #333333;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1PX solid #e6e6e6;
      background-color: white;
    }
  }
  .playlist-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background-color: rgba(0,0,0,.4);
  }
  .playList-enter-active,.playList-leave-active{
    transition: all .3s;
  }
  .playList-enter,.playList-leave-to{
    transform: translate3d(0,100%,0);
  }
  /*光盘旋转动画*/
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .rotate{
    animation: rotate 30s linear infinite;// 线性，无限
  }
  .rotate-stop{
    animation-play-state: paused;
  }
</style>
