import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'src/app/store';
import projectApi from 'src/api/project';
import { guid } from 'src/utils/util';

const initialState: IProjectState = {
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

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    /**
     * @description 初始化项目
     */
    initProject: (state, action: PayloadAction<IProjectState>) => {
      const { id, name, data } = action.payload;

      state.id = id;
      state.name = name;
      state.data = data;
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
    setCanvasSize: (state, action: PayloadAction<Partial<IProjectState['data']['canvas']>>) => {
      state.data.canvas = { ...state.data.canvas, ...action.payload };
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
  },
});

export const {
  initProject,
  setProjectName,
  setCanvasSize,
  addPage,
  addLayer,
  setLayersCoordinate,
  setLayersProperties,
  setLayersColor,
  setLayersRotation,
  setLayersBaseProperties,
  deleteLayers,
  setImgLayerProperties,
} = projectSlice.actions;

export const selectProject = (state: RootState) => state.project.present;
export const selectProjectName = (state: RootState) => state.project.present.name;
export const selectImages = (state: RootState) => {
  const { imagesById, imageAllIds } = state.project.present.data;

  return {
    byId: imagesById,
    allIds: imageAllIds,
  };
};
export const selectLayers = (state: RootState) => {
  const { layersById, layerAllIds } = state.project.present.data;

  return {
    byId: layersById,
    allIds: layerAllIds,
  };
};
export const selectCanvas = (state: RootState) => state.project.present.data.canvas;
export const selectProjectPastLength = (state: RootState) => state.project.past.length;
export const selectProjectFutureLength = (state: RootState) => state.project.future.length;

/**
 * @description 保存项目
 */
export const saveProject = (): AppThunk => async (dispatch, getState) => {
  const { id, name, data } = getState().project.present;
  await projectApi.update({ id, name, data: JSON.stringify(data) });
};

export default projectSlice.reducer;
