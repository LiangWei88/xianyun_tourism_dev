<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  props: ["disableRedirect"],
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      // 验证表单
      this.$refs["form"].validate(valid => {
        // 为true表示没有错误
        if (valid) {
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data: this.form
          // }).then(res => {
          //   console.log(res.data);
          //   // 登陆成功,应该讲数据存到 vuex 当中
          //   this.$store.commit("user/setUserInfo", res.data);
          // });
          // 使用 vuex 的 actions 替换这里直接写的ajax请求
          this.$store.dispatch("user/login", this.form).then(res => {
            if (!this.disableRedirect) {
              // 成功提示
              this.$message({
                message: "登录成功，正在跳转",
                type: "success"
              });
              // 跳转到首页
              setTimeout(() => {
                this.$store.commit("user/setUserInfo", res);
                this.$router.replace("/");
              }, 1000);
            } else {
              this.$store.commit("user/setUserInfo", res);
              this.$message({
                message: "登录成功",
                type: "success"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
