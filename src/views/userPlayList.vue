<template>
  <div class="page">
    <m-header>播放列表</m-header>
    <count class="mt90">{{playList.length}}</count>
    <scroll class="user-list-container">
      <song-list :data="playList" @clickItem="addToPlay"></song-list>
    </scroll>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import mHeader from '../components/mHeader.vue';
  import count from '../components/count.vue';
  import scroll from '../components/scroll.vue';
  import songList from '../components/songList.vue';
  import playMixin from '../common/js/playMixin';

  export default {
    name: 'userPlayList',
    mixins: [playMixin],
    data() {
      return {};
    },
    components: {
      mHeader,
      count,
      scroll,
      songList
    },
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    methods: {
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.playList);
        this.SET_SEQUENCE_LIST(this.playList);
        this.SET_CURRENT_INDEX(index);
      }
    }
  };
</script>

<style lang="less" scoped>
  .user-list-container{
    height: calc(100vh - 280px);
    overflow: hidden;
  }
</style>
