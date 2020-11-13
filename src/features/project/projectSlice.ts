import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { guid } from 'src/utils/util';

const initialState: IProjectState = {
  id: 0,
  title: '',
  canvas: {
    width: 600,
    height: 800,
  },
  images: { byId: {}, allIds: [] },
  layers: { byId: {}, allIds: [] },
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    /**
     * @description 初始化项目
     */
    initProject: (state, action: PayloadAction<IProjectState>) => {
      const { id, title, images, layers, canvas } = action.payload;

      state.id = id;
      state.title = title;
      state.images = images;
      state.layers = layers;
      state.canvas = canvas;
    },

    /**
     * @description 设置项目名称
     */
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    /**
     * @description 设置画布大小
     */
    setCanvasSize: (state, action: PayloadAction<Partial<IProjectState['canvas']>>) => {
      state.canvas = { ...state.canvas, ...action.payload };
    },

    /**
     * @description 添加图片
     */
    addImage: (state) => {
      const id = guid();
      state.images.byId[id] = { name: id, id, layers: [] };
      state.images.allIds.push(id);
    },

    /**
     * @description 添加图层
     * @param imageId 添加图层的图片 id
     * @param layer 图层数据
     */
    addLayer: (state, action: PayloadAction<{ imageId: string; layer: ILayer }>) => {
      const { imageId, layer } = action.payload;
      const id = guid();
      state.layers.byId[id] = Object.assign(layer, { id });
      state.layers.allIds.push(id);
      state.images.byId[imageId].layers.push(id);
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
        const { properties } = state.layers.byId[id];

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
        const { properties } = state.layers.byId[id];

        properties.rotation = rotation;
      });
    },

    /**
     * @description 改变图层属性，TODO: newProperties 类型定义优化
     */
    setLayersProperties(state, action: PayloadAction<{ layerId: string; newProperties: any }>) {
      const { layerId, newProperties } = action.payload;

      for (const key in newProperties) {
        state.layers.byId[layerId].properties[key as keyof ILayer['properties']] = newProperties[key];
      }
    },

    /**
     * @description 改变图层 color 属性
     */
    setLayersColor(state, action: PayloadAction<{ layerIds: string[]; newColor: string }>) {
      const { layerIds, newColor } = action.payload;

      layerIds.forEach((layerId) => {
        const layer: ITextLayer = state.layers.byId[layerId] as ITextLayer;
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
        state.layers.byId[id].properties = { ...state.layers.byId[id].properties, ...newProperties };
      });
    },

    /**
     * @description
     */
    deleteLayers(state, action: PayloadAction<IBaseLayer['id'][]>) {
      const { payload } = action;
      const { images, layers } = state;

      // 删除所有 image 中要删除的 layer
      images.allIds.forEach((imageId) => {
        images.byId[imageId].layers = images.byId[imageId].layers.filter((layer) => !payload.includes(layer));
      });

      // 删除所有 layer
      layers.allIds = layers.allIds.filter((layerId) => !payload.includes(layerId));
      payload.forEach((layerId) => {
        delete layers.byId[layerId];
      });
    },
  },
});

export const {
  initProject,
  setProjectTitle,
  setCanvasSize,
  addImage,
  addLayer,
  setLayersCoordinate,
  setLayersProperties,
  setLayersColor,
  setLayersRotation,
  setLayersBaseProperties,
  deleteLayers,
} = projectSlice.actions;

export const selectProject = (state: RootState) => state.project.present;
export const selectImages = (state: RootState) => state.project.present.images;
export const selectLayers = (state: RootState) => state.project.present.layers;
export const selectCanvas = (state: RootState) => state.project.present.canvas;
export const selectProjectPastLength = (state: RootState) => state.project.past.length;
export const selectProjectFutureLength = (state: RootState) => state.project.future.length;

export default projectSlice.reducer;
