import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import {
  selectCanvas,
  selectImages,
  selectLayers,
} from '../../../../features/project/projectSlice';
import { selectCurImageId } from '../../../../features/editor/editorSlice';
import { Layer } from '../../../../layer';

function EditorArea() {
  const canvas = useSelector(selectCanvas);
  const curImageId = useSelector(selectCurImageId);
  const images = useSelector(selectImages);
  const layers = useSelector(selectLayers);

  return (
    <div className={styles.editorArea}>
      <div
        className={styles.canvas}
        style={{
          width: canvas.width,
          height: canvas.height,
        }}
      >
        {curImageId && images.byId[curImageId]
          ? images.byId[curImageId].layers.map((id) => (
              <Layer layer={layers.byId[id]} key={id} />
            ))
          : null}
      </div>
    </div>
  );
}

export default EditorArea;
