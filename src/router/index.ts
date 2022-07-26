import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import dashboardRouter from "@/router/modules/dashboard";
import themeConfigRouter from "@/router/modules/theme-config";
import personalCenterRouter from "@/router/modules/personal-center";
import asyncModelRouter from "@/router/modules/async-model";

/**
 * *路由配置一定要有name,该属性是removeRouter的必要条件
 * meta - 路由配置
 * 可选参数
 * hidden: 是否隐藏
 * affix: 是否为导航栏常附标签
 * permissionId: 权限id 权限路由必须
 * url: 如果是内嵌网页,则为网页地址
 * icon: element-ui中的图标,见下网址
 *  https://element.eleme.cn/#/zh-CN/component/icon
 */

// 权限路由
export const asyncRouter: Array<RouteRecordRaw> = [
  ...themeConfigRouter,
  ...asyncModelRouter
];

// 固定路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: { hidden: true }
  },
  ...dashboardRouter,
  ...personalCenterRouter
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
    v.name && router.hasRoute(v.name) && router.removeRoute(v.name);
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
