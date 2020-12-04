import { calcRectCenter } from './calcMiniEnclosingRect';
import calcRotatePoint from './calcRotatePoint';

/**
 * @description 计算图层实际位置
 */
const getLayerRect = (layerId: IBaseLayer['id'], layersById: ILayersById): IRect => {
  let { x, y, width, height, rotation } = layersById[layerId].properties;
  let parentLayerId = layersById[layerId].parent;

  while (parentLayerId) {
    // 获取父图层
    const parentLayer = layersById[parentLayerId];

    // 计算当前图层在父图层坐标系下的中心点坐标
    const layerCenter = calcRectCenter({ x, y, width, height, rotation });

    // 计算父图层在爷爷图层坐标系下的中心点坐标
    const parentLayerCenter = calcRectCenter(parentLayer.properties);

    const { x: parentX, y: parentY, rotation: parentRotation } = parentLayer.properties;
    const newLayerCenter = calcRotatePoint(
      layerCenter,

      // 图层中心点坐标校准
      { x: parentLayerCenter.x - parentX, y: parentLayerCenter.y - parentY },

      parentRotation,
    );

    x = parentX + x + newLayerCenter.x - layerCenter.x;
    y = parentY + y + newLayerCenter.y - layerCenter.y;
    rotation += parentRotation;

    parentLayerId = parentLayer.parent;
  }

  return {
    x,
    y,
    width,
    height,
    rotation,
  };
};

export default getLayerRect;
