import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/theme",
    name: "theme",
    component: Layout,
    redirect: "/theme-config",
    meta: {title: "主题设置", icon: "config", level: true, permissionId: "theme"},
    children: [{
      path: "/theme-config",
      name: "themeConfig",
      component: () => import("../index.vue"),
      meta: {title: "主题设置", icon: "config", level: true, permissionId: "theme"}
    }]
  }
];
