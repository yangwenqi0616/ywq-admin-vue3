import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/async",
    component: Layout,
    redirect: "/async-model",
    meta: {title: "权限路由", icon: "async", level: true},
    children: [{
      path: "/async-model",
      name: "asyncModel",
      component: () => import("../index.vue"),
      meta: {title: "权限路由", icon: "async", level: true}
    }]
  }
];