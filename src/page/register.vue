<template>
  <div style="background: #dfdfdf">
    <div class="loginImg">
      <div></div>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="0px">
      <el-form-item prop="username">
        <el-input  v-model="form.username" prefix-icon="fa fa-user-o" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input  v-model="form.password" prefix-icon="fa fa-lock" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" style="width: 100%;font-size: 16px;letter-spacing: 2px">登录
        </el-button>
      </el-form-item>
      <div class="title">BIYUE!后台管理系统</div>
    </el-form>
  </div>
</template>

<style lang="less" rel=”stylesheet/less” scoped>
  @import "../assets/css/commin.less";

  body {
    background-color: #dfdfdf;
  .loginImg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 50%;
    background: url("../assets/img/register.jpg") no-repeat center;
    background-size: cover;

  div {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg, #0095ff 10%, #00b7d9 100%);;
    opacity: 0.8;
  }

  }
  .el-form {
    width: 400px;
    height: 300px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgba(255, 255, 255, 0.6);
    z-index: 1000;
    box-shadow: 0 5px 8px #e2e2e2;
  .transform(translate(-50%, -50%));
    padding: 50px;
    box-sizing: border-box;

  .el-input {
    margin-bottom: 10px;
  }

  .title {
    position: absolute;
    top: -50px;
    color: #fff;
    left: 0;
    text-align: center;
    width: 100%;
    letter-spacing: 4px;
    font-size: 24px;
    text-shadow: 0 0 3px #292929;
  }

  }
  }

</style>
<script>
  import {login} from '@/assets/js/commin';

  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async onSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await login({username: this.form.username, password: this.form.password});
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
              message:'请输入正确的用户名与密码!'
            });
            return false;
          }
        })

      }
    }
  }
</script>
