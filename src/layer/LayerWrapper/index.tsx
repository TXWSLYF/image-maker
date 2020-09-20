import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import {
  setCurLayers,
  setIsDraging,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,
  setDragId,
  setHoverLayerId,
  addCurLayers,
  selectCurLayerIds
} from '../../features/editor/editorSlice';
import { guid } from '../../utils/util';
import { selectLayers } from '../../features/project/projectSlice';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer; style?: React.CSSProperties }) {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);

  const { style, layer: {
    id,
    properties: { width, height, x, y, rotation, opacity },
  } } = props;

  const innerStyle = {
    width,
    height,
    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    opacity,
  }

  return (
    <div
      onMouseEnter={() => {
        dispatch(setHoverLayerId(id));
      }}
      onMouseLeave={() => {
        dispatch(setHoverLayerId(''));
      }}
      onMouseDown={(e) => {

        // 点击当前选中的图层，直接跳过
        if (!curLayerIds.includes(id)) {
          if (e.shiftKey) {
            // 如果 shift 处于按下状态，多选
            dispatch(addCurLayers(id));
          } else {
            // 否则单选
            dispatch(setCurLayers([id]));
          }
        }

        dispatch(setIsDraging(true));
        dispatch(setDragStartMouseCoordinate({ x: e.clientX, y: e.clientY }));
        dispatch(setDragId(guid()));
        dispatch(setDragStartLayersCoordinate([{ id, x, y }, ...curLayerIds.map(layerId => {
          const { x, y } = layers.byId[layerId].properties

          return { id: layerId, x, y }
        })]));
        e.stopPropagation();
      }}
      className={styles.layerWrapper}
      style={style ? Object.assign(innerStyle, style) : innerStyle}
    >
      {props.children}
    </div>
  );
}

export default LayerWrapper;
