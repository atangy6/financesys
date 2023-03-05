<template>
  <div class="infoshow">
    <div class="user">
      <!-- <img src="user.avatar" alt="" class="avatar"> -->
      <img src="../../assets/images/user-default.png" alt="" class="avatar" />
    </div>

    <div class="userinfo">
      <div class="user-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghu-xianxing"></use>
        </svg>
        <span>{{ user.name }}</span>
      </div>

      <div class="user-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shezhi"></use>
        </svg>
        <span>{{ user.identify }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const user = computed(() => {
  return store.getters.user;
});
</script>

<style lang="less" scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-left: 200px;
  display: flex;

  .user {
    width: 400px;
    text-align: center;
    position: relative;
    top: 30%;
    img {
      width: 150px;
      border-radius: 50%;
    }
  }

  .userinfo {
    flex: 1;
    height: 100%;
    background-color: #eee;
    span {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }

    .user-item {
      position: relative;
      top: 30%;
      padding: 26px;
      font-size: 28px;
      color: #333;
      display: flex;
      align-items: center;

      .icon {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
