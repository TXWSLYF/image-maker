import request from './_request';

export const getProjectInfo = (id: string) =>
  request.get<RequestResponse<ProjectState>>(`/project/${id}`);
