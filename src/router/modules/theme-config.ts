import Layout from "@/layout/index.vue";

export default [
  {
    path: "/theme",
    name: "theme",
    component: Layout,
    redirect: "/theme-config",
    meta: {title: "主题设置", icon: "el-icon-s-cooperation", level: true, permissionId: "theme"},
    children: [{
      path: "/theme-config",
      name: "themeConfig",
      component: () => import("@/views/theme-config/index.vue"),
      meta: {title: "主题设置", icon: "el-icon-s-shop", level: true, permissionId: "theme"}
    },
      {
        path: "/theme-config1",
        name: "themeConfig1",
        component: () => import("@/views/theme-config/index.vue"),
        meta: {title: "主题设置", icon: "el-icon-s-promotion", level: true, permissionId: "theme"}
      }]
  }
];
