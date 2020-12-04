import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { difference, merge } from 'lodash';
import { RootState } from 'src/app/store';
import { groupLayer } from 'src/layer';
import calcMiniEnclosingRect from 'src/utils/calcMiniEnclosingRect';
import { guid } from 'src/utils/util';

const initialState: IProjectUndoableState = {
  id: 0,
  name: 'image-maker',
  data: {
    // 画布数据
    canvas: {
      width: 600,
      height: 800,
    },

    // 图片数据
    imagesById: {},
    imageAllIds: [],

    // 图层数据
    layersById: {},
    layerAllIds: [],
  },
};

export const projectUndoableSlice = createSlice({
  name: `project/undoable`,
  initialState,
  reducers: {
    /**
     * @description 初始化项目
     */
    initProjectUndoable: (state, action: PayloadAction<IProjectUndoableState>) => {
      const { id, name, data } = action.payload;

      state.id = id;
      state.name = name;
      // fix: 新增 canvas.scale 属性失效问题，因为远程数据没有 scale
      state.data = merge(state.data, data);
    },

    /**
     * @description 设置项目名称
     */
    setProjectName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    /**
     * @description 设置画布大小
     */
    setCanvasSize: (state, action: PayloadAction<Partial<Omit<IProjectUndoableState['data']['canvas'], 'scale'>>>) => {
      const { width, height } = action.payload;

      if (width !== undefined) {
        state.data.canvas.width = width;
      }

      if (height !== undefined) {
        state.data.canvas.height = height;
      }
    },

    /**
     * @description 添加图片
     */
    addPage: (state) => {
      const id = guid();
      // TODO: 调整 name 生成算法
      state.data.imagesById[id] = { name: id, id, layers: [] };
      state.data.imageAllIds.push(id);
    },

    /**
     * @description 添加图层
     * @param imageId 添加图层的图片 id
     * @param layer 图层数据
     */
    addLayer: (state, action: PayloadAction<{ imageId: string; layer: ILayer }>) => {
      const { imageId, layer } = action.payload;
      const id = guid();

      state.data.layersById[id] = { ...layer, id };
      state.data.layerAllIds.push(id);
      state.data.imagesById[imageId].layers.push(id);
    },

    /**
     * @description 添加组合图层 TODO: 考虑 parent
     */
    addGroupLayer: (
      state,
      {
        payload: { imageId, layerIds, id },
      }: PayloadAction<{
        imageId: string;
        layerIds: IBaseLayer['id'][];
        id: string;
      }>,
    ) => {
      // 子图层
      const childrenLayers = layerIds.map((layerId) => state.data.layersById[layerId]);

      // 生成 groupLayer 初始数据
      const groupLayerData = groupLayer(id);

      // 计算 groupLayer 位置
      const groupLayerRect = calcMiniEnclosingRect(childrenLayers.map((i) => i.properties));

      // 调整 groupLayer 位置
      groupLayerData.properties = { ...groupLayerData.properties, ...groupLayerRect };

      // 添加 groupLayer children
      groupLayerData.properties.children = layerIds;

      childrenLayers.forEach((layer) => {
        // 设置子图层 parent
        layer.parent = id;

        // 重置子图层坐标为相对于父图层的坐标
        layer.properties.x = layer.properties.x - groupLayerRect.x;
        layer.properties.y = layer.properties.y - groupLayerRect.y;
      });

      // 将 groupLayer 添加到图层数据当中
      state.data.layerAllIds.push(id);
      state.data.layersById[id] = groupLayerData;

      // 将子图层从当前页面中删除
      state.data.imagesById[imageId].layers = difference(state.data.imagesById[imageId].layers, layerIds);

      // 将组合图层添加到当前页面中
      state.data.imagesById[imageId].layers.push(id);
    },

    /**
     * @description 设置图层坐标
     */
    setLayersCoordinate: (
      state,
      action: PayloadAction<{
        dragId: string;
        idWithCoordinate: ({ id: string } & ICoordinate)[];
      }>,
    ) => {
      action.payload.idWithCoordinate.forEach((coordinateWithId) => {
        const { id, x, y } = coordinateWithId;
        const { properties } = state.data.layersById[id];

        properties.x = x;
        properties.y = y;
      });
    },

    /**
     * @description 设置图层旋转角度
     */
    setLayersRotation: (
      state,
      action: PayloadAction<{
        rotateId: string;
        idWithRotation: { id: string; rotation: number }[];
      }>,
    ) => {
      action.payload.idWithRotation.forEach((idWithRotation) => {
        const { id, rotation } = idWithRotation;
        const { properties } = state.data.layersById[id];

        properties.rotation = rotation;
      });
    },

    /**
     * @description 改变图层属性，TODO: newProperties 类型定义优化
     */
    setLayersProperties(state, action: PayloadAction<{ layerId: string; newProperties: any }>) {
      const { layerId, newProperties } = action.payload;

      for (const key in newProperties) {
        state.data.layersById[layerId].properties[key as keyof ILayer['properties']] = newProperties[key];
      }
    },

    /**
     * @description 改变图层 color 属性
     */
    setLayersColor(state, action: PayloadAction<{ layerIds: string[]; newColor: string }>) {
      const { layerIds, newColor } = action.payload;

      layerIds.forEach((layerId) => {
        const layer: ITextLayer = state.data.layersById[layerId] as ITextLayer;
        layer.properties.color = newColor;
      });
    },

    /**
     * @description 设置图层基础属性
     */
    setLayersBaseProperties(
      state,
      action: PayloadAction<{
        actionId: string;
        layers: {
          id: string;
          newProperties: Partial<IBaseProperties>;
        }[];
      }>,
    ) {
      action.payload.layers.forEach(({ id, newProperties }) => {
        state.data.layersById[id].properties = { ...state.data.layersById[id].properties, ...newProperties };
      });
    },

    /**
     * @description 设置图片图层属性
     */
    setImgLayerProperties: (
      state,
      action: PayloadAction<{
        layerId: IBaseLayer['id'];
        newProperties: Partial<IImgProperties>;
      }>,
    ) => {
      const { layerId, newProperties } = action.payload;
      const layer: IImgLayer = state.data.layersById[layerId] as IImgLayer;

      layer.properties = { ...layer.properties, ...newProperties };
    },

    /**
     * @description 删除图层
     */
    deleteLayers(state, action: PayloadAction<IBaseLayer['id'][]>) {
      const { payload } = action;
      let { imagesById, imageAllIds, layersById } = state.data;

      // 删除所有 image 中要删除的 layer
      imageAllIds.forEach((imageId) => {
        imagesById[imageId].layers = imagesById[imageId].layers.filter((layer) => !payload.includes(layer));
      });

      // 删除所有 layer
      state.data.layerAllIds = state.data.layerAllIds.filter((layerId) => !payload.includes(layerId));
      payload.forEach((layerId) => {
        delete layersById[layerId];
      });
    },

    /**
     * @description 删除页面
     */
    deletePages(state, action: PayloadAction<string[]>) {
      // 筛选出剩余未删除页面
      const unDeletedPageIds = difference(state.data.imageAllIds, action.payload);

      // 页面数量最少为 1
      if (unDeletedPageIds.length === 0) {
        throw new Error('不能删除全部页面');
      }

      action.payload.forEach((pageId) => {
        // 删除图层数据
        const { layers } = state.data.imagesById[pageId];
        layers.forEach((layerId) => {
          delete state.data.layersById[layerId];
        });
        state.data.layerAllIds = difference(state.data.layerAllIds, layers);

        // 删除页面数据
        delete state.data.imagesById[pageId];
      });
      state.data.imageAllIds = unDeletedPageIds;
    },

    /**
     * @description 修改图层名称
     */
    setLayersName(state, action: PayloadAction<{ ids: IBaseLayer['id'][]; name: IBaseLayer['name'] }>) {
      const { ids, name } = action.payload;

      ids.forEach((id) => {
        state.data.layersById[id].name = name;
      });
    },
  },
});

export const {
  initProjectUndoable,
  setProjectName,
  setCanvasSize,
  addPage,
  addLayer,
  addGroupLayer,
  setLayersCoordinate,
  setLayersProperties,
  setLayersColor,
  setLayersRotation,
  setLayersBaseProperties,
  deleteLayers,
  setImgLayerProperties,
  deletePages,
  setLayersName,
} = projectUndoableSlice.actions;

export const selectProject = (state: RootState) => state.project.undoable.present;
export const selectProjectName = (state: RootState) => state.project.undoable.present.name;
export const selectImages = (state: RootState) => {
  const { imagesById, imageAllIds } = state.project.undoable.present.data;

  return {
    byId: imagesById,
    allIds: imageAllIds,
  };
};
export const selectLayers = (state: RootState) => {
  const { layersById, layerAllIds } = state.project.undoable.present.data;

  return {
    byId: layersById,
    allIds: layerAllIds,
  };
};
export const selectCanvas = (state: RootState) => state.project.undoable.present.data.canvas;
export const selectProjectPastLength = (state: RootState) => state.project.undoable.past.length;
export const selectProjectFutureLength = (state: RootState) => state.project.undoable.future.length;
export const selectPageAllIds = (state: RootState) => state.project.undoable.present.data.imageAllIds;

const projectUndoableReducer = projectUndoableSlice.reducer;
export default projectUndoableReducer;
