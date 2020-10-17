// 工具库
// eslint-disable-next-line import/prefer-default-export
export function formaSongDetail(val) {
  const newVal = [];
  val.forEach((item) => {
    // 把统一化的数据存储在这个对象中
    const detail = {};
    detail.id = item.id;
    // 获取到的专辑是对象，所以用储存对象的方式
    detail.al = { ...item.al || item.album || item.song.album };// 这里使用了Object.assign({},item.album || item.song.album)es6对象合并方法
    // 获取到的歌手信息是数组，所以用存储数组的方式[].concat()
    detail.ar = [].concat(item.ar || item.artists || item.song.artists);
    detail.name = item.name;
    // 最后把统一化存储的数据放入一个空数组中，就做好了数据统一格式
    newVal.push(detail);
  });
  return newVal;
}
