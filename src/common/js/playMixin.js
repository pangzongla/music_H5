// 点击播放点中音乐公共功能
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'SET_FULLSCREEN',
      'SET_PLAY_LIST',
      'SET_SEQUENCE_LIST',
      'SET_CURRENT_INDEX'
      ]),
    addToPlay(item, index) {
      this.SET_FULLSCREEN(true);
      this.SET_PLAY_LIST(this.formaData);
      this.SET_SEQUENCE_LIST(this.formaData);
      this.SET_CURRENT_INDEX(index);
    }
  }
};
