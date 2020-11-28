import { Input } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumericInput from 'src/components/NumericInput';
import { selectCanvasScale, setCanvasScale } from 'src/features/project/projectSlice';
import { ReactComponent as CheckOutlinedIcon } from 'src/assets/svg/checkOutlined.svg';
import styles from './index.module.scss';

const numericInputStyle = { width: 124 };

const ZoomDropDown = ({ inputRef }: { inputRef: React.RefObject<Input> }) => {
  const dispatch = useDispatch();
  const canvasScale = useSelector(selectCanvasScale);
  const canvasScalePercentage = Number((canvasScale * 100).toFixed(0));
  const handlePressEnter = useCallback(
    (value: string) => {
      dispatch(setCanvasScale(Number(value) / 100));
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      });
    },
    [dispatch, inputRef],
  );

  const handleClickZoom = useCallback(() => {
    dispatch(setCanvasScale(canvasScale + 0.2));
  }, [canvasScale, dispatch]);

  const handleClickMini = useCallback(() => {
    dispatch(setCanvasScale(canvasScale - 0.2));
  }, [canvasScale, dispatch]);

  const handleSetCanvasScale = useCallback(
    (value: number) => {
      dispatch(setCanvasScale(value));
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.zoomDropDown}>
        <div className={styles.inputNumWrapper}>
          <NumericInput
            inputRef={inputRef}
            value={canvasScalePercentage}
            style={numericInputStyle}
            onPressEnter={handlePressEnter}
            suffix={'%'}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.zoomItem} onClick={handleClickZoom}>
          <p className={styles.zoomText}>放大</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>+</kbd>
          </div>
        </div>
        <div className={styles.zoomItem} onClick={handleClickMini}>
          <p className={styles.zoomText}>缩小</p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>-</kbd>
          </div>
        </div>
        <div className={styles.divider} />
        <div
          className={styles.zoomItem}
          onClick={() => {
            handleSetCanvasScale(0.5);
          }}
        >
          <p className={styles.zoomText}>
            50%
            {canvasScale === 0.5 ? <CheckOutlinedIcon /> : null}
          </p>
        </div>
        <div
          className={styles.zoomItem}
          onClick={() => {
            handleSetCanvasScale(1);
          }}
        >
          <p className={styles.zoomText}>
            100%
            {canvasScale === 1 ? <CheckOutlinedIcon /> : null}
          </p>
          <div className={styles.kdbSize}>
            <kbd>⌘</kbd>
            <kbd>0</kbd>
          </div>
        </div>
        <div
          className={styles.zoomItem}
          onClick={() => {
            handleSetCanvasScale(2);
          }}
        >
          <p className={styles.zoomText}>
            200%
            {canvasScale === 2 ? <CheckOutlinedIcon /> : null}
          </p>
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
  }, [
    canvasScale,
    canvasScalePercentage,
    handleClickMini,
    handleClickZoom,
    handlePressEnter,
    handleSetCanvasScale,
    inputRef,
  ]);
};

export default ZoomDropDown;
