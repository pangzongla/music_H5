<!--歌单的公共模板-->
<template>
  <div>
    <ul class="play-list">
      <li v-for="(item, index) in data" :key="index" @click="handleClick(item)">
        <img v-lazy="`${item.picUrl}?param=400y400`" alt="">
        <p>{{item.name}}</p>
        <i class="iconfont icon-zanting"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'play-list',
    data() {
      return {};
    },
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      handleClick(val) {
        this.$emit('clickItem', val);
      }
    },
    components: {}
  };
</script>

<style lang="less" scoped>
  .play-list{
    li{
      width: 220px;
      display: inline-block;
      margin-right: 25px;
      margin-bottom: 25px;
      color: #333;
      font-size: 24px;
      vertical-align: top;
      position: relative;
      &:nth-child(3n){
        margin-right: 0;
      }
      img{
        width: 220px;
        height: 220px;
        margin-bottom: 15px;
      }
      i{
        position: absolute;
        top: 170px;
        right: 10px;
        font-size: 40px;
        color: white;
      }
    }
  }
</style>
