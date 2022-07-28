import Layout from "@/layout/index.vue";

export default [
  {
    path: "/async",
    name: "async",
    component: Layout,
    meta: { title: "权限路由", icon: "el-icon-s-management", permissionId: "async", alwaysShow: true },
    children: [
      {
        path: "/star",
        name: "starrySky",
        component: () => import("@/views/starry-sky/index.vue"),
        meta: {
          title: "星空展示",
          icon: "el-icon-star-off",
          permissionId: "star"
        }
      },
      {
        path: "/map-display",
        name: "mapDisplay",
        component: () => import("@/views/map-display/index.vue"),
        meta: { title: "地图展示", icon: "el-icon-data-analysis", permissionId: "map" }
      }]
  }
];
