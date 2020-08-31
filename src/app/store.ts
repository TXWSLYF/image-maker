import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer from '../features/project/projectSlice';
import editorReducer from '../features/editor/editorSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
