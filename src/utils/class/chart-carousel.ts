import { ECharts } from "echarts";
import _ from "lodash";

/**
 * Class AutoPlay - Echarts自动轮播器
 * 必传参数 chart - 需轮播的echarts实例 exm: const autoPlayChart = new AutoPlay(chart);
 * 提供的方法
 * init: 轮播器的初始化
 * exm: autoPlayChart.init(i = 0, interval = 2000) 参数可选,默认从位置0(第一项),间隔2s开始轮播
 * destroy: 轮播器的销毁
 * autoPlayChart.destroy()
 * @author Ywq
 * @date 2021/10/29 15:21
 */
export class AutoPlay implements ChartPlayer {
  public timer: NodeJS.Timer | null = null; // 轮播定时器
  public timeOut: NodeJS.Timeout | null = null; // 防抖延时器
  public interval = 2000; // 轮播间隔,默认2秒
  readonly chart: ECharts | null = null; // 需轮播的echarts
  readonly length: number = 0; // 图表数据长度
  readonly indexList = [0]; // 保存所有轮播item下标的数组

  constructor(chart: ECharts) {
    const series: any = chart?.getOption()?.series;
    this.length = series[0]?.data?.length;
    this.chart = chart;
    this.indexList = Array(this.length).fill(undefined).map((v, i) => i);
    // 鼠标移动停止轮播,接下来从最后停留位置继续轮播
    chart.on("mouseover", _.throttle((e: any) => {
      this.timer && clearInterval(this.timer);
      const dataIndex = e.dataIndex;
      this.resetTip(dataIndex); // 激活鼠标停留项
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.init(dataIndex + 1);
      }, this.interval);
    }, 200));
  }

  /**
   * 用于首次渲染或hover后重置toolTip
   * @param {number} index - 激活项下标
   */
  private resetTip(index: number): void {
    if (this.chart) {
      this.chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: this.indexList
      });
      this.chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index
      });
      this.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index
      });
    }
  }

  /**
   * 用于初始化轮播器
   * @param {number} i - 激活项下标
   * @param {number} interval - 轮播间隔
   */
  public init(i = 0, interval = 2000): void {
    this.interval = interval;
    const chart = this.chart;
    // 如果index过大,超过最大index,则归零
    i = i >= this.length ? 0 : i;
    this.resetTip(i);  // 激活i项,首次默认第一项
    // 设表先关,防止多次设置
    this.timer && clearInterval(this.timer);
    if (chart) {
      this.timer = setInterval(() => {
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: i
        });
        i = i >= this.length - 1 ? 0 : ++i;
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: i
        });
        chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: i
        });
      }, this.interval);
    }
  }

  /**
   * 用于销毁轮播器
   */
  public destroy(): void {
    this.timer && clearInterval(this.timer);
    this.timeOut && clearTimeout(this.timeOut);
    console.log("chartPlayer has been destroyed");
  }
}

export interface ChartPlayer {
  timer: NodeJS.Timer | null;
  timeOut: NodeJS.Timeout | null;
  interval: number;
  chart: ECharts | null;
  length: number;
  indexList: number[];

  init(): void;

  destroy(): void;
}
