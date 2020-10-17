<!--better-scroll插件的简单组件化-->
<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll';

  export default {
    name: 'scroll',
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
    watch: {
      // 监听：当父级组件传入数据的时候（父级同时传来的dom树渲染完成，外层和内容的宽高都确定了）再去执行实例化方法
      // eslint-disable-next-line no-unused-vars
      data(val) {
        this.$nextTick(() => {
          this.refresh();// 当每次切换网页数据都不一样，所以要重新实例化
        });
      }
    },
    mounted() {
      // 执行实例化方法
      this.$nextTick(() => {
        this.initScroll();
        this.scroll = new BScroll(this.$refs.scrollWrapper, { click: true });// 防止包围后click事件失效
      });
    },
    methods: {
      // 实例化
      initScroll() {
        if (!this.$refs.scrollWrapper) return;// 如果scrollWrapper节点没内容，就啥都不做，否则会出错
        this.scroll = new BScroll(this.$refs.scrollWrapper);// 如果有，就把这个节点用BScroll实例化
      },
      // 刷新数据
      refresh() {
        // eslint-disable-next-line no-unused-expressions
        this.scroll && this.scroll.refresh();// 确定已经实例化，再去执行scroll自带的刷新方法
      },
      // 根据参数进行滚动到指定标签
      scrollToElement() {
        // eslint-disable-next-line no-unused-expressions,prefer-spread,prefer-rest-params
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments); // 当有实例化时，去执行自带的滚动方法
      },
      scrollTo() {
        // eslint-disable-next-line no-unused-expressions,prefer-spread,prefer-rest-params
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      }
      // canClick() {
      //   this.scroll = new BScroll(this.$refs.search, { click: true, tap: true });
      // }
    }
  };
</script>

<style lang="less" scoped>
</style>
