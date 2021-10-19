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
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: {hidden: true}
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: {hidden: true}
  },
  ...dashboardRouter,
  ...constModelRouter
];

// 创建路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

/**
 * 用于动态添加路由
 * @param {RouteRecordRaw[]} routerList - 要添加的路由列表
 */
export const addRouter = (routerList: RouteRecordRaw[]) => {
  routerList.forEach((v: RouteRecordRaw) => {
    router.addRoute(v);
  });
};

/**
 * 用于删除路由
 * @param {RouteRecordRaw[]} routerList - 要删除的路由列表
 */
export const removeRouter = (routerList: RouteRecordRaw[]) => {
  routerList.forEach((v: RouteRecordRaw) => {
    v.name && router.removeRoute(v.name);
  });
};

/**
 * 用于重置路由
 */
export const resetRouter = () => {
  removeRouter(router.getRoutes());
  addRouter(constantRoutes);
};
export default router;
