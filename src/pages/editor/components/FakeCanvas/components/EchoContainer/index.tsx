import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectEchoLayerId } from 'src/features/editor/editorSlice';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import styles from './index.module.scss';

const EchoContainer = () => {
  const echoLayerId = useSelector(selectEchoLayerId);
  const { byId } = useSelector(selectLayers);

  return useMemo(() => {
    if (!echoLayerId) return null;

    const { width, height, x, y, rotation } = byId[echoLayerId].properties;

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
  }, [byId, echoLayerId]);
};

export default EchoContainer;
