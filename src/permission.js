import { ElMessage } from "element-plus";
import store from "./store";
import router, { addRouter, asyncRouter } from "./router";
import { getToken } from "@/utils/common";
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

const whiteList = ["/login", "/404"]; // 白名单
const permissionList = ["map", "theme", "async"]; // 权限列表,这里写死,一般要配置由接口返回
const flatView = routerMap(flatRouter(createUid(asyncRouter)), permissionList);
const permissionView = permissionMenu(flatView);
permissionView.push({ path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } }); // 通配路由,这里与vue-router3有区别
addRouter(permissionView);
store.commit("loginStore/SET_PERMISSION_VIEW", permissionView); // 保存权限路由到store

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "ywq-admin";
  const hasToken = getToken();
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else if (hasToken) {
    next();
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
