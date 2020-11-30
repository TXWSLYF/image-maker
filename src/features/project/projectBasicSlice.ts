import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { RootState } from 'src/app/store';

const initialState: IProjectBasicState = {
  canvas: {
    scale: 1,
  },
};

export const projectBasicSlice = createSlice({
  name: `project/basic`,
  initialState,
  reducers: {
    initProjectBasic(state, action: PayloadAction<IProjectBasicState>) {
      const { canvas } = action.payload;

      state.canvas = merge(state.canvas, canvas);
    },
    /**
     * @description 设置画布缩放比例
     */
    setCanvasScale: (state, action: PayloadAction<IProjectBasicState['canvas']['scale']>) => {
      // 最大放大比例 400%，最小缩小比例 20%
      const MAX_CANVAS_SCALE = 4;
      const MIN_CANVAS_SCALE = 0.2;

      const newCanvasScale = Number(Math.min(Math.max(MIN_CANVAS_SCALE, action.payload), MAX_CANVAS_SCALE).toFixed(2));

      state.canvas.scale = newCanvasScale;
    },
  },
});

export const { initProjectBasic, setCanvasScale } = projectBasicSlice.actions;

export const selectCanvasScale = (state: RootState) => state.project.basic.canvas.scale;

const projectBasicReducer = projectBasicSlice.reducer;
export default projectBasicReducer;
