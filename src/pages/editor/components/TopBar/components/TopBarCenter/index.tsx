import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { saveProject, selectProjectFutureLength, selectProjectPastLength } from 'src/features/project/projectSlice';
import { ReactComponent as CloudUploadOutlined } from 'src/assets/svg/cloudUploadOutlined.svg';
import { ReactComponent as Rollback } from 'src/assets/svg/rollback.svg';
import { ReactComponent as Redo } from 'src/assets/svg/redo.svg';
import { ReactComponent as Duiqi } from 'src/assets/svg/duiqi.svg';
import { ReactComponent as Layer } from 'src/assets/svg/layer.svg';
import { ReactComponent as Group } from 'src/assets/svg/group.svg';
import { ReactComponent as UnGroup } from 'src/assets/svg/unGroup.svg';
import { ReactComponent as Lock } from 'src/assets/svg/lock.svg';
import { ReactComponent as Download } from 'src/assets/svg/download.svg';
import { ReactComponent as Share } from 'src/assets/svg/share.svg';
import TopBarIcon from '../TopBarIcon';
import styles from './index.module.scss';
import { setCurLayers } from 'src/features/editor/editorSlice';
import { ActionCreators } from 'redux-undo';

const style1: React.CSSProperties = { marginRight: 6 };
const style2: React.CSSProperties = { width: 18, height: 16 };
const style3: React.CSSProperties = { display: 'flex' };

const TopBarCenter = () => {
  const dispatch = useDispatch();
  const projectPastLength = useSelector(selectProjectPastLength);
  const projectFutureLength = useSelector(selectProjectFutureLength);

  const handleClickSave = useCallback(async () => {
    await dispatch(saveProject());
    message.success('保存成功');
  }, [dispatch]);

  const handleUndo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(ActionCreators.undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(ActionCreators.redo());
  }, [dispatch]);

  const isUndoDisabled = projectPastLength === 0;
  const isRedoDisabled = projectFutureLength === 0;

  return useMemo(() => {
    return (
      <div className={styles.topBarCenter}>
        <div style={style3}>
          <TopBarIcon
            text="保存"
            SvgComponent={CloudUploadOutlined}
            style={style1}
            svgStyle={style2}
            onClick={handleClickSave}
          />
          <TopBarIcon text="撤销" SvgComponent={Rollback} onClick={handleUndo} disabled={isUndoDisabled} />
          <TopBarIcon text="重做" SvgComponent={Redo} onClick={handleRedo} disabled={isRedoDisabled} />
        </div>

        <div style={style3}>
          <TopBarIcon text="对齐" SvgComponent={Duiqi} showDropDownArrow={true} />
          <TopBarIcon text="图层" SvgComponent={Layer} showDropDownArrow={true} />
          <TopBarIcon text="组合" SvgComponent={Group} />
          <TopBarIcon text="打散" SvgComponent={UnGroup} />
          <TopBarIcon text="锁定" SvgComponent={Lock} />
        </div>

        <div style={style3}>
          <TopBarIcon text="下载" SvgComponent={Download} />
          <TopBarIcon text="分享" SvgComponent={Share} />
        </div>
      </div>
    );
  }, [isUndoDisabled, isRedoDisabled, handleUndo, handleClickSave, handleRedo]);
};

export default TopBarCenter;
