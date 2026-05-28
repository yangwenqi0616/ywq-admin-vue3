<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    @change="configTheme"
  />
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const theme = computed(() => themeStore.themeColor);
const el = document.getElementById('nav') as HTMLDivElement;

const configTheme = (val: string) => {
  themeStore.changeTheme(val);
  el.style.setProperty('--mainColor', theme.value);
  // const defaultColor = getComputedStyle(el).getPropertyValue("--mainColor");
};
onMounted(() => {
  el.style.setProperty('--mainColor', theme.value);
});
</script>
