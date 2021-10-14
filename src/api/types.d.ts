export interface BaseParam {
  startDate: string; // 开始时间
  endDate: string; // 截止时间
  page: number; // 页码
  size: number; // 每页大小
}

export interface BaseResult<T> {
  data: T[];
  total: number;
  dataTotal: null;
}
