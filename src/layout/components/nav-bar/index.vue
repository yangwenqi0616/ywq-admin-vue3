<template>
  <div class="nav-bar">Y.W.Q-VUE3-ADMIN-PROJECT</div>
  <el-button @click="setCollapse">{{ isCollapse ? "展开" : "关闭" }}</el-button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~@/assets/bk_2.jpg") no-repeat;
  background-size: cover;
  color: #fff;
  font-size: 3rem;
}
</style>
