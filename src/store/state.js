import { playMode } from '../common/js/aliasConfig';

const state = {
  // 是否全屏
  isFullScreen: false,
  // 现在的播放顺序歌曲列表
  playList: [],
  // 正序排列的歌曲列表
  sequencesList: [],
  // 正在播放的下标
  currentIndex: 0,
  // 播放模式
  mode: playMode.sequences,
  // 播放历史记录
  historyList: JSON.parse(localStorage.getItem('HistoryList')) || [],
  // 喜爱歌曲记录
  loveList: JSON.parse(localStorage.getItem('LoveList')) || [],
  // 保存历史搜索记录
  searchText: JSON.parse(localStorage.getItem('SearchText')) || []
};
export default state;
