import createCurdApis from 'src/common/utils/createCurdApis';

const projectApi = createCurdApis<DtoProject>('/project');

export default projectApi;
