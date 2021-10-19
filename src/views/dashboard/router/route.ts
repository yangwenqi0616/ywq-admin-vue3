import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "首页", icon: "home", level: true},
    children: [{
      path: "dashboard",
      name: "Dashboard",
      component: () => import("../index.vue"),
      meta: {
        title: "首页",
        icon: "home",
        level: true
      }
    }]
  }
];
