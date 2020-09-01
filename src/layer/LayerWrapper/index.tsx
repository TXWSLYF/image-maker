import React, { ReactElement } from 'react';
import styles from './index.module.scss';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer }) {
  const {
    properties: { width, height, x, y },
  } = props.layer;

  return (
    <div
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
