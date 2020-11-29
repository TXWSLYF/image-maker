import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurLayerIds, selectHoverLayerId } from 'src/features/editor/editorSlice';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import styles from './index.module.scss';

const HoverContainer = () => {
  const curLayerIds = useSelector(selectCurLayerIds);
  const hoverLayerId = useSelector(selectHoverLayerId);
  const { byId } = useSelector(selectLayers);

  return useMemo(() => {
    if (!hoverLayerId) return null;
    if (curLayerIds.findIndex((layerId) => layerId === hoverLayerId) !== -1) return null;

    const { width, height, x, y, rotation } = byId[hoverLayerId].properties;

    return (
      <div className={styles.hoverContainer}>
        <div
          className={styles.hoverItem}
          style={{
            width,
            height,
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          }}
        ></div>
      </div>
    );
  }, [byId, curLayerIds, hoverLayerId]);
};

export default HoverContainer;
