import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import {
  selectCanvas,
  selectImages,
  selectLayers,
} from '../../../../features/project/projectSlice';
import {
  selectCurImageId,
  setCurLayers,
} from '../../../../features/editor/editorSlice';
import { Layer } from '../../../../layer';
import MoveableControlBox from '../MoveableControlBox';

function EditorArea() {
  const canvas = useSelector(selectCanvas);
  const curImageId = useSelector(selectCurImageId);
  const images = useSelector(selectImages);
  const layers = useSelector(selectLayers);
  const dispatch = useDispatch();

  return (
    <div
      className={styles.editorArea}
      onMouseDown={(e) => {
        dispatch(setCurLayers([]));
      }}
    >
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
        <MoveableControlBox />
      </div>
    </div>
  );
}

export default EditorArea;
