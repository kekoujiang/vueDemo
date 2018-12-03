// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/scss/font-awesome.scss';
import Vuex from 'vuex'
import store from './store/store'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vuescroll,{
  ops:{
    bar: {
      background: '#d6d6d6',
      opacity:0.5,
      onlyShowBarOnScroll:false,
      keepShow:true
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
