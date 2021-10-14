import { r, req, request, R, Res, Response } from "../axios";
import { BaseParam, BaseResult } from "../types";
import { downloadFile } from "@/utils/download-helper";

export const getApi1 = (param: BaseParam): R<BaseResult<ModelData>> => {
  return r.post("/xx", param);
};

export const getApi2 = (param: BaseParam) => {
  return <R<BaseResult<ModelData>>>r.post(`/xx`, param);
};

export const getApi3 = async (param: BaseParam): Promise<void> => {
  const response = await request.post("/xx", param, {
    responseType: "blob"
  });
  const {headers, data} = response;
  const name = decodeURI(headers["content-disposition"].split("=")[1]);
  downloadFile(name, data);
};

export interface ModelData {
  name: string;
  age: number;
}
