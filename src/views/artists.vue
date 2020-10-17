<!--歌手分页-->
<template>
  <div class="page">
    <div v-if="artistsData.length">
      <m-header>全部歌手</m-header>
      <scroll :data="artistsData" class="page-view-list">
        <artist-list :data="artistsData" class="artists" @clickItem="goToArtistsInfo"></artist-list>
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
  import artistList from '../components/artistList.vue';
  import scroll from '../components/scroll.vue';
  import loading from '../components/loading.vue';

  export default {
    name: 'artists',
    data() {
      return {
        artistsData: []
      };
    },
    components: {
      mHeader,
      artistList,
      scroll,
      loading
    },
    created() {
      this.getArtists();
    },
    methods: {
      async getArtists() {
        const { data } = await axios.get('/top/artists');
        if (data.code === 200) {
          this.artistsData = data.artists;
        }
      },
      goToArtistsInfo(item) {
        this.$router.push({
          name: 'artistsInfo',
          params: {
            id: item.id
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .artists {
    margin-top: 90px;
    background-color: white;
    padding: 0 20px;
  }
</style>
