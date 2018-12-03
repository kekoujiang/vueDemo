import Vue from 'vue'
import Router from 'vue-router'
import register from '@/page/register'

Vue.use(Router);
//主页
const main = r => require.ensure([], () => r(require('@/page/main')),'main');
//地图
const map = r => require.ensure([], () => r(require('@/page/map')),'map');
//项目简介
const project = r => require.ensure([], () => r(require('@/page/project')),'project');
//新增项目
const projectAdd = r => require.ensure([], () => r(require('@/page/projectAdd')),'projectAdd');
//气象环境
const environment = r => require.ensure([], () => r(require('@/page/environment')),'environment');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: register
    },
    {
      path:'/main',
      name:'name',
      component:main,
      children:[
        {
          path: '/map',
          component:map
        },
        {
          path:'/project/intro',
          component:project,
          children:[
            {
              path:'/project/add',
              component:projectAdd,
            }
          ]
        },
        {
          path:'/environment',
          component:environment
        }
      ]
    }
  ]
})
