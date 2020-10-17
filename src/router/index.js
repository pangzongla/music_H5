import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import recommend from '../views/recommend.vue';
import playListView from '../views/playListView.vue';
import rank from '../views/rank.vue';
import artists from '../views/artists.vue';
import artistsInfo from '../views/artistsInfo.vue';
import playListInfo from '../views/playListInfo.vue';
import rankInfo from '../views/rankInfo.vue';
import search from '../views/search.vue';
import userCenter from '../views/userCenter.vue';
import userHistoryList from '../views/userHistoryList.vue';
import userLoveList from '../views/userLoveList.vue';
import userPlayList from '../views/userPlayList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/recommend',
        name: 'recommend',
        component: recommend
      },
      {
        path: '/playListView',
        name: 'playListView',
        component: playListView,
        children: [
          {
            path: ':id',
            name: 'playListInfo',
            component: playListInfo
          }
        ]
      },
      {
        path: '/rank',
        name: 'rank',
        component: rank,
        children: [
          {
            path: ':id',
            name: 'rankInfo',
            component: rankInfo
          }
        ]
      },
      {
        path: '/artists',
        name: 'artists',
        component: artists,
        children: [
          {
            path: ':id',
            name: 'artistsInfo',
            component: artistsInfo
          }
        ]
      },
      {
        path: '/search',
        name: 'search',
        component: search
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        component: userCenter,
        children: [
          {
            path: '/userHistoryList',
            name: 'userHistoryList',
            component: userHistoryList
          },
          {
            path: '/userLoveList',
            name: 'userLoveList',
            component: userLoveList
          },
          {
            path: '/userPlayList',
            name: 'userPlayList',
            component: userPlayList
          }]
      }
    ]
  }
];


const router = new VueRouter({
  routes
});

export default router;
