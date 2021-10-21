import Layout from "@/layout/index.vue";

export default [
  {
    path: "/async",
    name: "async",
    component: Layout,
    redirect: "/async-model",
    meta: {title: "权限路由", icon: "el-icon-thumb", level: true, permissionId: "async"},
    children: [{
      path: "/async-model",
      name: "asyncModel",
      component: () => import("@/views/async-model/index.vue"),
      meta: {title: "权限路由", icon: "el-icon-thumb", level: true, permissionId: "async"}
    }]
  }
];
