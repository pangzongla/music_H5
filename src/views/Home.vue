<!--主页面-->
<template>
  <div>
    <!-- 头部固定栏 -->
    <div class="header">
      <div class="personal" @click="goToUserCenter">我的</div>
      <div>MIKO</div>
      <i class="iconfont icon-chaxun" @click="goToSearch"></i>
    </div>
    <!--轮播图插件和导航区域-->
    <scroll :data="artistsData" class="home-container">
      <div>
        <div class="swiper-content home-item">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(item, index) in newSongData" :key="index">
              <img :src="`${item.song.album.blurPicUrl}?param=400y400`" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!--导航区域-->
          <ul class="nav">
            <li @click="goToRecommend">
              <div class="icon-container">
                <i class="iconfont icon-date icon"></i>
              </div>
              <p>每日推荐</p>
            </li>
            <li @click="goToPlayList">
              <div class="icon-container">
                <i class="iconfont icon-music-list icon"></i>
              </div>
              <p>歌单</p>
            </li>
            <li @click="goToRank">
              <div class="icon-container">
                <i class="iconfont icon-rank icon"></i>
              </div>
              <p>排行榜</p>
            </li>
          </ul>
        </div>
        <!--每日歌单推荐区域-->
        <div class="home-item">
          <div class="title-wrapper">
            <div class="title">
              每日推荐
            </div>
            <div class="more" @click="goToPlayList">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <div class="play-list-wrapper">
            <play-list :data="playListData" @clickItem="goToPlayListInfo"></play-list>
          </div>
        </div>
        <!--热门歌手区域-->
        <div class="home-item">
          <div class="title-wrapper">
            <div class="title">
              热门歌手
            </div>
            <div class="more" @click="goToArtists">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <artist-list :data="artistsData" @clickItem="goToArtistsInfo"></artist-list>
        </div>
      </div>
    </scroll>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import PlayList from '../components/playList.vue';
  import artistList from '../components/artistList.vue';
  import scroll from '../components/scroll.vue';

  export default {
    name: 'Home',
    components: {
      PlayList,
      artistList,
      scroll
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        newSongData: [],
        playListData: [],
        artistsData: []
      };
    },
    created() {
      this.getNewSongs();
      this.getPlayList();
      this.getArtists();
    },
    methods: {
      // 请求轮播图数据
      async getNewSongs() {
        const { data } = await axios.get('/personalized/newsong');
        if (data.code === 200) {
          this.newSongData = data.result;
        }
      },
      // 请求每日推荐数据
      async getPlayList() {
        const { data } = await axios.get('/personalized');
        if (data.code === 200) {
          // 截取前六条数据
          this.playListData = data.result.slice(0, 6);
        }
      },
      // 请求热门歌手数据
      async getArtists() {
        const { data } = await axios.get('/top/artists?limit=10');
        if (data.code === 200) {
          this.artistsData = data.artists;
        }
      },
      // 跳转到每日推荐页面
      goToRecommend() {
        this.$router.push({
          name: 'recommend'
        });
      },
      // 跳转到歌单页面
      goToPlayList() {
        this.$router.push({
          name: 'playListView'
        });
      },
      // 跳转到选中歌单的详细页面
      goToPlayListInfo(item) {
        this.$router.push({
          name: 'playListInfo',
          params: {
            id: item.id
          }
        });
      },
      // 跳转到排行榜页面
      goToRank() {
        this.$router.push({
          name: 'rank'
        });
      },
      // 跳转到歌手页面
      goToArtists() {
        this.$router.push({
          name: 'artists'
        });
      },
      // 跳转到歌手的详细信息
      goToArtistsInfo(item) {
        this.$router.push({
          name: 'artistsInfo',
          params: {
            id: item.id
          }
        });
      },
      // 跳转到搜索页面
      goToSearch() {
        this.$router.push('/search');
      },
      // 跳转到个人中心页面
      goToUserCenter() {
        this.$router.push('/userCenter');
      }
    }
  };
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #f2353c;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 36px;
    z-index: 9;

    .personal {
      color: #f9aeb0;
    }

    i {
      font-size: 36px;
    }
  }

  /*每个版块的基础样式是一样的，一样的标题栏，一样的内容框。所以公共样式*/
  .home-item {
    padding: 20px;
    margin-bottom: 20px;
    background-color: white;

    .title-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 40px;

      .title {
        padding-left: 20px;
        font-size: 34px;
        border-left: 6px solid #f2353c;
        color: #4c4c4c;
        line-height: 38px;
      }

      .more {
        width: 50px;
        height: 38px;
        border:1px solid #ccc;
        border-radius: 25px;
        color: #bfbfbf;
        text-align: center;
        line-height: 38px;
      }
    }
  }

  .swiper-content {
    margin-top: 90px;

    .swiper-container {
      width: 100%;
      height: 350px;
      border-radius: 10px;

      img {
        width: 100%;
      }
    }
  }

  .nav {
    padding: 20px 30px 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    li {
      text-align: center;
    }

    .icon-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: red;
      margin-bottom: 20px;
      line-height: 120px;
    }

    .icon {
      font-size: 70px;
      color: white;
    }
    p{
      font-size: 24px;
    }
  }
  .play-list-wrapper{
    /*防止加载的时候内容还没出来时，出现塌陷现象*/
    min-height: 650px;
  }
  .home-container{
    margin-top: 90px;
    height: calc(100vh - 200px);
    overflow: hidden;
  }
</style>
