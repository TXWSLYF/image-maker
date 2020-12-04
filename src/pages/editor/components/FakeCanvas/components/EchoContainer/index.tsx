import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectEchoLayerId } from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import getLayerRect from 'src/utils/getLayerRect';
import scaleRect from 'src/utils/scaleRect';
import styles from './index.module.scss';

const EchoContainer = () => {
  const echoLayerId = useSelector(selectEchoLayerId);
  const { byId } = useSelector(selectLayers);
  const canvasScale = useSelector(selectCanvasScale);

  return useMemo(() => {
    if (!echoLayerId) return null;

    const { width, height, x, y, rotation } = scaleRect(getLayerRect(echoLayerId, byId), canvasScale);

    return (
      <div className={styles.echoContainer}>
        <div
          className={styles.echoItem}
          style={{
            width,
            height,
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          }}
        ></div>
      </div>
    );
  }, [byId, canvasScale, echoLayerId]);
};

export default EchoContainer;
