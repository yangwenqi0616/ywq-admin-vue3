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
  window.onresize = () => {
    init();
  };
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
