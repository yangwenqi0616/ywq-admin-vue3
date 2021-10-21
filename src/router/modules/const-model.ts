import Layout from "@/layout/index.vue";

export default [
  {
    path: "/const",
    name: "const",
    component: Layout,
    redirect: "/const-model",
    meta: {title: "固定路由", icon: "el-icon-s-cooperation", level: true},
    children: [{
      path: "/const-model",
      name: "constModel",
      component: () => import("@/views/const-model/index.vue"),
      meta: {title: "固定路由", icon: "el-icon-present", level: true}
    },
      {
        path: "/const-model1",
        name: "constModel1",
        component: () => import("@/views/const-model/index.vue"),
        meta: {title: "固定路由", icon: "el-icon-s-opportunity", level: true}
      }]
  }
];
