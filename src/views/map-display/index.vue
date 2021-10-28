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
  if (map.value) {
    chart = init(map.value, undefined, {renderer: "svg"});
    chart.setOption(chartOption);
  }
};
/**
 * 用于销毁echarts实例
 * @param {string} echarts - 待销毁的echarts实例
 */
const destroyChart = (echarts: ECharts) => {
  echarts.dispose();
  echarts.clear();
};
/**
 * 用于数据或页面变化后重绘chart
 */
const reRenderChart = _.throttle(() => {
  destroyChart(chart);
  renderChart();
}, 200);

onMounted(() => {
  registerMap("china", china as any);
  renderChart();
  // 页面大小变动时重绘echarts
  window.addEventListener("resize", reRenderChart);
});
onUnmounted(() => {
  // 销毁地图实例
  chart && destroyChart(chart);
  window.removeEventListener("resize", reRenderChart);

});
</script>
<style lang="scss" scoped>
.map {
  background: #09243e;
  height: 100%;
  width: 100%;
}
</style>
