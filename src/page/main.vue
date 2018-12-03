<template>
  <div class="biyueContent" v-loading="loading">
    <el-container>
      <!--菜单栏-->
      <el-aside width="200px">
        <div style="width: 100%;height: 60px;line-height: 60px"></div>
        <el-menu :default-active="pageUrl" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <vue-scroll :ops="ops">
          <menuTree :menuData="menuData"></menuTree>
          </vue-scroll>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header-box">
            <el-select v-model="personDataNow" @change="getSite" filterable placeholder="请选择">
              <el-option
                v-for="item in personData"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
              </el-option>
            </el-select>
          </div>
        </el-header>
        <el-main style="position: relative">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="less" rel=”stylesheet/less” scoped>
  @import "../assets/css/main.less";
</style>

<script>
  import {mapActions,mapState,mapMutations} from 'Vuex';
  import menuTree from '@/components/menuTree'
  import {menuData,personData} from '@/assets/js/commin';

  export default {
    components:{
      menuTree
    },
    data() {
      return {
        isCollapse: false,
        menuData:[],
        personData:[],
        personDataNow:"",
        loading:true,
        ops:{
          vuescroll: {},
          scrollPanel:{
            scrollingX: false
          },
          rail: {
            gutterOfSide:'193px'
          },
          bar: {}
        }
      }
    },
    computed:{
      ...mapState(['userInfo','projectId']),
      pageUrl(){
        return this.$route.path.replace('/', '');
      }
    },
    methods:{
      ...mapActions(['getUserInfo']),
      ...mapMutations(['saveProjectId']),
      async getMentData(){
        //得到菜单数据
        let res = await menuData();
        this.loading=false;
        if (res.status === 1) {
          this.menuData=res.value;
          let homeUrl = '';
          //获取首页
          getHomeUrl(this.menuData[0]);
          function getHomeUrl(data) {
            if(!data.childMenus){
              homeUrl = data.url
            }else{
              getHomeUrl(data.childMenus[0])
            }
          }
          this.$router.push(homeUrl);

        }else{
          this.$message.error({
            message: res.msg
          });
        }
      },
      async getPersonData(){
        //用户信息
        let res = await personData();
        this.loading=false;
        if (res.status === 1) {
          let val = res.value.projectList;
          this.personData = val;
          this.personDataNow = val[0].projectName;
          this.saveProjectId(val[0].projectId);
        }else{
          this.$message.error({
            message: res.msg
          });
        }
      },
      getSite(val){
        this.saveProjectId(val);
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    },
    created(){
      var __self = this;
      this.getUserInfo().then(()=>{
        this.getMentData();
        this.getPersonData();
      });
    }
  }
</script>
