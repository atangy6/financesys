<template>
  <el-row class="tac menu">
    <el-col>
      <el-menu
        active-text-color="#4091ff"
        background-color="#324057"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="iconfont icon-shouye1"></i>
            <span>首页</span>
          </el-menu-item>
        </router-link>

        <template v-for="item in items">
          <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
            <template #title>
              <i :class="`iconfont  ${item.icon}`"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from "vue";
const items = reactive([
  {
    icon: "icon-weibiaoti1",
    name: "资金管理",
    path: "fund",
    children: [
      {
        path: "fundlist",
        name: "资金流水",
      },
    ],
  },
  {
    icon: "icon-jichuxinxiguanli",
    name: "信息管理",
    path: "info",
    children: [
      {
        path: "infoshow",
        name: "个人信息",
      },
    ],
  },
]);
</script>

<style lang="less" scoped>
.menu {
  border: none;
  width: 200px;
  height: 100%;
  position: fixed;
  .el-menu {
    height: 100%;
  }
}
</style>
