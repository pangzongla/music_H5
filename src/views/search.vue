<!--搜索界面-->
<template>
  <div class="page">
    <!--头部-->
    <div class="search-header">
      <i class="iconfont icon-chaxun" @click="searchSongs"></i>
      <input type="text" v-model="keyWord" @keyup.enter="searchSongs" @focus="toggleResultShow(false)">
      <i class="iconfont icon-shanchu2" v-show="keyWord" @click="clearKeyWord"></i>
      <div class="cancel" @click="goBack">取消</div>
    </div>
    <!--搜索的历史记录和热门搜索-->
    <scroll class="history-list list-container" v-show="!resultShow">
      <ul>
        <li class="list-title" v-if="searchText.length">搜索历史</li>
        <li class="list-item history-item" v-for="(item, index) in searchText" :key="index" @click="addToSearch(item)">
          {{item}}<i class="iconfont icon-shanchu1" @click.stop="delKeyWord(item)"></i>
        </li>
        <li class="list-title">热门搜索</li>
        <li class="list-item" v-for="(item, index) in hotWords" :key="`hot-${index}`" @click="addToSearch(item.first)">{{item.first}}</li>
      </ul>
    </scroll>
    <!--搜索结果区域-->
    <div v-show="resultShow">
      <p class="list-count">共有{{resultData.length}}首歌曲</p>
      <scroll class="list-container result-list">
        <ul>
          <li v-for="(item, index) in resultData" :key="index" class="list-item" @click="addToPlay(item, index)">
            <p>{{item.name}}</p>
            <p class="artists-name">
              <span v-for="(item,index) in item.ar" :key="index">
               {{item.name}}
              </span>
            </p>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex';
  import scroll from '../components/scroll.vue';
  import { formaSongDetail } from '../common/js/util';
  import playMixin from '../common/js/playMixin';

  export default {
    name: 'search',
    mixins: [playMixin],
    data() {
      return {
        // 显示搜索结果和历史记录界面的页面切换
        resultShow: false,
        // 热门搜索
        hotWords: [],
        // 搜索关键词
        keyWord: '',
        // 搜索返回来的数据
        resultData: []
      };
    },
    components: {
      scroll
    },
    computed: {
      ...mapGetters([
        'searchText'
      ])
    },
    created() {
      this.searchHotWords();
    },
    methods: {
      ...mapMutations([
        'SET_SEARCH_TEXT',
        'DEL_FROM_SEARCH_TEXT'
      ]),
      // 获取热门搜索数据
      async searchHotWords() {
        const { data } = await axios.get('/search/hot');
        if (data.code === 200) {
          this.hotWords = data.result.hots;
        }
      },
      // 关键字搜索
      async searchSongs() {
        if (!this.keyWord.trim()) return;
        const { data } = await axios.get(`/search?keywords=${this.keyWord}`);
        if (data.code === 200) {
          this.resultData = formaSongDetail(data.result.songs);
        }
        this.SET_SEARCH_TEXT(this.keyWord);
        this.toggleResultShow(true);
      },
      // 切换历史记录页面和搜索结果的开关
      toggleResultShow(val) {
        this.resultShow = val;
      },
      // 点击添加自动搜索
      addToSearch(val) {
        this.keyWord = val;
        this.searchSongs();
      },
      // 返回上一页面
      goBack() {
        this.$router.back();
      },
      // 删除历史关键字
      delKeyWord(val) {
        this.DEL_FROM_SEARCH_TEXT(val);
      },
      // 点击清空搜索栏
      clearKeyWord() {
        this.keyWord = '';
        this.resultShow = false;
      },
      // 点击播放
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.resultData);
        this.SET_SEQUENCE_LIST(this.resultData);
        this.SET_CURRENT_INDEX(index);
      }
    }
  };
</script>

<style lang="less" scoped>
  .search-header{
    padding: 15px 30px;
    background-color: #f2353c;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    input{
      border-radius: 10px;
      height: 60px;
      font-size: 32px;
      color: #999;
      padding-left: 65px;
      flex: 1;
      box-sizing: border-box;
      outline: none;
    }
    .icon-chaxun{
      position: absolute;
      left: 45px;
      top: 29px;
      font-size: 32px;
      color: #999;
    }
    .icon-shanchu2{
      position: absolute;
      top: 29px;
      right: 130px;
      font-size: 32px;
      color: #999;
    }
    .cancel{
      margin-right: 15px;
      margin-left: 15px;
      font-size: 28px;
      color: white;
    }
  }
  .history-list{
    height: calc(100vh - 200px);
  }
  .list-container{
    overflow: hidden;
    .list-title{
      padding: 0 30px;
      line-height: 65px;
      font-size: 24px;
      color: #989898;
    }
    .list-item{
      padding: 30px;
      font-size: 28px;
      color: #333;
      background-color: white;
      border-bottom: 1PX solid #e6e6e6;
    }
    .history-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .icon-shanchu1{
      font-size: 30px;
      color: #999;
    }
    .artists-name{
      margin-top: 10px;
      color: #b2b2b2;
      font-size: 20px;
    }
  }
  .list-count{
    padding: 0 30px;
    line-height: 80px;
    font-size: 26px;
    color: #808080;
  }
  .result-list{
    height: calc(100vh - 280px);
  }
</style>
