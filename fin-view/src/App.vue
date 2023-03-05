<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();

// 判断是否为空的方法
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

onMounted(() => {
  if (localStorage.mytoken) {
    const decoded = jwt_decode(localStorage.mytoken);
    // token存储到vuex中
    store.dispatch("setAuthenticated", !isEmpty(decoded));
    store.dispatch("setUser", decoded);
  }
});
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
