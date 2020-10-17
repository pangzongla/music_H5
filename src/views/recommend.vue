<!--每日新歌推荐分页面-->
<template>
  <div class="page">
    <div v-if="formaData.length">
      <top :title="title" :img="img" :count="formaData.length"></top>
      <scroll :data="formaData" class="page-info-list">
        <song-list :data="formaData" @clickItem="addToPlay"></song-list>
      </scroll>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import infoMixin from '../common/js/infoMixin';
  import playMixin from '../common/js/playMixin';
  import { formaSongDetail } from '../common/js/util';
  import loading from '../components/loading.vue';

  export default {
    name: 'recommend',
    mixins: [infoMixin, playMixin],
    created() {
      this.getNewSongs();
    },
    methods: {
      async getNewSongs() {
        const { data } = await axios.get('/personalized/newsong');
        if (data.code === 200) {
          this.formaData = formaSongDetail(data.result);
        }
      }
    },
    components: {
      loading
    }
  };
</script>

<style lang="less" scoped>

</style>
