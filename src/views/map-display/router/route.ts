import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/map",
    component: Layout,
    redirect: "/map-display",
    meta: {title: "地图展示", icon: "map", level: true},
    children: [{
      path: "/map-display",
      name: "map",
      component: () => import("../index.vue"),
      meta: {title: "地图展示", icon: "map", level: true}
    }]
  }
];
