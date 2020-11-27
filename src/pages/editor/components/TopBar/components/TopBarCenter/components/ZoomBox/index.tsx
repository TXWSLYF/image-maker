import React, { useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
import { selectCanvasScale } from 'src/features/project/projectSlice';
import { ReactComponent as DropDownArrowIcon } from 'src/assets/svg/dropDownArrow.svg';
import ZoomDropDown from '../ZoomDropDown';
import styles from './index.module.scss';

const ZoomBox = () => {
  const inputRef = useRef<Input>(null);
  const canvasScale = useSelector(selectCanvasScale);
  const canvasScalePercentage = Number((canvasScale * 100).toFixed(0));

  const handleMouseEnter = useCallback(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    });
  }, []);

  return useMemo(() => {
    return (
      <div className={styles.zoomBox} onMouseEnter={handleMouseEnter}>
        <div className={styles.zoomBoxText}>
          <p>{canvasScalePercentage}%</p>
          <DropDownArrowIcon />
        </div>
        <div className={styles.zoomBoxTip}>缩放</div>
        <div className={styles.zoomBoxContent}>
          <ZoomDropDown inputRef={inputRef} />
        </div>
      </div>
    );
  }, [canvasScalePercentage, handleMouseEnter]);
};

export default ZoomBox;
