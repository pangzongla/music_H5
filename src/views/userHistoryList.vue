<template>
    <div class="page">
      <m-header>最近听过</m-header>
      <count class="mt90">{{historyList.length}}</count>
      <scroll class="user-list-container">
        <song-list :data="historyList" @click="addToPlay"></song-list>
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
    name: 'userHistoryList',
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
        'historyList'
      ])
    },
    methods: {
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.historyList);
        this.SET_SEQUENCE_LIST(this.historyList);
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
