import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/async",
    name: "async",
    component: Layout,
    redirect: "/async-model",
    meta: {title: "权限路由", icon: "async", level: true, permissionId: "async"},
    children: [{
      path: "/async-model",
      name: "asyncModel",
      component: () => import("../index.vue"),
      meta: {title: "权限路由", icon: "async", level: true, permissionId: "async"}
    }]
  }
];
