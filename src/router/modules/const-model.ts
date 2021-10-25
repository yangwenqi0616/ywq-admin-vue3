import Layout from "@/layout/index.vue";

export default [
  {
    path: "/const",
    name: "const",
    component: Layout,
    redirect: "/const-model",
    meta: {title: "固定路由", icon: "el-icon-s-cooperation"},
    children: [{
      path: "/const-model",
      name: "constModel",
      component: () => import("@/views/const-model/index.vue"),
      meta: {title: "固定路由", icon: "el-icon-present"}
    },
      {
        path: "/const-model1",
        name: "constModel1",
        component: () => import("@/views/const-model/index2.vue"),
        meta: {title: "固定路由2", icon: "el-icon-s-opportunity"}
      }]
  }
];
