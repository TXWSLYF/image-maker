import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

const initialState: IEditorState = {
  curImageId: '',
  curLayerIds: [],
  hoverLayerId: '',

  // 编辑区相对于页面的坐标
  editorCanvasCoordinate: {
    x: 0,
    y: 0,
  },

  // 拖拽相关参数
  isDraging: false,
  dragId: '',
  dragStartMouseCoordinate: {
    x: 0,
    y: 0,
  },
  dragStartLayersCoordinate: [],

  // 旋转相关参数
  isRotating: false,
  rotateId: '',
  rotateStartMouseAngle: 0,
  rotateCenterCoordinate: { x: 0, y: 0 },
  rotateStartLayersRotation: [],

  // 拖拽缩放相关参数
  isDragZooming: false,
  dragZoomId: '',
  dragZoomStartMouseCoordinate: { x: 0, y: 0 },
  dragZoomDirection: [],
  dragZoomStartLayersPosition: [],
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

    /**
     * @description 设置当前 hover 图层 id
     */
    setHoverLayerId: (state, action: PayloadAction<string>) => {
      state.hoverLayerId = action.payload;
    },

    /**
     * @description 设置编辑区相对于页面的坐标
     */
    setEditorCanvasCoordinate: (state, action: PayloadAction<ICoordinate>) => {
      state.editorCanvasCoordinate = action.payload;
    },

    /**
     * @description 设置拖拽状态
     */
    setIsDraging: (state, action: PayloadAction<boolean>) => {
      state.isDraging = action.payload;
    },

    setDragId: (state, action: PayloadAction<string>) => {
      state.dragId = action.payload;
    },

    setDragStartMouseCoordinate: (state, action: PayloadAction<ICoordinate>) => {
      state.dragStartMouseCoordinate = action.payload;
    },

    setDragStartLayersCoordinate: (state, action: PayloadAction<IEditorState['dragStartLayersCoordinate']>) => {
      state.dragStartLayersCoordinate = action.payload;
    },

    /**
     * @description 设置旋转状态
     */
    setIsRotating: (state, action: PayloadAction<boolean>) => {
      state.isRotating = action.payload;
    },

    setRotateId: (state, action: PayloadAction<string>) => {
      state.rotateId = action.payload;
    },

    setRotateStartMouseAngle: (state, action: PayloadAction<number>) => {
      state.rotateStartMouseAngle = action.payload;
    },

    setRotateCenterCoordinate: (state, action: PayloadAction<IEditorState['rotateCenterCoordinate']>) => {
      state.rotateCenterCoordinate = action.payload;
    },

    setRotateStartLayersRotation: (state, action: PayloadAction<IEditorState['rotateStartLayersRotation']>) => {
      state.rotateStartLayersRotation = action.payload;
    },

    /**
     * @description 设置拖拽缩放相关属性
     */

    setIsDragZooming: (state, action: PayloadAction<IEditorState['isDragZooming']>) => {
      state.isDragZooming = action.payload;
    },
    setDragZoomId: (state, action: PayloadAction<IEditorState['dragZoomId']>) => {
      state.dragZoomId = action.payload;
    },
    setDragZoomStartMouseCoordinate: (state, action: PayloadAction<IEditorState['dragZoomStartMouseCoordinate']>) => {
      state.dragZoomStartMouseCoordinate = action.payload;
    },
    setDragZoomDirection: (state, action: PayloadAction<IEditorState['dragZoomDirection']>) => {
      state.dragZoomDirection = action.payload;
    },
    setDragZoomStartLayersPosition: (state, action: PayloadAction<IEditorState['dragZoomStartLayersPosition']>) => {
      state.dragZoomStartLayersPosition = action.payload;
    },
  },
});

export const {
  setCurImage,
  addCurLayers,
  setCurLayers,
  setEditorCanvasCoordinate,
  setHoverLayerId,

  setIsDraging,
  setDragId,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,

  setIsRotating,
  setRotateId,
  setRotateStartMouseAngle,
  setRotateCenterCoordinate,
  setRotateStartLayersRotation,

  setIsDragZooming,
  setDragZoomId,
  setDragZoomStartMouseCoordinate,
  setDragZoomDirection,
  setDragZoomStartLayersPosition,
} = editorSlice.actions;

export const selectCurImageId = (state: RootState) => state.editor.curImageId;
export const selectCurLayerIds = (state: RootState) => state.editor.curLayerIds;
export const selectHoverLayerId = (state: RootState) => state.editor.hoverLayerId;
export const selectEditorCanvasCoordinate = (state: RootState) => state.editor.editorCanvasCoordinate;

export const selectIsDraging = (state: RootState) => state.editor.isDraging;
export const selectDragId = (state: RootState) => state.editor.dragId;
export const selectDragStartMouseCoordinate = (state: RootState) => state.editor.dragStartMouseCoordinate;
export const selectDragStartLayersCoordinate = (state: RootState) => state.editor.dragStartLayersCoordinate;

export const selectIsRotating = (state: RootState) => state.editor.isRotating;
export const selectRotateId = (state: RootState) => state.editor.rotateId;
export const selectRotateStartMouseAngle = (state: RootState) => state.editor.rotateStartMouseAngle;
export const selectRotateCenterCoordinate = (state: RootState) => state.editor.rotateCenterCoordinate;
export const selectRotateStartLayersRotation = (state: RootState) => state.editor.rotateStartLayersRotation;

export const selectIsDragZooming = (state: RootState) => state.editor.isDragZooming;
export const selectDragZoomId = (state: RootState) => state.editor.dragZoomId;
export const selectDragZoomStartMouseCoordinate = (state: RootState) => state.editor.dragZoomStartMouseCoordinate;
export const selectDragZoomDirection = (state: RootState) => state.editor.dragZoomDirection;
export const selectDragZoomStartLayersPosition = (state: RootState) => state.editor.dragZoomStartLayersPosition;

export default editorSlice.reducer;
