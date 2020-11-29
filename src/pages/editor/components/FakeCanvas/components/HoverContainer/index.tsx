import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurLayerIds, selectHoverLayerId } from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import scaleRect from 'src/utils/scaleRect';
import styles from './index.module.scss';

const HoverContainer = () => {
  const curLayerIds = useSelector(selectCurLayerIds);
  const hoverLayerId = useSelector(selectHoverLayerId);
  const { byId } = useSelector(selectLayers);
  const canvasScale = useSelector(selectCanvasScale);

  return useMemo(() => {
    if (!hoverLayerId) return null;
    if (curLayerIds.findIndex((layerId) => layerId === hoverLayerId) !== -1) return null;

    const { width, height, x, y, rotation } = scaleRect(byId[hoverLayerId].properties, canvasScale);

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
  }, [byId, canvasScale, curLayerIds, hoverLayerId]);
};

export default HoverContainer;
