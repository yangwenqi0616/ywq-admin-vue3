import { EChartsOption } from "echarts";

export const chartOption = {
  geo: {
    map: "china",
    zoom: 1.2,
    itemStyle: {
      borderColor: "#22fcf9",
      borderWidth: 5
    }
  },
  series: [
    {
      type: "map",
      roam: false,
      label: {
        show: true,
        color: "#fff"
      },
      itemStyle: {
        borderColor: "#22fcf9",
        borderWidth: 1,
        areaColor: "#092036"
      },
      emphasis: {
        itemStyle: {
          borderColor: "#1950CC",
          areaColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#10CECA" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#009AFF" // 100% 处的颜色
              }
            ],
            global: false // 缺为 false
          },
          shadowBlur: 3,
          shadowOffsetX: 2,
          shadowOffsetY: 3,
          shadowColor: "#1B9EF8"
        },
        label: {
          color: "#fff"
        }
      },
      zoom: 1.2,
      map: "china", //使用
      select: false,
      data: []
    }
  ]
} as EChartsOption;
