/**
 * @description 获取图层的根图层
 */
const getRootLayer = (layerId: IBaseLayer['id'], layersById: ILayersById) => {
  let innerRootLayer = layersById[layerId];
  if (!innerRootLayer || !innerRootLayer.parent) return undefined;

  while (innerRootLayer) {
    const { parent } = layersById[innerRootLayer.id];
    if (parent) {
      innerRootLayer = layersById[parent];
    } else {
      break;
    }
  }

  return innerRootLayer;
};

export default getRootLayer;
