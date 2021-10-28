import { EChartsOption } from "echarts";

export const mapData: MapData[] = [
  {value: 2, name: "北京", id: 11},
  {value: 1, name: "天津", id: 12},
  {value: 51, name: "河北", id: 13},
  {value: 254, name: "山西", id: 14},
  {value: 2, name: "内蒙古", id: 15},
  {value: 2, name: "辽宁", id: 21},
  {value: 13, name: "吉林", id: 22},
  {value: 781, name: "黑龙江", id: 23},
  {value: 2, name: "上海", id: 31},
  {value: 2, name: "江苏", id: 32},
  {value: 452, name: "浙江", id: 33},
  {value: 2, name: "安徽", id: 34},
  {value: 2, name: "福建", id: 35},
  {value: 52, name: "江西", id: 36},
  {value: 1, name: "山东", id: 37},
  {value: 552, name: "河南", id: 41},
  {value: 24, name: "湖北", id: 42},
  {value: 1, name: "湖南", id: 43},
  {value: 582, name: "广东", id: 44},
  {value: 14, name: "广西", id: 45},
  {value: 1, name: "海南", id: 46},
  {value: 15, name: "重庆", id: 50},
  {value: 82, name: "四川", id: 51},
  {value: 145, name: "贵州", id: 52},
  {value: 42, name: "云南", id: 53},
  {value: 2, name: "西藏", id: 54},
  {value: 2, name: "陕西", id: 61},
  {value: 10, name: "甘肃", id: 62},
  {value: 1, name: "青海", id: 63},
  {value: 144, name: "宁夏", id: 64},
  {value: 2, name: "新疆", id: 65},
  {value: 16, name: "台湾", id: 66},
  {value: 6, name: "南海诸岛", id: 67}
];

export const chartOption = {
  tooltip: {
    show: true,
    trigger: "item",
    backgroundColor: "rgba(185,233,234,0.8)",
    formatter: "{b}: {c}"
  },
  visualMap: {
    show: true,
    type: "continuous",
    right: "50",
    bottom: 30,
    inRange: {
      color: ["#21c899", "#2185c8", "#0b253b"],
      symbolSize: [30, 100]
    },
    itemHeight: 200,
    textStyle: {
      color: "#fff",
      fontSize: 20
    }
  },
  series: [
    {
      type: "map",
      map: "china",
      zoom: 1.2,
      roam: false,
      label: {
        show: true,
        color: "#fff"
      },
      itemStyle: {
        borderColor: "#22fcf9",
        borderWidth: 1,
        areaColor: "#21c899"
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
      data: mapData
    }
  ]
} as EChartsOption;

interface MapData {
  name: string;
  id: number;
  value: number;
}

export interface TimerList {
  timer: number;
  timeOut: number;
}
