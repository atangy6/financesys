<template>
  <div class="main">
    <head-nav-vue></head-nav-vue>
    <left-menu-vue></left-menu-vue>
    <router-view></router-view>
  </div>
</template>

<script setup>
import HeadNavVue from "@/components/HeadNav.vue";
import LeftMenuVue from "@/components/LeftMenu.vue";
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
