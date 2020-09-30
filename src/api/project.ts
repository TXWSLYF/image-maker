import request from './_request';

export const getProjectInfo = (id: string) =>
  request.get<IResponseWrapper<IProjectState>>(`/project/${id}`);
