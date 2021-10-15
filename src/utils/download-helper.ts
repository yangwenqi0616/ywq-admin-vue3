import axios from "axios";

/**
 * 下载工具
 * @param {string} url - 下载地址
 * @param {any} params - 参数
 */
export const downloadHelper = async (url: string, params: any) => {
  const res = await axios.post(url, params, {responseType: "arraybuffer"});
  const fileName = window.decodeURI(
      res.headers["content-disposition"].split("=")[1]
  );
  const data = new Blob([res.data], {
    type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  });
  downloadFile(fileName, data);
};

/**
 * 下载文件
 * @param name 文件名
 * @param data 数据
 */
export const downloadFile = (name: string, data: Blob) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = URL.createObjectURL(data);
  link.click();
};
