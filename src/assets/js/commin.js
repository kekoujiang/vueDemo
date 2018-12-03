import fetch from '@/config/fetch'
import store from '@/store/store'
// 登录
export const login = data =>fetch({
  url:'/login',
  data:data,
  type:'post',
  dataType:false
});

// 得到菜单数据
export const menuData = data => fetch({
  url:'/menu/queryAuthAllMenu',
  data:data,
  type:'post',
  secretKey:store.state.userInfo.secretKey,
});

// 得到人员数据
export const personData = data => fetch({
  url:'/user/getUserInfo',
  data:data,
  type:'post',
  secretKey:store.state.userInfo.secretKey,
});

// 项目简介列表
export const projectListData = data => fetch({
  url:'/project/getProject',
  data:data,
  type:'post',
  secretKey:store.state.userInfo.secretKey
});

//新增项目
export const addProject = data => fetch({
  url:'/project/saveOrUpdate',
  data:data,
  type:'post',
  secretKey:store.state.userInfo.secretKey,
  dataType:"formdata"
});
