<!--小人跑组件-->
<template>
    <div class="loading">
      <img src="../assets/image/loading.gif" alt="">
      <div>玩命加载中...</div>
    </div>
</template>

<script type="text/javascript">
  export default {
    name: 'loading',
    data() {
      return {};
    },
    components: {}
  };
</script>

<style lang="less" scoped>
  .loading{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background: white;
  }
</style>
