<template>
  <el-dialog
    class="biyue-dialog"
    title="新增"
    :visible.sync="dialogVisible"
     width="700px"
    :before-close="handleClose">
    <vue-scroll :ops="ops">
      <el-form ref="formData" :inline="true" :rules="rules" :model="formData" label-width="120px" class="demo-form-inline demo-ruleForm">
        <h2 class="biyue-title"><i class="el-icon-star-on"></i>项目概况</h2>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" size="medium" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="体量"  prop="volumes">
          <el-input v-model="formData.volumes" size="medium" placeholder="请输入体量"></el-input>
        </el-form-item>
        <el-form-item label="地点"  prop="site">
          <el-input v-model="formData.site" size="medium" placeholder="请输入地点"></el-input>
        </el-form-item>
        <h2 class="biyue-title"><i class="el-icon-star-on"></i>施工计划</h2>
        <el-form-item label="施工时间"  prop="constructionTime">
          <el-input v-model="formData.constructionTime" size="medium" placeholder="请输入施工时间"></el-input>
        </el-form-item>
        <el-form-item label="施工周期" prop="constructionPeriod">
          <el-input v-model="formData.constructionPeriod" size="medium" placeholder="请输入施工周期"></el-input>
        </el-form-item>
        <el-form-item label="开工日期"  prop="startTime">
          <el-input v-model="formData.startTime" size="medium" placeholder="请输入开工日期"></el-input>
        </el-form-item>
        <el-form-item label="完工日期"  prop="endTime">
          <el-input v-model="formData.endTime" size="medium" placeholder="请输入完工日期"></el-input>
        </el-form-item>
        <h2 class="biyue-title"><i class="el-icon-star-on"></i>项目结构</h2>
        <el-upload
          style="margin-bottom: 15px"
          class="biyue-file"
          ref="file"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :name="fileName"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="changeFile"
          :auto-upload="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <h2 class="biyue-title"><i class="el-icon-star-on"></i>项目经纬度</h2>
        <el-form-item label="项目经度"  prop="lng">
          <el-input v-model="formData.lng" size="medium" placeholder="请输入项目经度"></el-input>
        </el-form-item>
        <el-form-item label="项目纬度"  prop="lat">
          <el-input v-model="formData.lat" size="medium" placeholder="请输入项目纬度"></el-input>
        </el-form-item>
      </el-form>
    </vue-scroll>
    <el-dialog :visible.sync="dialogBool"
               append-to-body
               width="400px">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="less" >
  @import "../assets/css/commin.less";
  .biyue-open-title();

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>

<script>
  import {addProject} from '@/assets/js/commin';
  export default {
    data() {
      return {
        fileBool:true,
        dialogVisible: false,
        dialogBool: false,
        modal:false,
        imageUrl: '',
        fileName:"file",
        formData:{
          name:"23",
          volumes:"123",
          site:"23",
          constructionTime:"123",
          constructionPeriod:"123",
          startTime:"123",
          endTime:"23",
          lng:"22",
          lat:"11"
        },
        //滚动条
        ops:{},
        //验证
        rules:{
          name: { required: true, message: '请填写名称', trigger: 'blur' },
          volumes: { required: true, message: '请填写体量', trigger: 'blur' },
          site: { required: true, message: '请填写地点', trigger: 'blur' },
          constructionTime: { required: true, message: '请填写施工时间', trigger: 'blur' },
          constructionPeriod: { required: true, message: '请填写施工周期', trigger: 'blur' },
          startTime: { required: true, message: '请填写开工日期', trigger: 'blur' },
          endTime: { required: true, message: '请填写完工日期', trigger: 'blur' },
          lng: { required: true, message: '请填写项目经度', trigger: 'blur' },
          lat: { required: true, message: '请填写项目纬度', trigger: 'blur' }
        }
      };
    },
    created(){
    },
    methods: {
      handleClose(done) {
        done();
      },
      handlePictureCardPreview(file, fileList) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.dialogBool = true;
      },
      handleRemove(file, fileList) {
        this.fileName="file";
        document.querySelector(".biyue-file>div.el-upload--picture-card").style.display='';
      },
      changeFile:function (file, fileList) {
        if(fileList.length>0){
          this.fileName="personChartFile";
          document.querySelector(".biyue-file>div.el-upload--picture-card").style.display='none';
        }
      },
      submitData(){
        let __self=this;
        this.$refs.formData.validate(async (valid)=>{
          if (valid) {
            let formData = new FormData(document.querySelector('form'));
            console.log(__self.formData)
            for(let i in __self.formData){
              formData.append(i,__self.formData[i])
            }
            let res = await addProject(formData);
            if (res.status === 100) {
              res.value.secretKey=res.secretKey;
              localStorage.setItem('userInfo',JSON.stringify(res.value));
              this.$router.push('main');
            } else {
              this.$message.error({
                message: res.msg
              });
            }
          } else {
            this.$message.error({
              message:'请输入正确的信息格式!'
            });
            return false;
          }
        })
      }
    }
  };
</script>
