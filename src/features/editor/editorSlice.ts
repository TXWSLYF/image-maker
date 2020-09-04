import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: IEditorState = {
  curImageId: '',
  curLayerIds: [],
  isDraging: false,
  dragId: '',
  dragStartMouseCoordinate: {
    x: 0,
    y: 0,
  },
  dragStartLayersCoordinate: [],
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
     * @description 添加当前选中图层
     */
    addCurLayers: (state, action: PayloadAction<string | string[]>) => {
      const { payload } = action;

      if (typeof payload === 'string') {
        state.curLayerIds.push(payload);
      } else if (Array.isArray(payload)) {
        state.curLayerIds = [...state.curLayerIds, ...payload];
      }
    },

    /**
     * @description 设置当前选中图层
     */
    setCurLayers: (state, action: PayloadAction<string | string[]>) => {
      const { payload } = action;

      if (typeof payload === 'string') {
        state.curLayerIds = [payload];
      } else if (Array.isArray(payload)) {
        state.curLayerIds = payload;
      }
    },

    setIsDraging: (state, action: PayloadAction<boolean>) => {
      state.isDraging = action.payload;
    },

    setDragStartMouseCoordinate: (
      state,
      action: PayloadAction<ICoordinate>
    ) => {
      state.dragStartMouseCoordinate = action.payload;
    },

    setDragStartLayersCoordinate: (
      state,
      action: PayloadAction<IEditorState['dragStartLayersCoordinate']>
    ) => {
      state.dragStartLayersCoordinate = action.payload;
    },

    setDragId: (state, action: PayloadAction<string>) => {
      state.dragId = action.payload;
    },
  },
});

export const {
  setCurImage,
  addCurLayers,
  setCurLayers,
  setIsDraging,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,
  setDragId,
} = editorSlice.actions;

export const selectCurImageId = (state: RootState) => state.editor.curImageId;
export const selectCurLayerIds = (state: RootState) => state.editor.curLayerIds;
export const selectIsDraging = (state: RootState) => state.editor.isDraging;
export const selectDragStartMouseCoordinate = (state: RootState) =>
  state.editor.dragStartMouseCoordinate;
export const selectDragStartLayersCoordinate = (state: RootState) =>
  state.editor.dragStartLayersCoordinate;
export const selectDragId = (state: RootState) => state.editor.dragId;

export default editorSlice.reducer;
