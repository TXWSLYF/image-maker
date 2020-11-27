import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvasScale } from 'src/features/project/projectSlice';
import { ReactComponent as DropDownArrowIcon } from 'src/assets/svg/dropDownArrow.svg';
import ZoomDropDown from '../ZoomDropDown';
import styles from './index.module.scss';

const ZoomBox = () => {
  const canvasScale = useSelector(selectCanvasScale);
  const canvasScalePercentage = Number((canvasScale * 100).toFixed(0));

  return useMemo(() => {
    return (
      <div className={styles.zoomBox}>
        <div className={styles.zoomBoxText}>
          <p>{canvasScalePercentage}%</p>
          <DropDownArrowIcon />
        </div>
        <div className={styles.zoomBoxTip}>缩放</div>
        <div className={styles.zoomBoxContent}>
          <ZoomDropDown />
        </div>
      </div>
    );
  }, [canvasScalePercentage]);
};

export default ZoomBox;
