import projectApi from 'src/api/project';
import { AppThunk } from 'src/app/store';

export const PREFIX = 'project';

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
