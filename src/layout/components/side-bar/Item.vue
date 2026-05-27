<template>
  <div class="no-select">
    <el-icon :size="size" :color="color">
      <component :is="currentIcon" />
    </el-icon>
    <span class="icon-name">{{ title }}</span>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import * as AllIcons from '@element-plus/icons-vue'; // 导入所有图标用于映射

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: '#000'
  }
});

// 计算属性：根据 iconName 找到对应的图标组件
const currentIcon = computed(() => {
  // 直接从已全局注册的图标集中获取组件
  // 图标名称需与注册时的 `key` (即组件名) 完全一致，例如 "Edit"、"Search"
  return AllIcons[props.icon]; // 如果找不到，返回一个默认图标
});
</script>
<style lang="scss" scoped>
.iconfont {
  // margin: 0 8px 0 3px;
}
</style>
