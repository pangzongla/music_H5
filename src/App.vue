<template>
  <div id="app">
    <router-view/>
    <player></player>
  </div>
</template>

<script>
  import eruda from 'eruda';
  import player from './components/player.vue';

  export default {
    name: 'app',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      player
    },
    created() {
      const el = document.createElement('div');
      document.body.appendChild(el);
      eruda.init({
        container: el, // 插件展示的位置
        tool: ['console', 'elements']// 配置一些会用到的方法
      });
    }
  };
</script>
<style lang="less">

</style>
