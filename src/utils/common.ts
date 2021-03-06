import _ from "lodash";

/**
 * 用于自动适配屏幕大小(多用于可视化大屏)
 * @param {string} dw 设计宽
 * @param {string} dh 设计高
 * @param {boolean} needLT 是否将缩放定点定为(0 0)
 */
export const resetScreenSize = (dw: number, dh: number, needLT = false) => {
  const init = () => {
    const _el: any = document.querySelector("#box");
    const hScale = window.innerHeight / (dh || 1080);
    const wScale = window.innerWidth / (dw || 1920);
    _el.style.transform = "scaleX(" + wScale + ") scaleY(" + hScale + ")";
    needLT && (_el.style.transformOrigin = "0 0");
  };
  //窗口大小发送改变时自动调整
  window.onresize = _.throttle(() => {
    init();
  }, 200);
  init();
};

/**
 * 把json对象拼接成符合get请求的url参数
 * @param {Object} paramsObj 参数对象
 * @return {string} 拼接后的参数字符串
 * example:
 *  const obj = {
      name: 'ywq',
      age: 36,
      job: 'web'
    } => 'name=ywq&age=36&job=web'
 */
export const concatParams = (paramsObj: any): string => {
  let ret = "";
  for (const it in paramsObj) {
    ret += encodeURIComponent(it) + "=" + encodeURIComponent(paramsObj[it]) + "&";
  }
  return ret.slice(0, -1);
};

/**
 * 是否为外链地址
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * 用于切换目标元素类名
 * @param {HTMLElement} element - 切换类名的目标元素
 * @param {string} className - 类名
 */
export const toggleClass = (element: HTMLElement, className: string) => {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString = classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length);
  }
  element.className = classString;
};

// sessionStorage操作
const TokenKey = "token";

export const getToken = (): string => <string>sessionStorage.getItem(TokenKey);

export const setToken = (token: string): void => {
  sessionStorage.setItem(TokenKey, token);
};

export const removeToken = (): void => {
  sessionStorage.removeItem(TokenKey);
};

export const getKey = (key: string): string => <string>sessionStorage.getItem(key);

export const setKey = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const removeKey = (key: string): void => {
  sessionStorage.removeItem(key);
};

export const clearSession = (): void => {
  sessionStorage.clear();
};
