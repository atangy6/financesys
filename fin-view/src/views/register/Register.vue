<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">个人财务管理系统-注册</span>
      </div>

      <el-form
        ref="registerForm"
        :model="registerUser"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-registerUser"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="registerUser.name"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerUser.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerUser.confirmPassword"
            type="password"
            autocomplete="off"
            placeholder="请在此输入密码"
          />
        </el-form-item>
        <!-- <el-form-item label="注册类型" prop="identify">
          <el-select v-model="registerUser.identify" placeholder="请选择身份">
            <el-option label="超级管理员" value="超级管理员" />
            <el-option label="管理员" value="管理员" />
            <el-option label="员工" value="员工" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm(registerForm)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref(null);

const registerUser = reactive({
  name: "",
  password: "",
  confirmPassword: "",
  identify: "",
});

const validatePass2 = (rule, value, callback) => {
  if (value !== registerUser.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
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
  confirmPassword: [
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
    {
      validator: validatePass2,
      trigger: "blur",
    },
  ],
  // identify: [],
});

// 注册事件
const submitForm = (registerForm) => {
  registerForm.validate((valid) => {
    if (valid) {
      proxy.$axios
        .post("/admin/register", registerUser)
        .then((res) => {
          // 注册成功
          proxy.$message({
            messaeg: "账号注册成功",
            type: "success",
          });

          // 路由跳转
          router.push("/login");
        })
        .catch((err) => {
          // console.log(err)
          proxy.$message.error("注册失败！");
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
</script>

<style lang="less" scoped>
.register {
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
