import Layout from "@/components/layout/index.vue";

export default [
  {
    path: "/const",
    name: "const",
    component: Layout,
    redirect: "/const-model",
    meta: {title: "固定路由", icon: "const", level: true},
    children: [{
      path: "/const-model",
      name: "constModel",
      component: () => import("../index.vue"),
      meta: {title: "固定路由", icon: "const", level: true}
    }]
  }
];
