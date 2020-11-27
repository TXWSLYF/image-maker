import { InputNumber } from 'antd';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvasScale } from 'src/features/project/projectSlice';
import styles from './index.module.scss';

const ZoomDropDown = () => {
  const canvasScale = useSelector(selectCanvasScale);
  const canvasScalePercentage = Number((canvasScale * 100).toFixed(0));

  return useMemo(() => {
    return (
      <div className={styles.zoomDropDown}>
        <div className={styles.inputNumWrapper}>
          <InputNumber value={canvasScalePercentage} style={{ width: 124 }} />
        </div>
        <div className={styles.divider} />
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>放大</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>+</kbd>
          </div>
        </div>
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>缩小</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>-</kbd>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>50%</p>
        </div>
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>100%</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>0</kbd>
          </div>
        </div>
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>200%</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>适应画布</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>1</kbd>
          </div>
        </div>
        <div className={styles.zoomItem}>
          <p className={styles.zoomText}>缩放至选区</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>2</kbd>
          </div>
        </div>
      </div>
    );
  }, [canvasScalePercentage]);
};

export default ZoomDropDown;
