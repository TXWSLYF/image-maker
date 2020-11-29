import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import projectReducer, {
  initProjectUndoable,
  setLayersCoordinate,
  setLayersColor,
  setLayersRotation,
  setLayersBaseProperties,
} from 'src/features/project/projectUndoableSlice';
import editorReducer from 'src/features/editor/editorSlice';
import projectBasicReducer from 'src/features/project/projectBasicSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: combineReducers({
      // 不可回退的数据
      basic: projectBasicReducer,
      // 可回退的数据
      undoable: undoable(projectReducer, {
        filter: excludeAction([initProjectUndoable.type]),
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

          if (action.type === setLayersBaseProperties.type && action.payload.actionId) {
            return action.type + action.payload.actionId;
          }

          return null;
        },
        // 很关键的属性，能将 present state 和  _latestUnfiltered state 保持同步
        syncFilter: true,
      }),
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
