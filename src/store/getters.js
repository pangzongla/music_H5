const getters = {
  // 此时的全屏状态
  isFullScreen(state) {
    return state.isFullScreen;
  },
  // 此时的播放清单
  playList(state) {
    return state.playList;
  },
  // 此时的顺序播放清单
  sequencesList(state) {
    return state.sequencesList;
  },
  // 此时的正在播放歌曲的下标
  currentIndex(state) {
    return state.currentIndex;
  },
  // 此时的播放模式
  nowMode(state) {
    return state.mode;
  },
  // 现在正在播放的歌曲
  currentSong(state) {
    return state.playList[state.currentIndex];
  },
  // 正在播放的歌曲是否已经被添加进喜爱列表
  isLove(state) {
    let isLove = false;
    const currentSong = state.playList[state.currentIndex];
    for (let i = 0; i < state.loveList.length; i += 1) {
      if (currentSong && state.loveList[i].id === currentSong.id) {
        isLove = true;
        return isLove;
      }
    }
    return isLove;
  },
  // 目前的搜索记录
  searchText(state) {
    return state.searchText;
  },
  // 此时的历史记录列表
  historyList(state) {
    return state.historyList;
  },
  // 此时的喜爱歌曲列表
  loveList(state) {
    return state.loveList;
  }
};
export default getters;
