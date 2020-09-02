import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import projectReducer, { initProject } from '../features/project/projectSlice';
import editorReducer from '../features/editor/editorSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: undoable(projectReducer, {
      // filter: excludeAction(initProject.type),
      filter: (action) => {
        return action.type !== initProject.type;
      },
      // 很关键的属性，能将 present state 和  _latestUnfiltered state 保持同步
      syncFilter: true,
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
