<template>
  <div class="home">
    <div class="container">
      <h1 class="title">资金管理后台系统</h1>
      <p class="lead">
        个人独立开发的后台系统
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
  background-size: 100% 100%;

  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: #fff;

    .title {
      font-size: 30px;
    }

    .lead {
      margin-top: 50px;
      font-size: 22px;
    }
  }
}
</style>
