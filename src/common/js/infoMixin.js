import top from '@/components/top.vue';
import songList from '@/components/songList.vue';
import scroll from '@/components/scroll.vue';

export default {
  data() {
    return {
      formaData: []
    };
  },
  components: {
    top,
    songList,
    scroll
  },
  computed: {
    title() {
      if (this.formaData.length > 0) {
        return this.formaData[0].name;
      }
      return '暂无数据';
    },
    img() {
      if (this.formaData.length > 0) {
        return this.formaData[0].al.picUrl;
      }
      return '';
    }
  }
};
