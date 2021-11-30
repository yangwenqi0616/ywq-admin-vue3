<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    @change="configTheme"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const theme = ref(store.state.theme.themeColor);
const el = document.getElementById("nav") as HTMLDivElement;

const configTheme = (val: string) => {
  store.dispatch("theme/changeTheme", val);
  el.style.setProperty("--mainColor", theme.value);
  // const defaultColor = getComputedStyle(el).getPropertyValue("--mainColor");
};
onMounted(() => {
  el.style.setProperty("--mainColor", theme.value);
});
</script>
