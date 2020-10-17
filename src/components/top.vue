<template>
  <div>
    <div class="top" :style="{backgroundImage:`url(${img}?param=400y400)`}">
      <m-header :red="false">{{title}}</m-header>
      <img :src="`${img}?param=400y400`" alt="">
    </div>
    <count>{{count}}</count>
  </div>
</template>

<script type="text/javascript">
  import mHeader from './mHeader.vue';
  import count from './count.vue';

  export default {
    name: 'top',
    data() {
      return {};
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      },
      count: {
        type: Number,
        default: 0
      }
    },
    components: {
      mHeader,
      count
    }
  };
</script>

<style lang="less" scoped>
  .top{
    position: relative;
    width: 100%;
    height: 300px;
    background: no-repeat center center/cover;
    overflow: hidden;
    /*filter: blur(20px);这样添加连子级都看不到了*/
    &::after{
      content: '';
      width: calc(100% + 80px);
      height: calc(100% + 80px);
      position: absolute;
      left: -40px;
      top: -40px;
      background: inherit; //继承上一级属性
      filter: blur(20px);//高斯模糊效果，四周会出现白边
    }
    img{
      width: 120px;
      height: 120px;
      border: 10PX solid #9e8d7f;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%,-50%);
      z-index: 1;
    }
  }
  .count{
    height: 80px;
    line-height: 80px;
    font-size: 26px;
    color: #808080;
    padding-left: 30px;
  }
</style>
