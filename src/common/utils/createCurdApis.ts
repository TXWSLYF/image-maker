import request from './request';

/**
 * @description 创建 curdApis
 */
const createCurdApis = <T extends BaseModel, U = T>(path: string) => ({
  // 分页查询
  list: (params?: PageQueryReqParamsWrapper<T>) => request.get<PageQueryResDataWrapper<U>>(path, { params }),

  // 创建
  create: (data: CURDReqDataWrapper<T>['create']) => request.post<ResDataWrapper<U>>(path, data),

  // 更新
  update: (data: CURDReqDataWrapper<T>['updata']) => request.put<ResDataWrapper<U>>(`${path}/${data.id}`, data),

  // 获取
  retrieve: (id: CURDReqDataWrapper<T>['retrieve']) => request.get<ResDataWrapper<U>>(`${path}/${id}`),

  // 删除
  delete: (id: CURDReqDataWrapper<T>['delete']) => request.delete<ResDataWrapper<U>>(`${path}/${id}`),
});

export default createCurdApis;
