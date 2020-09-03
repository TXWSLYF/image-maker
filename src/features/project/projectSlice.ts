import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { guid } from '../../utils/util';

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
    addLayer: (
      state,
      action: PayloadAction<{ imageId: string; layer: ILayer }>
    ) => {
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
      action: PayloadAction<({ id: string } & ICoordinate)[]>
    ) => {
      action.payload.forEach((coordinateWithId) => {
        const { id, x, y } = coordinateWithId;
        const { properties } = state.layers.byId[id];

        properties.x = x;
        properties.y = y;
      });
    },
  },
});

export const {
  initProject,
  setProjectTitle,
  addImage,
  addLayer,
  setLayersCoordinate,
} = projectSlice.actions;

export const selectImages = (state: RootState) => state.project.present.images;
export const selectLayers = (state: RootState) => state.project.present.layers;
export const selectCanvas = (state: RootState) => state.project.present.canvas;
export const selectProjectPastLength = (state: RootState) =>
  state.project.past.length;
export const selectProjectFutureLength = (state: RootState) =>
  state.project.future.length;

export default projectSlice.reducer;
