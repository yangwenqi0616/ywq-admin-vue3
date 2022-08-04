<template>
  <div class="nav-bar">
    <span class="collapse-btn" @click="setCollapse">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </span>
    Y.W.Q-VUE3-ADMIN-PROJECT
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const isCollapse = computed(() => {
  return store.state.loginStore.isCollapse;
});
const setCollapse = () => {
  const flag = !isCollapse.value;
  store.commit("loginStore/SET_IS_COLLAPSE", flag);
};
</script>
<style lang="scss" scoped>
.nav-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~@/assets/bk_2.jpg") no-repeat;
  background-size: cover;
  color: #fff;
  font-size: 3rem;

  .collapse-btn {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
}
</style>
