import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  userInfo:{},
  projectId:""
};

const mutations = {
  saveUserInfo(state,data){
    state.userInfo=data
  },
  saveProjectId(state,data){
    state.projectId=data
  },
};

const actions = {
  getUserInfo({commit}){
    return new Promise((resolve, reject)=>{
      let userInfo = localStorage.getItem("userInfo");
      if(userInfo){
        commit('saveUserInfo',JSON.parse(userInfo));
        resolve();
      }
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})


