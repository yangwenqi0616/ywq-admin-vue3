import Layout from "@/layout/index.vue";

export default [
  {
    path: "/theme",
    name: "theme",
    component: Layout,
    redirect: "/theme-config",
    meta: {title: "主题设置", icon: "el-icon-s-open", permissionId: "theme"},
    children: [{
      path: "/theme-config",
      name: "ThemeConfig",
      component: () => import("@/views/theme-config/index.vue"),
      meta: {title: "主题设置", icon: "el-icon-s-shop", permissionId: "theme"}
    }]
  }
];
