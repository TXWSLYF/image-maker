import React, { ReactElement, StyleHTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import {
  setCurLayers,
  setIsDraging,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,
  setDragId,
  setHoverLayerId,
} from '../../features/editor/editorSlice';
import { guid } from '../../utils/util';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer; style?: React.CSSProperties }) {
  const dispatch = useDispatch();

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
        dispatch(setCurLayers([id]));
        dispatch(setIsDraging(true));
        dispatch(setDragStartMouseCoordinate({ x: e.clientX, y: e.clientY }));
        dispatch(setDragId(guid()));
        dispatch(setDragStartLayersCoordinate([{ id, x, y }]));
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
