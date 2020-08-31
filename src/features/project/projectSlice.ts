import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { guid } from '../../utils/util';

const initialState: ProjectState = {
  id: 1,
  title: 'demo',
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
    initProject: (state, action: PayloadAction<ProjectState>) => {
      const { id, title, images, layers } = action.payload;

      state.id = id;
      state.title = title;
      state.images = images;
      state.layers = layers;
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
      state.images.byId[id] = { name: id, id, layerIds: [] };
      state.images.allIds.push(id);
    },

    /**
     * @description 添加图层
     */
    addLayer: (state, action: PayloadAction<BaseLayer>) => {
      const id = guid();
      state.layers.byId[id] = Object.assign(action.payload, { id });
      state.layers.allIds.push(id);
    },
  },
});

export const {
  initProject,
  setProjectTitle,
  addImage,
  addLayer,
} = projectSlice.actions;

export default projectSlice.reducer;
