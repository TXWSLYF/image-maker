import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import projectReducer, { initProject } from '../features/project/projectSlice';
import editorReducer from '../features/editor/editorSlice';

const IGNORE_TIME = 1000;
let ignoreRapid: boolean = false;
let prevActionType: string = '';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: undoable(projectReducer, {
      // filter: excludeAction(initProject.type),
      filter: (action) => {
        if (action.type === initProject.type) {
          return false;
        } else {
          if (action.type !== prevActionType) {
            ignoreRapid = false;
            prevActionType = action.type;
            return true;
          }
          if (ignoreRapid) {
            return false;
          }
          ignoreRapid = true;
          setTimeout(() => {
            ignoreRapid = false;
          }, IGNORE_TIME);
          return true;
        }
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
