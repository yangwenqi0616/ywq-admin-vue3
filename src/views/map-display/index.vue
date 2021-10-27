<template>
  <div ref="map" class="map"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { init, registerMap, ECharts } from "echarts";
import china from "./MAP_CHINA";
import { chartOption } from "./helper";
import _ from "lodash";

const map = ref<HTMLDivElement | null>(null);
let chart: ECharts;

/**
 * 用于绘制echarts
 */
const renderChart = () => {
  chart = init(map.value, undefined, {renderer: "svg"});
  chart.setOption(chartOption);
};
/**
 * 用于销毁echarts实例
 * @param {string} echarts - 待销毁的echarts实例
 */
const destroyChart = (echarts: ECharts) => {
  echarts.dispose();
  echarts.clear();
};

onMounted(() => {
  if (map.value) {
    registerMap("china", china as any);
    renderChart(chart);
  }
  // 页面大小变动时重绘echarts
  window.onresize = _.throttle(() => {
    destroyChart(chart);
    renderChart(chart);
  }, 200);
});
onUnmounted(() => {
  // 销毁地图实例
  chart && destroyChart(chart);
});
</script>
<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
