import request from './_request';

export const getProjectInfo = (id: string) =>
  request.get<IRequestResponse<IProjectState>>(`/project/${id}`);
