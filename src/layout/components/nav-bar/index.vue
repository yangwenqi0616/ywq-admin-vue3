<template>
  <div class="nav-bar">
    <span class="collapse-btn" @click="setCollapse">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </span>
    <span>YWQ-VUE3+TS后台管理</span>
    <el-dropdown trigger="click" @command="goOut">
      <div class="user">
        <span class="user-logo">{{ userData.name.slice(0, 1) }}</span>
        <span class="user-info">{{ userData.name }}</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i>
            <span>注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const isCollapse = computed(() => {
  return store.state.loginStore.isCollapse;
});
const userData = computed(() => {
  return store.state.loginStore.userData;
});
const goOut = () => {
  router.push('/login');
};
const setCollapse = () => {
  const flag = !isCollapse.value;
  store.commit('loginStore/SET_IS_COLLAPSE', flag);
};
</script>
<style lang="scss" scoped>
.nav-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url('@/assets/bk_2.jpg') no-repeat;
  background-size: cover;
  color: #fff;
  font-size: 3rem;
  padding: 0 20px;

  .collapse-btn {
    font-size: 26px;
    color: #fff;
    cursor: pointer;
  }

  .user {
    display: flex;
    align-items: center;
    cursor: pointer;

    &-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #0070ff;
      color: #fff;
      font-size: 12px;
    }

    &-info {
      font-size: 14px;
      color: #fff;
      padding: 0 3px;

      &:hover {
        color: #ccc;
      }
    }

    .el-icon-arrow-down {
      color: #fff;
    }
  }
}
</style>
