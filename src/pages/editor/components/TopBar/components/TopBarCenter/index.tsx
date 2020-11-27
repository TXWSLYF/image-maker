import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { useHotkeys } from 'react-hotkeys-hook';
import { message, Tooltip } from 'antd';
import {
  saveProject,
  selectCanvasScale,
  selectProjectFutureLength,
  selectProjectPastLength,
} from 'src/features/project/projectSlice';
import { setCurLayers } from 'src/features/editor/editorSlice';
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
import ZoomDropDown from '../ZoomDropDown';
import TopBarIcon from '../TopBarIcon';
import styles from './index.module.scss';

const style1: React.CSSProperties = { marginRight: 6 };
const style2: React.CSSProperties = { width: 18, height: 16 };
const style3: React.CSSProperties = { display: 'flex' };
const style4: React.CSSProperties = { marginLeft: 8, width: 60 };
const style5: React.CSSProperties = {
  padding: '4px 0px',
  minWidth: 160,
};
const svgDefaultStyle: React.CSSProperties = { width: 16, height: 16, marginTop: -2 };

const TopBarCenter = () => {
  const dispatch = useDispatch();
  const projectPastLength = useSelector(selectProjectPastLength);
  const projectFutureLength = useSelector(selectProjectFutureLength);
  const canvasScale = useSelector(selectCanvasScale);
  const canvasScalePercentage = Number((canvasScale * 100).toFixed(0));

  const handleClickSave = useCallback(async () => {
    await dispatch(saveProject());
    message.success('保存成功');
  }, [dispatch]);

  const handleSaveProjectHotkey = useCallback(
    (event: KeyboardEvent) => {
      dispatch(saveProject());
      message.success('保存成功');
      event.preventDefault();
    },
    [dispatch],
  );

  const isUndoDisabled = projectPastLength === 0;
  const isRedoDisabled = projectFutureLength === 0;

  const handleUndo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(ActionCreators.undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(ActionCreators.redo());
  }, [dispatch]);

  /**
   * @description 快捷键逻辑
   */
  // 保存快捷键
  useHotkeys('ctrl+s, command+s', handleSaveProjectHotkey);
  // 撤销快捷键
  useHotkeys('ctrl+z, command+z', handleUndo, {}, [handleUndo]);
  // 重做快捷键
  useHotkeys('ctrl+shift+z, command+shift+z', handleRedo, {}, [handleRedo]);

  /**
   * @description 图标缓存
   */
  const CloudUploadOutlinedMemo = useMemo(() => {
    return <CloudUploadOutlined style={style2} />;
  }, []);
  const RollbackMemo = useMemo(() => {
    return <Rollback style={svgDefaultStyle} />;
  }, []);
  const RedoMemo = useMemo(() => {
    return <Redo style={svgDefaultStyle} />;
  }, []);
  const DuiqiMemo = useMemo(() => {
    return <Duiqi style={svgDefaultStyle} />;
  }, []);
  const LayerMemo = useMemo(() => {
    return <Layer style={svgDefaultStyle} />;
  }, []);
  const GroupMemo = useMemo(() => {
    return <Group style={svgDefaultStyle} />;
  }, []);
  const UnGroupMemo = useMemo(() => {
    return <UnGroup style={svgDefaultStyle} />;
  }, []);
  const LockMemo = useMemo(() => {
    return <Lock style={svgDefaultStyle} />;
  }, []);
  const DownloadMemo = useMemo(() => {
    return <Download style={svgDefaultStyle} />;
  }, []);
  const ShareMemo = useMemo(() => {
    return <Share style={svgDefaultStyle} />;
  }, []);
  const ScaleText = useMemo(() => {
    return <div>{canvasScalePercentage}%</div>;
  }, [canvasScalePercentage]);
  const zoomDropDown = useMemo(() => {
    return <ZoomDropDown />;
  }, []);

  return useMemo(() => {
    return (
      <div className={styles.topBarCenter}>
        <div style={style3}>
          <TopBarIcon text="保存" iconElement={CloudUploadOutlinedMemo} style={style1} onClick={handleClickSave} />
          <TopBarIcon text="撤销" iconElement={RollbackMemo} onClick={handleUndo} disabled={isUndoDisabled} />
          <TopBarIcon text="重做" iconElement={RedoMemo} onClick={handleRedo} disabled={isRedoDisabled} />
          <Tooltip title={zoomDropDown} color={'white'} overlayInnerStyle={style5} align={{ offset: [0, 2] }}>
            {/* fix: Tooltip 无法直接使用在自定义组件上 https://github.com/ant-design/ant-design/issues/4270 */}
            <div>
              <TopBarIcon text="缩放" iconElement={ScaleText} style={style4} showDropDownArrow />
            </div>
          </Tooltip>
        </div>

        <div style={style3}>
          <TopBarIcon text="对齐" iconElement={DuiqiMemo} showDropDownArrow={true} />
          <TopBarIcon text="图层" iconElement={LayerMemo} showDropDownArrow={true} />
          <TopBarIcon text="组合" iconElement={GroupMemo} />
          <TopBarIcon text="打散" iconElement={UnGroupMemo} />
          <TopBarIcon text="锁定" iconElement={LockMemo} />
        </div>

        <div style={style3}>
          <TopBarIcon text="下载" iconElement={DownloadMemo} />
          <TopBarIcon text="分享" iconElement={ShareMemo} />
        </div>
      </div>
    );
  }, [
    CloudUploadOutlinedMemo,
    handleClickSave,
    RollbackMemo,
    handleUndo,
    isUndoDisabled,
    RedoMemo,
    handleRedo,
    isRedoDisabled,
    zoomDropDown,
    ScaleText,
    DuiqiMemo,
    LayerMemo,
    GroupMemo,
    UnGroupMemo,
    LockMemo,
    DownloadMemo,
    ShareMemo,
  ]);
};

export default TopBarCenter;
