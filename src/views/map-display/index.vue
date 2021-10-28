<template>
  <div ref="map" class="map"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { init, registerMap, ECharts } from "echarts";
import china from "./MAP_CHINA";
import { chartOption, mapData, TimerList } from "./helper";
import { autoTip } from "@/utils/chart-carousel";
import _ from "lodash";

const map = ref<HTMLDivElement | null>(null);
let chart: ECharts;
const timers: TimerList = {
  timer: 0,
  timeOut: 0
}; // 轮询用的定时器

/**
 * 用于绘制echarts
 */
const renderChart = () => {
  if (map.value) {
    chart = init(map.value, undefined, {renderer: "svg"});
    chart.setOption(chartOption);
    autoTip(chart, timers, "timer", "timeOut", mapData.length - 1);
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
  timers.timer && clearInterval(timers.timer);
  timers.timeOut && clearTimeout(timers.timeOut);
});
</script>
<style lang="scss" scoped>
.map {
  background: #09243e;
  height: 100%;
  width: 100%;
}
</style>
