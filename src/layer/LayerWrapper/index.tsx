import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { addCurLayers } from '../../features/editor/editorSlice';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer }) {
  const dispatch = useDispatch();
  const {
    id,
    properties: { width, height, x, y },
  } = props.layer;

  return (
    <div
      onClick={(e) => {
        dispatch(addCurLayers(id));
        e.stopPropagation();
      }}
      className={styles.layerWrapper}
      style={{
        width,
        height,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {props.children}
    </div>
  );
}

export default LayerWrapper;
