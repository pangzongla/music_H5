<!--排行榜详情-->
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
  import infoMixin from '../common/js/infoMixin';
  import playMixin from '../common/js/playMixin';
  import { formaSongDetail } from '../common/js/util';

  export default {
    name: 'rankInfo',
    mixins: [infoMixin, playMixin],
    created() {
      this.getInfo(this.$route.params.id);
    },
    methods: {
      async getInfo(id) {
        const { data } = await axios.get(`/playlist/detail?id=${id}`);
        if (data.code === 200) {
          this.formaData = formaSongDetail(data.playlist.tracks);
        }
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
