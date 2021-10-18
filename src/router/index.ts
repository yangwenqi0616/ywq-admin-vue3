import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import dashboardRouter from "@/views/dashboard/router/route";
import mapRouter from "@/views/map-display/router/route";
import themeConfigRouter from "@/views/theme-config/router/route";
import constModelRouter from "@/views/const-model/router/route";
import asyncModelRouter from "@/views/async-model/router/route";

// 权限路由
export const asyncRouter: Array<RouteRecordRaw> = [
  ...mapRouter,
  ...themeConfigRouter,
  ...asyncModelRouter
];

// 固定路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: {hidden: true}
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: {hidden: true}
  },
  ...dashboardRouter,
  ...constModelRouter
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

export default router;
