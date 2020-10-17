<!--歌单分页-->
<template>
  <div class="page">
    <div v-if="playListData.length">
      <m-header>全部歌单</m-header>
      <scroll :data="playListData" class="page-view-list">
        <div class="play-wrapper">
          <play-list :data="playListData" @clickItem="goToPlayListInfo"></play-list>
        </div>
      </scroll>
    </div>
    <loading v-else></loading>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import mHeader from '../components/mHeader.vue';
  import playList from '../components/playList.vue';
  import scroll from '../components/scroll.vue';
  import loading from '../components/loading.vue';

  export default {
    name: 'playListView',
    data() {
      return {
        playListData: []
      };
    },
    components: {
      mHeader,
      playList,
      scroll,
      loading
    },
    created() {
      this.getPlayList();
    },
    methods: {
      async getPlayList() {
        const { data } = await axios.get('/personalized');
        if (data.code === 200) {
          this.playListData = data.result;
        }
      },
      goToPlayListInfo(item) {
        this.$router.push({
          name: 'playListInfo',
          params: {
            id: item.id
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .play-wrapper {
    margin-top: 90px;
    background-color: white;
    padding: 30px 20px;
  }
</style>
