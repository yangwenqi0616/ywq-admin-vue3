<template>
  <div
    class="container"
    :style="{ height: containerHeight }"
    @scroll="handleScroll"
    ref="container"
  >
    <!-- 数据列表 -->
    <div :style="{ transform: `translateY(${listTop})` }">
      <slot v-for="v in showData"
            :key="v.code+v.group"
            :style="{ height: size + 'px' }"
            :row="v" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, computed, defineProps } from 'vue';

const props = defineProps({
  // 要渲染的数据
  items: {
    type: Array,
    required: true
  },
  // 每条数据渲染的节点的高度
  size: {
    type: Number,
    required: true
  },
  // 缓存个数,使滚动过度流畅,默认缓存2个
  cacheNum: {
    type: Number,
    default: 2
  },
  // 每次渲染的 DOM 节点个数
  showNumber: {
    type: Number,
    required: true
  }
});
// 使用 toRefs 包裹 props，让解构获得的父组件传递的参数变为响应式的
const { items, size, cacheNum, showNumber } = toRefs(props);

// region 声明变量
const container = ref(null); // 页面 container 节点
let start = ref(0); // 要展示的数据的起始下标
let end = ref(showNumber.value + cacheNum?.value); // 要展示的数据的结束下标
// endregion

// region 计算属性
const showData = computed(() => items.value.slice(start.value, end.value)); // 最终筛选出的要展示的数据
const containerHeight = computed(() => size.value * showNumber.value + 'px'); // 容器的高度
const barHeight = computed(() => size.value * items.value.length + 'px'); // 撑开容器内容高度的元素的高度
const listTop = computed(() => start.value * size.value + 'px'); // 列表向上滚动时要动态改变 top 值
// endregion

// 容器的滚动事件
const handleScroll = () => {
  // 获取容器顶部滚动的尺寸
  const scrollTop = container.value.scrollTop;
  // 计算卷去的数据条数，用计算的结果作为获取数据的起始和结束下标
  // 起始的下标就是卷去的数据条数，向下取整
  start.value = Math.floor(scrollTop / size.value);
  // 结束的下标就是起始的下标加上要展示的数据条数
  end.value = start.value + showNumber.value + cacheNum?.value;
};
</script>
<style scoped lang="scss">
.container {
  overflow-y: scroll;
  // 滚动条的宽度
  &::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 6px; // 纵向滚动条 必写
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;

    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
