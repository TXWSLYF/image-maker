import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

const initialState: IEditorState = {
  curImageId: '',
  curLayerIds: [],
  hoverLayerId: '',
  echoLayerId: '',

  scrollHeight: 10000,
  scrollWidth: 10000,
  scrollTop: 0,
  scrollLeft: 0,
  screenWidth: 0,
  screenHeight: 0,
  basicWidgetsPanelWidth: 0,
  propertyPanelWidth: 0,
  topBarHeight: 0,

  /**
   * @description 左侧面板属性
   */
  isLeftPanelVisible: true,
  leftPanelWidth: 209,

  // 拖拽相关参数
  isDraging: false,
  dragId: '',

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

  /**
   * @description 拖拽范围选择相关属性
   */
  isRangeSelecting: false,
  rangeSelectionStartCoordinate: { x: 0, y: 0 },
  rangeSelectionCurrentCoordinate: { x: 0, y: 0 },

  editingTextLayerId: '',
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

    setEchoLayerId: (state, action: PayloadAction<string>) => {
      state.echoLayerId = action.payload;
    },

    /**
     * @description 设置页面列表是否收起
     */
    setIsLeftPanelVisible: (state, action: PayloadAction<boolean>) => {
      state.isLeftPanelVisible = action.payload;
    },
    setLeftPanelWidth: (state, action: PayloadAction<number>) => {
      state.leftPanelWidth = action.payload;
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

    setScrollTop: (state, action: PayloadAction<{ offset?: number; newScrollTop?: number }>) => {
      const { offset, newScrollTop } = action.payload;
      const { scrollTop, scrollHeight, screenHeight } = state;
      // TODO: 缓存计算结果
      const maxScrollTop = (scrollHeight - screenHeight) / 2;

      let indeedScrollTop = 0;

      if (offset !== undefined && newScrollTop === undefined) {
        indeedScrollTop = scrollTop + offset;
      } else if (offset === undefined && newScrollTop !== undefined) {
        indeedScrollTop = newScrollTop;
      }

      if (indeedScrollTop < -maxScrollTop) {
        indeedScrollTop = -maxScrollTop;
      }

      if (indeedScrollTop > maxScrollTop) {
        indeedScrollTop = maxScrollTop;
      }

      state.scrollTop = Math.floor(indeedScrollTop);
    },
    setScrollLeft: (state, action: PayloadAction<{ offset?: number; newScrollLeft?: number }>) => {
      const { offset, newScrollLeft } = action.payload;
      const { scrollLeft, scrollWidth, screenWidth } = state;
      // TODO: 缓存计算结果
      const maxScrollLeft = (scrollWidth - screenWidth) / 2;

      let indeedScrollLeft = 0;

      if (offset !== undefined && newScrollLeft === undefined) {
        indeedScrollLeft = scrollLeft + offset;
      } else if (offset === undefined && newScrollLeft !== undefined) {
        indeedScrollLeft = newScrollLeft;
      }

      if (indeedScrollLeft < -maxScrollLeft) {
        indeedScrollLeft = -maxScrollLeft;
      }

      if (indeedScrollLeft > maxScrollLeft) {
        indeedScrollLeft = maxScrollLeft;
      }

      state.scrollLeft = Math.floor(indeedScrollLeft);
    },

    setScreenHeight: (state, action: PayloadAction<number>) => {
      state.screenHeight = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },

    setBasicWidgetsPanelWidth: (state, action: PayloadAction<number>) => {
      state.basicWidgetsPanelWidth = action.payload;
    },
    setPropertyPanelWidth: (state, action: PayloadAction<number>) => {
      state.propertyPanelWidth = action.payload;
    },
    setTopBarHeight: (state, action: PayloadAction<IEditorState['topBarHeight']>) => {
      state.topBarHeight = action.payload;
    },

    /**
     * @description 拖拽范围选择相关属性
     */
    setIsRangeSelecting(state, action: PayloadAction<IEditorState['isRangeSelecting']>) {
      state.isRangeSelecting = action.payload;
    },
    setRangeSelectionStartCoordinate(state, action: PayloadAction<IEditorState['rangeSelectionStartCoordinate']>) {
      state.rangeSelectionStartCoordinate = action.payload;
    },
    setRangeSelectionCurrentCoordinate(state, action: PayloadAction<IEditorState['rangeSelectionCurrentCoordinate']>) {
      state.rangeSelectionCurrentCoordinate = action.payload;
    },

    setEditingTextLayerId(state, action: PayloadAction<IEditorState['editingTextLayerId']>) {
      state.editingTextLayerId = action.payload;
    },
  },
});

export const {
  setCurImage,
  addCurLayers,
  setCurLayers,
  setHoverLayerId,
  setEchoLayerId,
  setIsLeftPanelVisible,
  setLeftPanelWidth,

  setIsDraging,
  setDragId,

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

  setScrollTop,
  setScrollLeft,
  setScreenHeight,
  setScreenWidth,
  setBasicWidgetsPanelWidth,
  setPropertyPanelWidth,
  setTopBarHeight,

  /**
   * @description 拖拽范围选择相关属性
   */
  setIsRangeSelecting,
  setRangeSelectionStartCoordinate,
  setRangeSelectionCurrentCoordinate,

  setEditingTextLayerId,
} = editorSlice.actions;

export const selectCurImageId = (state: RootState) => state.editor.curImageId;
export const selectCurImageLayerIds = (state: RootState) =>
  state.project.undoable.present.data.imagesById[state.editor.curImageId].layers;
export const selectCurImageLayers = (state: RootState) =>
  state.project.undoable.present.data.imagesById[state.editor.curImageId].layers.map(
    (layerId) => state.project.undoable.present.data.layersById[layerId],
  );
export const selectCurLayerIds = (state: RootState) => state.editor.curLayerIds;
export const selectHoverLayerId = (state: RootState) => state.editor.hoverLayerId;
export const selectEchoLayerId = (state: RootState) => state.editor.echoLayerId;

/**
 * @description LeftPanel 相关属性
 */
export const selectIsLeftPanelVisible = (state: RootState) => state.editor.isLeftPanelVisible;
export const selectLeftPanelWidth = (state: RootState) => state.editor.leftPanelWidth;

export const selectIsDraging = (state: RootState) => state.editor.isDraging;
export const selectDragId = (state: RootState) => state.editor.dragId;

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

export const selectScrollHeight = (state: RootState) => state.editor.scrollHeight;
export const selectScrollWidth = (state: RootState) => state.editor.scrollWidth;
export const selectScrollTop = (state: RootState) => state.editor.scrollTop;
export const selectScrollLeft = (state: RootState) => state.editor.scrollLeft;

export const selectScreenHeight = (state: RootState) => state.editor.screenHeight;
export const selectScreenWidth = (state: RootState) => state.editor.screenWidth;
export const selectBasicWidgetsPanelWidth = (state: RootState) => state.editor.basicWidgetsPanelWidth;
export const selectPropertyPanelWidth = (state: RootState) => state.editor.propertyPanelWidth;
export const selectTopBarHeight = (state: RootState) => state.editor.topBarHeight;

/**
 * @description 拖拽范围选择相关属性
 */
export const selectIsRangeSelecting = (state: RootState) => state.editor.isRangeSelecting;
export const selectRangeSelectionStartCoordinate = (state: RootState) => state.editor.rangeSelectionStartCoordinate;
export const selectRangeSelectionCurrentCoordinate = (state: RootState) => state.editor.rangeSelectionCurrentCoordinate;

export const selectEditingTextLayerId = (state: RootState) => state.editor.editingTextLayerId;

export default editorSlice.reducer;
