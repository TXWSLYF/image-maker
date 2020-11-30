import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import editorReducer from 'src/features/editor/editorSlice';
import projectReducer from 'src/features/project';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
