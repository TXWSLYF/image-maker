// 请求返回数据结构
interface ResDataWrapper<T> {
  code: number;
  msg: string;
  data: T;
}

// 分页请求参数结构
type PageQueryReqParamsWrapper<T> = {
  // 当前页数
  pageNum: number;

  // 分页大小
  pageSize: number;
} & Partial<T>;

// 分页返回数据结构
type PageQueryResDataWrapper<T> = ResDataWrapper<{
  // 总条数
  total: number;

  // 数据数组
  list: T[];
}>;

// CURD 传参类型
interface CURDReqDataWrapper<T> {
  // 创建
  create: Omit<T, keyof BaseModel>;

  // 删除
  delete: number;

  // 更新
  updata: Omit<T, keyof ModelMetaInfo>;

  // 查询
  retrieve: number;
}
