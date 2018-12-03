<template>
  <div class="biyue-main-box" ref="mainBox">
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <div class="searchBox">
          <label>项目名称</label>
          <el-input  size="medium" v-model="searchData.projectName" placeholder="请输入项目名称"></el-input>
          <el-button size="medium"  icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="toolBox"><el-button @click="openAddPage" size="medium" type="" icon="el-icon-circle-plus-outline" plain>新增</el-button></div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="项目名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="">
        </el-table-column>
        <el-table-column
          prop="volumes"
          label="体量">
        </el-table-column>
        <el-table-column
          prop="site"
          label="地点">
        </el-table-column>
        <el-table-column
          prop="constructionTime"
          label="施工时间">
        </el-table-column>
        <el-table-column
          prop="constructionPeriod"
          label="施工周期">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开工日期">
        </el-table-column> <el-table-column
        prop="endTime"
        label="完工日期">
      </el-table-column>

      </el-table>
      <el-pagination
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.size"
         layout="total,prev, pager, next,jumper"
        :total="pagination.total">
      </el-pagination>
    </el-card>
    <projectAdd ref="projectAdd"></projectAdd>
  </div>
</template>

<style lang="less">
  @import "../assets/css/commin.less";
  .biyue-main-box();
  .biyue-list();

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>

<script>
  import {mapState} from 'Vuex'
  import {projectListData} from '@/assets/js/commin';
  import projectAdd from './projectAdd'
  export default {
    components:{
      projectAdd
    },
    data() {
      return {
        tableData: [],
        searchData:{
          projectName:""
        },
        pagination:{
          currentPage:1,
          size:1,
          total:0
        }
      }
    },
    created(){

    },
    mounted(){
      this.getProjectData();
    },
    computed:{
      ...mapState(['projectId'])
    },
    methods:{
      //得到项目数据
      async getProjectData (){
        let __self = this;
        let num = (parseInt(this.$refs.mainBox.clientHeight)-73-40)/48;
        let res = await projectListData({
          page:__self.pagination.currentPage,
          rowNum: Math.ceil(num),
          name:__self.searchData.projectName
        });
        this.pagination.size=Math.ceil(num);
        if (res.status === 1) {
            this.tableData=res.value;
            this.pagination.total=res.count;
        }else{
          this.$message.error({
            message: res.msg
          });
        }
      },
      //翻页
      handleCurrentChange(val) {
        this.pagination.currentPage=val;
      },
      //搜索
      search(){
        this.getProjectData();
      },
      //打开新增页面
      openAddPage(){
        this.$refs.projectAdd.dialogVisible=true;
      }
    },
    watch:{
      'pagination.currentPage'(val){
        this.getProjectData();
      }
    }
  }
</script>
