import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanvas, setCanvasSize } from 'src/features/project/projectUndoableSlice';
import MyInputNumber from 'src/components/MyInputNumber';
import PropertyPanelHeader from '../PropertyPanelHeader';
import styles from './index.module.scss';

function PagePropertyPanel() {
  const dispatch = useDispatch();
  const canvas = useSelector(selectCanvas);

  const setCanvasWidth = useCallback(
    (value) => {
      dispatch(
        setCanvasSize({
          width: value,
        }),
      );
    },
    [dispatch],
  );

  const setCanvasHeight = useCallback(
    (value) => {
      dispatch(
        setCanvasSize({
          height: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <div className={styles.pagePropertyPanel}>
      <PropertyPanelHeader text={'基础'} />
      <div className={styles.pagePropertyPanelContent}>
        <div className={styles.flexBox}>
          <MyInputNumber
            text="W"
            value={canvas.width}
            width={85}
            onBlur={setCanvasWidth}
            onPressEnter={setCanvasWidth}
          />
          <MyInputNumber
            text="H"
            value={canvas.height}
            width={85}
            onBlur={setCanvasHeight}
            onPressEnter={setCanvasHeight}
          />
        </div>
      </div>
    </div>
  );
}

export default PagePropertyPanel;
