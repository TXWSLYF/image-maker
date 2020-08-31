import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: EditorState = {
  curImageId: '1',
  curLayerIds: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    /**
     * @description 设置当前图片
     */
    setCurImage: (state, action: PayloadAction<string>) => {
      state.curImageId = action.payload;
    },

    /**
     * @description 设置当前选中图层
     */
    setCurLayers: (state, action: PayloadAction<string[]>) => {
      state.curLayerIds = action.payload;
    },
  },
});

export const { setCurImage, setCurLayers } = editorSlice.actions;

export default editorSlice.reducer;
