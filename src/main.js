import Vue from 'vue';
import 'lib-flexible';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLazyload from 'vue-lazyload';
import 'swiper/css/swiper.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './assets/css/reset.css';
import './assets/fonts/iconfont.css';
import './assets/css/common.css';


Vue.config.productionTip = false;

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == 'development') { // 开发环境
  axios.defaults.baseURL = '/api';
// eslint-disable-next-line eqeqeq
} else if (process.env.NODE_ENV == 'production') { // 生产环境
  axios.defaults.baseURL = 'http://134.175.219.100:4000';
}

Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
  loading: '/load.gif', // 正在加载的时候播放的图片
  error: '/user-bg.png' // 加载失败后播放的图片
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
