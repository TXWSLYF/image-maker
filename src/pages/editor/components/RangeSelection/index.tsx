import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsRangeSelecting,
  selectRangeSelectionCurrentCoordinate,
  selectRangeSelectionStartCoordinate,
} from 'src/features/editor/editorSlice';
import styles from './index.module.scss';

const RangeSelection = () => {
  const isRangeSelecting = useSelector(selectIsRangeSelecting);
  const { x: startX, y: startY } = useSelector(selectRangeSelectionStartCoordinate);
  const { x: currentX, y: currentY } = useSelector(selectRangeSelectionCurrentCoordinate);

  const style: React.CSSProperties = useMemo(() => {
    return {
      display: isRangeSelecting ? 'block' : 'none',
      left: Math.min(startX, currentX),
      top: Math.min(startY, currentY),
      width: Math.abs(startX - currentX),
      height: Math.abs(startY - currentY),
    };
  }, [currentX, currentY, isRangeSelecting, startX, startY]);

  return useMemo(() => {
    return <div className={styles.rangeSelection} style={style}></div>;
  }, [style]);
};

export default RangeSelection;
