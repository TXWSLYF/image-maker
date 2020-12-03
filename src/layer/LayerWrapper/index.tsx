import React, { ReactElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurLayers,
  setIsDraging,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,
  setDragId,
  setHoverLayerId,
  addCurLayers,
  selectCurLayerIds,
} from 'src/features/editor/editorSlice';
import { guid } from 'src/utils/util';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import styles from './index.module.scss';

interface LayerWrapperProps {
  children: ReactElement | ReactElement[];
  layer: ILayer;
  style?: React.CSSProperties;
}

/**
 * @description HOC，所有图层的 wrapper
 */
const LayerWrapper = ({ children, layer, style }: LayerWrapperProps) => {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);

  const {
    id,
    properties: { width, height, x, y, rotation, opacity },
  } = layer;

  const innerStyle = {
    width,
    height,
    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    opacity,
  };

  return useMemo(() => {
    return (
      <div
        onMouseEnter={() => {
          dispatch(setHoverLayerId(id));
        }}
        onMouseLeave={() => {
          dispatch(setHoverLayerId(''));
        }}
        onMouseDown={(e) => {
          let startLayersCoordinate: IEditorState['dragStartLayersCoordinate'] = [];

          // 当前选中图层坐标
          const curLayersCoordinate = curLayerIds.map((layerId) => {
            const { x, y } = layers.byId[layerId].properties;

            return { id: layerId, x, y };
          });

          // 当前点击图层坐标
          const curLayerCoordinate = { id, x, y };

          // 开启拖拽
          dispatch(setIsDraging(true));

          // 记录鼠标初始位置
          dispatch(setDragStartMouseCoordinate({ x: e.clientX, y: e.clientY }));

          // 标记本次拖拽 id
          dispatch(setDragId(guid()));

          // 点击当前选中的图层，直接跳过
          if (!curLayerIds.includes(id)) {
            if (e.shiftKey) {
              // 如果 shift 处于按下状态，多选
              dispatch(addCurLayers(id));
              startLayersCoordinate = [curLayerCoordinate, ...curLayersCoordinate];
            } else {
              // 否则单选
              dispatch(setCurLayers([id]));
              startLayersCoordinate = [curLayerCoordinate];
            }
          } else {
            startLayersCoordinate = curLayersCoordinate;
          }

          // 设置拖拽移动图层坐标点
          dispatch(setDragStartLayersCoordinate(startLayersCoordinate));

          e.stopPropagation();
        }}
        className={styles.layerWrapper}
        style={style ? { ...innerStyle, ...style } : innerStyle}
      >
        {children}
      </div>
    );
  }, [children, curLayerIds, dispatch, id, innerStyle, layers.byId, style, x, y]);
};

export default LayerWrapper;
