import treeWalker from './treeWalker';

/**
 * @description 获取所有子图层 id
 */
const getChildLayerIds = (layerId: IBaseLayer['id'], layersById: ILayersById) => {
  const childLayerIds: IBaseLayer['id'][] = [];

  treeWalker(layerId, layersById, (id) => {
    childLayerIds.push(id);
  });

  return childLayerIds;
};

export default getChildLayerIds;
