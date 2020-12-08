import { DataNode } from 'antd/lib/tree';

const _getLayerTreeData = (layerId: IBaseLayer['id'], layersById: ILayersById, expandedKeys: React.Key[]): DataNode => {
  const layer = layersById[layerId];
  const { id, name } = layer;

  if (layer.type === 'GROUP') {
    const { isExpanded } = layer.properties;

    if (isExpanded) {
      expandedKeys.push(id);
    }

    return {
      title: name,
      key: id,
      children: layer.properties.children.map((child) => {
        return _getLayerTreeData(child, layersById, expandedKeys);
      }),
    };
  } else {
    return {
      title: name,
      key: id,
    };
  }
};

/**
 * @description 获取 layerTree 渲染数据
 */
const getLayerTreeData = (layerIds: IBaseLayer['id'][], layersById: ILayersById): [DataNode[], React.Key[]] => {
  const expandedKeys: React.Key[] = [];
  const treeData = layerIds.map((layerId) => _getLayerTreeData(layerId, layersById, expandedKeys));

  return [treeData, expandedKeys];
};

export default getLayerTreeData;
