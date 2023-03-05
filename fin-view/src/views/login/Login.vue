<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">个人财务管理系统-登录</span>
      </div>

      <el-form
        ref="loginForm"
        :model="loginUser"
        status-icon
        :rules="rules"
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="loginUser.name"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginUser.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)"
            >登录</el-button
          >
        </el-form-item>

        <div class="tiparea">
          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script setup>
import jwt_decode from "jwt-decode";
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref(null);

const loginUser = reactive({
  name: "",
  password: "",
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      min: 2,
      max: 30,
      message: "长度要在2-30个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "长度在6到30个字符",
      trigger: "blur",
    },
  ],
});

// 登录事件
const submitForm = (loginForm) => {
  loginForm.validate((valid) => {
    if (valid) {
      proxy.$axios
        .post("/admin/login", loginUser)
        .then((res) => {
          //   console.log(res);
          // 登录成功 拿到token 后端做了token
          //   token
          const { token } = res.data;
          //   存储到localStorage
          localStorage.setItem("mytoken", token);

          //   解析token
          const decoded = jwt_decode(token);
          //   console.log(decoded);
          //   token存储到vuex中
          store.dispatch("setAuthenticated", !isEmpty(decoded));
          store.dispatch("setUser", decoded);

          // 路由跳转
          router.push("/");
        })
        .catch((err) => {
          proxy.$message.error("登录失败！");
        });
    } else {
      proxy.$message({
        type: "error",
        message: "错误提交申请",
      });
      return false;
    }
  });
};

// 判断是否为空的方法
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  background: url(@/assets/images/R-C.jpg) no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;

  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;

    padding: 25px;
    border-radius: 5px;
    text-align: center;
    left: 40.2%;
    top: 25%;
    opacity: 0.8;

    .manage_tip {
      .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
      }
    }

    // 表格部分
    .el-form {
      margin-top: 20px;
      padding: 20px 35px 20px 4px;
      border-radius: 5px;
      box-shadow: 0px 5px 10px #cccc;
      background-color: rgb(94, 90, 90);

      .tiparea {
        text-align: right;
        font-size: 12px;
        color: #fff;
      }

      .tiparea p a {
        color: #409eff;
      }

      :deep(.el-form-item__label) {
        color: #fff;
        padding-top: 5px;
      }

      :deep(.el-input__wrapper) {
        background-color: rgb(94, 90, 90);
        .el-input__inner {
          color: #fff;
          padding: 20px 0;
        }
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
