import { ElMessage } from "element-plus";
import store from "./store";
import router, { addRouter, removeRouter, asyncRouter } from "./router";
import { getToken, clearSession } from "@/utils/common";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

/**
 * 用于为权限菜单添加唯一性标识
 * @param {Array} router -路由对象
 * @return {Array} 添加了唯一id后的路由对象
 */
const createUid = (router) => {
  router.forEach(e => {
    Reflect.has(e, "id") || (e.id = `id-${Math.random().toString(16)}`);
    if (Reflect.has(e, "children")) {
      e.children.map(v => v.parentId = e.id);
      createUid(e.children);
    }
  });
  return router;
};

/**
 * 用于将含有子路由的路由拍平,使父子同级
 * @param {Array} router - 路由列表
 * @param {Array} t - 用于承载返回值
 * @return {Array}获得拍平后的路由数组
 */
const flatRouter = (router, t = []) => {
  router.forEach(item => {
    const { children, ...other } = item;
    t.push(other);
    !!children && flatRouter(children, t);
  });
  return t;
};

/**
 * 用于过滤出有权限的菜单
 * @param {Array} router - 拉平的路由
 * @param {Array} list - 权限列表
 * @return {Array} 取得权限的路由
 */
const routerMap = (router, list) => router.filter(e => list.filter(item => item === e.meta.permissionId).length > 0);

/**
 * 用于将路由菜单拼装成标准路由
 * @param {Array} router
 */
const permissionMenu = (router) => {
  const obj = {};
  const res = [];
  router.forEach(item => {
    obj[item.id] = item;
  });
  router.forEach(item => {
    if (Reflect.has(item, "parentId")) {
      obj[item.parentId]["children"] ? obj[item.parentId]["children"].push(item) : obj[item.parentId]["children"] = [item];
    } else {
      res.push(item);
    }
  });
  return res;
};

/**
 * 过滤异步路由表，返回符合用户角色权限的路由表
 * @param menus 权限列表
 * @param routes
 */
const filterAsyncRoutes = (menus, routes) => {
  const ret = [];
  routes.forEach(v => {
    if (hasPermission(menus, v)) {
      ret.push(v);
      if (v.children) {
        v.children = filterAsyncRoutes(menus, v.children);
      }
    }
  });
  return ret;
};

/**
 * 根据后台返回的菜单判断当前路由是否有权限
 * @param menus
 * @param route
 * @returns {boolean}
 */
const hasPermission = (menus, route) => {
  if (route?.meta.permissionId) {
    return menus.includes(route.meta.permissionId);
  } else {
    return true;
  }
};
const whiteList = ["/login", "/404"]; // 白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "ywq-admin";
  const hasToken = getToken();
  if (whiteList.includes(to.path)) {
    if (to.path === "/login") {
      clearSession();
      store.dispatch("tagsView/delAllViews");
    }
    next();
  } else if (hasToken) {
    // 登录状态
    let permissionList = ["", "star", "theme", "async"];
    const permissionView = filterAsyncRoutes(permissionList, asyncRouter);
    permissionView.push({ path: "/:pathMatch(.*)*", name: "redirect404", redirect: "/404", meta: { hidden: true } }); // 通配路由,这里与vue-router3有区别
    removeRouter(asyncRouter);
    addRouter(permissionView);
    store.commit("loginStore/SET_PERMISSION_VIEW", permissionView); // 保存权限路由到store
    const hasPermission = router.getRoutes().map(v => v.path).includes(to.path);
    if (hasPermission) {
      if (to.matched.length === 0) {
        next({ ...to, replace: true });
      } else {
        next();
      }
    } else {
      next("/404");
    }
  } else {
    ElMessage.warning("请先登录");
    next({ name: "Login" });
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((error) => {
  const patternCss = /Loading CSS chunk chunk-(\d)+ failed/g;
  const isChunkCssLoadFailed = error.message.match(patternCss);
  const pattern = /Loading chunk chunk-(\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkCssLoadFailed || isChunkLoadFailed) {
    window.location.reload();
  }
});
