import ECharts = echarts.ECharts;

/**
 * 用于echarts图表轮播
 * @param {string} chart - 指定chart
 * @param {string} timers - 管理定、延时器集合
 * @param {string} timer - 定时器
 * @param {string} timeOut - 延时器
 * @param {string} length - 轮播数据的长度
 * @param {string} index - 从第几个数据开始轮播（默认第0项）
 * @param {string} interval - 轮询间隔（默认两秒）
 */
export const autoTip = (chart: ECharts, timers: any, timer: string, timeOut: string, length: number, index = 0, interval = 2000) => {
  let item = 0;
  const allDownArray = Array(length + 1).fill(undefined).map(() => {
    return item++;
  });

  // 防止hover元素为最后一个时,加一后超出length
  index = index > length ? 0 : index;

  // 首次渲染或hover后重置toolTip
  const resetTip = (showIndex: any) => {
    chart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: allDownArray
    });

    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: showIndex
    });
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: showIndex
    });
  };
  resetTip(index);

  // 设表先关,防止多次设置
  timers[timer] && clearInterval(timers[timer]);

  // 定时轮询
  timers[timer] = setInterval(() => {
    chart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index
    });
    index = index >= length ? 0 : index + 1;
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index
    });

    // 显示 tooltip
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index
    });
  }, interval);

  // 鼠标进入停止轮询功能，4S后重启,从鼠标离开位置继续轮询
  chart.on("mouseover", (e: any) => {
    const interval = 2000;
    timers[timer] && clearInterval(timers[timer]);
    const dataIndex = e.dataIndex;
    resetTip(dataIndex);
    timers[timeOut] && clearInterval(timers[timeOut]);
    timers[timeOut] = setTimeout(() => {
      autoTip(chart, timers, timer, timeOut, length, dataIndex + 1, interval);
    }, 4000);
  });
};
