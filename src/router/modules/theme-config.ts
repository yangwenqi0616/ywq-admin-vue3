import Layout from "@/layout/index.vue";

export default [
  {
    path: "/theme",
    name: "theme",
    component: Layout,
    redirect: "/theme-config",
    meta: {title: "主题设置", icon: "el-icon-s-cooperation", permissionId: "theme"},
    children: [{
      path: "/theme-config",
      name: "themeConfig",
      component: () => import("@/views/theme-config/index.vue"),
      meta: {title: "主题设置", icon: "el-icon-s-shop", permissionId: "theme"}
    },
      {
        path: "http://www.baidu.com",
        name: "baidu",
        component: () => import("@/views/theme-config/index.vue"),
        meta: {title: "百度", icon: "el-icon-s-promotion", permissionId: "theme", hidden: false}
      }]
  }
];
