import { combineReducers } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import projectApi from 'src/api/project';
import { AppThunk } from 'src/app/store';
import projectBasicReducer from './projectBasicSlice';
import projectUndoableReducer, {
  initProjectUndoable,
  setLayersBaseProperties,
  setLayersColor,
  setLayersCoordinate,
  setLayersRotation,
} from './projectUndoableSlice';

/**
 * @description 保存项目
 */
export const saveProject = (): AppThunk => async (dispatch, getState) => {
  const {
    undoable: {
      present: { id, name, data: projectUndoableData },
    },
    basic: projectBasicData,
  } = getState().project;
  await projectApi.update({
    id,
    name,
    data: JSON.stringify({
      basic: projectBasicData,
      undoable: projectUndoableData,
    }),
  });
};

const projectReducer = combineReducers({
  // 不可回退的数据
  basic: projectBasicReducer,
  // 可回退的数据
  undoable: undoable(projectUndoableReducer, {
    filter: excludeAction([initProjectUndoable.type]),
    groupBy: function (action) {
      // TODO: 统一参数为 actionId
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
});

export default projectReducer;
