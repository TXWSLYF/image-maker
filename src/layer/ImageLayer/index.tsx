import React from 'react';
import LayerWrapper from '../LayerWrapper';
import styles from './index.module.scss';

function ImageLayer(props: { layer: IImgLayer }) {
  const {
    properties: { src },
  } = props.layer;

  return (
    <LayerWrapper layer={props.layer} style={{ fontSize: 0 }}>
      <img src={src} alt={src} className={styles.imgLayer} />
    </LayerWrapper>
  );
}

export default ImageLayer;
