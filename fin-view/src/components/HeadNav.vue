<template>
  <header class="head-nav">
    <div class="l-content">
      <img src="../assets/logo.svg" alt="" class="logo" />
      <span class="title">资金管理后台系统</span>
    </div>
    <div class="r-content">
      <div class="userinfo">
        <img src="../assets/images/user-default.png" alt="" class="avatar" />
        <div class="welcome">
          <p class="name comename">欢迎</p>
          <p class="name avatarname">{{ user.name }}</p>
        </div>
        <span class="username">
          <!-- 下拉箭头 -->
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const user = computed(() => {
  return store.getters.user;
});

const setDialogInfo = (cmdItem) => {
  //   console.log(cmdItem);
  switch (cmdItem) {
    case "info":
      showInfoList();
      break;
    case "logout":
      logout();
      break;
  }
};

const showInfoList = () => {
  router.push("/infoshow");
};

const logout = () => {
  //   console.log("退出");
  // 清除token
  localStorage.removeItem("mytoken");
  // 设置vuex store
  store.dispatch("clearCurrentState");
  //   跳转
  router.push("/login");
};
</script>

<style lang="less" scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;

  .l-content {
    float: left;
    display: flex;
    align-items: center;
    .logo {
      width: 60px;
      height: 60px;
      vertical-align: top;
    }
    .title {
      padding-left: 8px;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .r-content {
    float: right;
    margin-right: 50px;
    .userinfo {
      display: flex;
      align-items: center;
      height: 60px;
      .avatar {
        width: 40px;
        height: 40px;
      }

      .welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        .name {
          font-weight: 500;
          font-size: 14px;
          margin-right: 10px;
        }

        .avatarname {
          color: skyblue;
          padding-top: 5px;
        }
      }

      .username {
        .el-dropdown {
          color: #fff;
        }
      }
    }
  }
}
</style>
