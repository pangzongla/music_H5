<template>
  <div class="header" :class="{'red':red}">
    <i class="iconfont icon-zuo" @click="goBack"></i>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'mHeader',
    props: {
      red: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    },
    methods: {
      // 退回上一页面
      goBack() {
        this.$router.go(-1);
      }
    },
    components: {}
  };
</script>

<style lang="less" scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    line-height: 90px;
    font-size: 34px;
    color: #fefefe;
    text-align: center;
    z-index: 99;
    &.red{
      background-color: #f2353c;
    }
    i{
      position: absolute;
      font-size: 50px;
      left: 20px;
    }
  }
</style>
