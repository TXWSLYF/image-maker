import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurLayerIds } from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import getLayerRect from 'src/utils/getLayerRect';
import scaleRect from 'src/utils/scaleRect';
import { ISingleResizerStyle } from '../..';
import styles from './index.module.scss';

const SelectedContainer = ({ singleResizerStyle }: { singleResizerStyle: ISingleResizerStyle }) => {
  const { byId } = useSelector(selectLayers);
  const curLayerIds = useSelector(selectCurLayerIds);
  const canvasScale = useSelector(selectCanvasScale);

  return useMemo(() => {
    return (
      <div className={styles.selectedContainer}>
        {curLayerIds.length > 1 ? <div className={styles.itemTotalBorder} style={singleResizerStyle}></div> : null}
        {curLayerIds.map((curLayerId) => {
          const { width, height, x, y, rotation } = scaleRect(getLayerRect(curLayerId, byId), canvasScale);

          return (
            <div
              key={curLayerId}
              className={styles.itemSelectBorder}
              style={{
                width,
                height,
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              }}
            ></div>
          );
        })}
      </div>
    );
  }, [byId, canvasScale, curLayerIds, singleResizerStyle]);
};

export default SelectedContainer;
