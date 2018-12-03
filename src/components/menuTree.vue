<template>
    <div style="box-sizing: border-box">
      <template v-for="v in menuData">
        <el-submenu :index="v.url?v.url.replace('/',''):v.id" v-if="v.childMenus">
          <template slot="title">
            <i :class="child?'fa fa-id-card-o':v.icon||v.id"></i>
            <span slot="title">{{v.name}}</span>
          </template>
          <menutree :menuData="v.childMenus" :child=true></menutree>
        </el-submenu>
        <el-menu-item :index="v.url?v.url.replace('/',''):v.id" @click="goUrl(v.url)" v-else>
          <i :class="child?'fa fa-id-card-o':v.icon"></i>
          <span slot="title">{{v.name}}</span>
        </el-menu-item>
      </template>
    </div>
</template>

<style>

</style>

<script>
    export default {
        props:['menuData','child'],
        name:'menutree',
        data(){
          return {

          }
        },
      methods:{
        goUrl(url){
          this.$router.push(url);
        }
      }
    }
</script>
