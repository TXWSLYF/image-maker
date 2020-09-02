import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { setCurLayers } from '../../features/editor/editorSlice';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer }) {
  const dispatch = useDispatch();
  const {
    id,
    properties: { width, height, x, y, rotation },
  } = props.layer;

  return (
    <div
      onClick={(e) => {
        dispatch(setCurLayers(id));
        e.stopPropagation();
      }}
      className={styles.layerWrapper}
      style={{
        width,
        height,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      }}
    >
      {props.children}
    </div>
  );
}

export default LayerWrapper;
