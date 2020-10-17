<!--歌手详情页面-->
<template>
  <div class="page">
    <top :title="title" :img="img" :count="formaData.length"></top>
    <scroll :data="formaData" class="page-info-list">
      <song-list :data="formaData" @clickItem="addToPlay"></song-list>
    </scroll>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  import { formaSongDetail } from '../common/js/util';
  import infoMixin from '../common/js/infoMixin';

  export default {
    name: 'artistsInfo',
    mixins: [infoMixin],
    created() {
      this.getInfo(this.$route.params.id);
    },
    methods: {
      ...mapMutations([
        'SET_FULLSCREEN',
        'SET_PLAY_LIST',
        'SET_SEQUENCE_LIST',
        'SET_CURRENT_INDEX'
      ]),
      async getInfo(id) {
        const { data } = await axios.get(`/artists?id=${id}`);
        if (data.code === 200) {
          this.formaData = formaSongDetail(data.hotSongs);
        }
      },
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.formaData);
        this.SET_SEQUENCE_LIST(this.formaData);
        this.SET_CURRENT_INDEX(index);
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
