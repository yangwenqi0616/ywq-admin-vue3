<template>
  <div ref="map" class="map"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { init, registerMap, ECharts } from "echarts";
import china from "./MAP_CHINA";
import { chartOption } from "./helper";
import { AutoPlay } from "@/utils/chart-carousel";
import _ from "lodash";

const map = ref<HTMLDivElement | null>(null);
let chart: ECharts;
let player = ref(); // echarts轮播器

/**
 * 用于绘制echarts
 * @param {boolean} isAutoPlay - 是否自动轮播,默认为true
 */
const renderChart = (isAutoPlay = true) => {
  if (map.value) {
    chart = init(map.value, undefined, {renderer: "svg"});
    chart.setOption(chartOption);
    //TODO 是否支持多次new
    player.value = new AutoPlay(chart);
    isAutoPlay && player.value.init();
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
  player.value && player.value.destroy();
  player.value = null;
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
  player.value && player.value.destroy();
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
