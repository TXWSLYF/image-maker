import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import projectReducer, {
  initProject,
  setLayersCoordinate,
  setLayersColor,
  setLayersRotation,
} from 'src/features/project/projectSlice';
import editorReducer from 'src/features/editor/editorSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: undoable(projectReducer, {
      filter: excludeAction(initProject.type),
      groupBy: function (action) {
        if (action.type === setLayersCoordinate.type) {
          return setLayersCoordinate.type + action.payload.dragId;
        }

        if (action.type === setLayersRotation.type) {
          return setLayersRotation.type + action.payload.rotateId;
        }

        if (action.type === setLayersColor.type) {
          return setLayersColor.type + action.payload.layerIds.toString();
        }

        return null;
      },

      // filter: (action) => {
      //   if (action.type === initProject.type) {
      //     return false;
      //   } else {
      //     if (action.type !== prevActionType) {
      //       ignoreRapid = false;
      //       prevActionType = action.type;
      //       return true;
      //     }
      //     if (ignoreRapid) {
      //       return false;
      //     }
      //     ignoreRapid = true;
      //     setTimeout(() => {
      //       ignoreRapid = false;
      //     }, IGNORE_TIME);
      //     return true;
      //   }
      // },
      // 很关键的属性，能将 present state 和  _latestUnfiltered state 保持同步
      syncFilter: true,
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
