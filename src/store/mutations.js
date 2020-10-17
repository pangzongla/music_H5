const mutations = {
  // 修改是否全屏
  SET_FULLSCREEN(state, val) {
    state.isFullScreen = val;
  },
  // 修改播放列表
  SET_PLAY_LIST(state, val) {
    state.playList = val;
  },
  // 修改顺序播放列表
  SET_SEQUENCE_LIST(state, val) {
    state.sequencesList = val;
  },
  // 修改现在播放歌曲的下标
  SET_CURRENT_INDEX(state, val) {
    state.currentIndex = val;
  },
  // 修改播放模式
  SET_MODE(state, val) {
    state.mode = val;
  },
  // 删除播放列表中的歌曲
  DEL_FROM_PLAY_LIST(state, val) {
    // 找到删除歌曲的下标
    // eslint-disable-next-line no-return-assign
    const index = state.playList.findIndex((item) => item.id === val.delSong.id);
    // 在播放列表中剔除
    state.playList.splice(index, 1);
    // 若有正在播放的歌曲，更新列表后保持正在播放歌曲的播放；没有就会因为下标的改动自动播放下一首
    if (val.delSong.id !== val.curSong.id) {
      // eslint-disable-next-line no-return-assign
      state.currentIndex = state.playList.findIndex((item) => item.id === val.curSong.id);
    }
  },
  // 添加历史播放列表
  SET_HISTORY_LIST(state, val) {
    // 列表中已经存在就啥都不做
    let haveHistory = false;
    for (let i = 0; i < state.historyList.length; i += 1) {
      if (state.historyList[i].id === val.id) {
        haveHistory = true;
        return;
      }
    }
    // 列表中还不存在就先放着
    if (!haveHistory) {
      state.historyList.push(val);
    }
    // 处理后放在HistoryList
    localStorage.setItem('HistoryList', JSON.stringify(state.historyList));
  },
  // 添加喜爱歌曲播放列表
  SET_LOVE_LIST(state, val) {
    let HaveLove = false;
    for (let i = 0; i < state.loveList.length; i += 1) {
      if (state.loveList[i].id === val.id) {
        HaveLove = true;
        return;
      }
    }
    if (!HaveLove) {
      state.loveList.push(val);
    }
    localStorage.setItem('LoveList', JSON.stringify(state.loveList));
  },
  // 删除喜爱歌曲列表中的某一首歌曲
  DEL_FROM_LOVE_LIST(state, val) {
    // 得到要删除的歌曲下标
    const index = state.loveList.findIndex((item) => item.id === val.id);
    // 列表中剔除
    state.loveList.splice(index, 1);
    // 再重新写入保存
    localStorage.setItem('LoveList', JSON.stringify(state.loveList));
  },
  // 添加搜索记录
  SET_SEARCH_TEXT(state, val) {
    let haveText = false;
    // 已经存在历史记录的就什么都不做
    for (let i = 0; i < state.searchText.length; i += 1) {
      if (state.searchText[i] === val.trim()) {
        haveText = true;
        return;
      }
    }
    // 不存在就插入在历史记录之前，且只保留前十的记录
    if (!haveText) {
      state.searchText.unshift(val);
      state.searchText = state.searchText.slice(0, 10);
    }
    localStorage.setItem('SearchText', JSON.stringify(state.searchText));
  },
  // 点击删除搜索记录
  DEL_FROM_SEARCH_TEXT(state, val) {
    for (let i = 0; i < state.searchText.length; i += 1) {
      if (state.searchText[i] === val.trim()) {
        state.searchText.splice(i, 1);
      }
    }
    localStorage.setItem('SearchText', JSON.stringify(state.searchText));
  }
};
export default mutations;
