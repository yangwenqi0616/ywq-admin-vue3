import Layout from "@/layout/index.vue";

export default [
  {
    path: "/map",
    name: "map",
    component: Layout,
    redirect: "/map-display",
    meta: {title: "地图展示", icon: "map", permissionId: "map"},
    children: [{
      path: "/map-display",
      name: "mapDisplay",
      component: () => import("@/views/map-display/index.vue"),
      meta: {title: "地图展示", icon: "el-icon-picture-outline-round", permissionId: "map"}
    }]
  }
];
