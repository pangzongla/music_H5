<template>
  <div class="page">
    <m-header :red="false">
      个人中心
    </m-header>
    <div class="user-bg">
      <img src="../assets/image/user-bg.png" alt="">
      <p>MIKO</p>
    </div>
    <ul class="user-list">
      <li @click="goToPage('userPlayList')">
        <div class="icon-wrap">
          <i class="iconfont icon-music"></i>播放列表
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li class="split-item" @click="goToPage('userLoveList')">
        <div class="icon-wrap">
          <i class="iconfont icon-xiai"></i>我的收藏
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li @click="goToPage('userHistoryList')">
        <div class="icon-wrap">
          <i class="iconfont icon-guangdie"></i>最近听过
        </div>
        <i class="iconfont icon-you"></i>
      </li>
    </ul>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import mHeader from '../components/mHeader.vue';

  export default {
    name: 'userCenter',
    data() {
      return {};
    },
    components: {
      mHeader
    },
    methods: {
      // 跳转页面
      goToPage(path) {
        this.$router.push({
          name: path
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .user-bg{
    width: 100%;
    height: 400px;
    background: url("../assets/image/user-bg.png") no-repeat center center/cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 30px;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 20px;
      margin-top: 60px;
    }
  }
  .user-list{
    li{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      padding: 0 30px;
      font-size: 30px;
      color: #333;
      background: white;
      border-bottom: 1PX solid #e6e6e6;
    }
    i{
      font-size: 40px;
      color: #ccc;
    }
    .icon-wrap{
      display: flex;
      align-items: center;
      i{
        margin-right: 20px;
      }
    }
    .split-item{
      margin-top: 20px;
    }
  }
</style>
