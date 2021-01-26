import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { message } from 'antd';
import { saveProject } from 'src/features/project';
import {
  addGroupLayer,
  unGroupLayers,
  selectLayers,
  selectProjectFutureLength,
  selectProjectPastLength,
} from 'src/features/project/projectUndoableSlice';
import { selectCurImageId, selectCurLayerIds, setCurLayers, setHoverLayerId } from 'src/features/editor/editorSlice';
import { guid } from 'src/utils/util';
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
import ZoomBox from './components/ZoomBox';
import TopBarIcon from '../TopBarIcon';
import styles from './index.module.scss';

const style1: React.CSSProperties = { marginRight: 6 };
const style2: React.CSSProperties = { width: 18, height: 16 };
const style3: React.CSSProperties = { display: 'flex' };

/**
 * @description 判断图层是否拥有共同的父图层
 */
const isSameParent = (layerIds: IBaseLayer['id'][], layersById: ILayersById): boolean => {
  let curParent: IBaseLayer['parent'] = undefined;

  for (let i = 0; i < layerIds.length; i++) {
    const id = layerIds[i];
    const { parent } = layersById[id];

    // 如果图层不存在父组件，说明肯定不是同一个父组件
    if (!parent) {
      return false;
    }

    if (i !== 0 && curParent !== parent) {
      return false;
    }

    curParent = parent;
  }

  return true;
};

const TopBarCenter = () => {
  const dispatch = useDispatch();
  const projectPastLength = useSelector(selectProjectPastLength);
  const projectFutureLength = useSelector(selectProjectFutureLength);
  const curImageId = useSelector(selectCurImageId);
  const curLayerIds = useSelector(selectCurLayerIds);
  const { byId: layersById } = useSelector(selectLayers);

  const isUndoDisabled = projectPastLength === 0;
  const isRedoDisabled = projectFutureLength === 0;

  const handleClickSave = useCallback(async () => {
    // TODO:异步
    await dispatch(saveProject());
    message.success('保存成功');
  }, [dispatch]);

  const handleUndo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(setHoverLayerId(''));
    dispatch(ActionCreators.undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(setCurLayers([]));
    dispatch(setHoverLayerId(''));
    dispatch(ActionCreators.redo());
  }, [dispatch]);

  /**
   * @description 组合组件
   */
  const handleClickGroup = useCallback(() => {
    /**
     * @description 需要直接返回的边界情况
     */
    // 1. 如果当前选中图层数量小于等于 1，直接返回
    if (curLayerIds.length <= 1) return;

    // 2. 如果当前选中图层的父图层是同一个图层，直接返回
    if (isSameParent(curLayerIds, layersById)) return;

    const id = guid();
    dispatch(
      addGroupLayer({
        imageId: curImageId,
        layerIds: curLayerIds,
        id,
      }),
    );
    dispatch(setCurLayers(id));
  }, [curImageId, curLayerIds, layersById, dispatch]);

  /**
   * @description 打散快捷键
   */
  const handleClickUnGroup = useCallback(() => {
    dispatch(unGroupLayers({ imageId: curImageId, layerIds: curLayerIds }));
    dispatch(setCurLayers([]));
  }, [curImageId, curLayerIds, dispatch]);

  /**
   * @description 打散按钮 disabled 状态
   */
  const unGroupBtnDisabled = useMemo(() => {
    return !curLayerIds.some((layerId) => {
      const layer = layersById[layerId];

      return layer.type === 'GROUP';
    });
  }, [curLayerIds, layersById]);

  /**
   * @description 快捷键逻辑
   */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { metaKey, ctrlKey, shiftKey, key } = e;

      if (metaKey || ctrlKey) {
        switch (key) {
          // 保存快捷键
          case 's': {
            dispatch(saveProject());
            message.success('保存成功');
            e.preventDefault();
            break;
          }

          case 'z': {
            if (shiftKey) {
              // 重做快捷键
              handleRedo();
            } else {
              // 撤销快捷键
              handleUndo();
            }
            break;
          }

          case 'g': {
            if (shiftKey) {
              // 打散快捷键
            } else {
              // 组合快捷键
              handleClickGroup();
              e.preventDefault();
            }
            break;
          }

          default: {
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [dispatch, handleClickGroup, handleRedo, handleUndo]);

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
          <ZoomBox />
        </div>

        <div style={style3}>
          <TopBarIcon text="对齐" SvgComponent={Duiqi} showDropDownArrow={true} />
          <TopBarIcon text="图层" SvgComponent={Layer} showDropDownArrow={true} />
          <TopBarIcon text="组合" SvgComponent={Group} onClick={handleClickGroup} />
          <TopBarIcon text="打散" SvgComponent={UnGroup} onClick={handleClickUnGroup} disabled={unGroupBtnDisabled} />
          <TopBarIcon text="锁定" SvgComponent={Lock} />
        </div>

        <div style={style3}>
          <TopBarIcon text="下载" SvgComponent={Download} />
          <TopBarIcon text="分享" SvgComponent={Share} />
        </div>
      </div>
    );
  }, [
    handleClickSave,
    handleUndo,
    isUndoDisabled,
    handleRedo,
    isRedoDisabled,
    handleClickGroup,
    handleClickUnGroup,
    unGroupBtnDisabled,
  ]);
};

export default TopBarCenter;
