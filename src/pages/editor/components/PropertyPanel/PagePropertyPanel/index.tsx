import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanvas, setCanvasSize } from 'src/features/project/projectUndoableSlice';
import NumericInputNumber from 'src/components/NumericInputNumber';
import PropertyPanelHeader from '../components/PropertyPanelHeader';
import PropertyRow from '../PropertyRow';
import styles from './index.module.scss';

function PagePropertyPanel() {
  const dispatch = useDispatch();
  const canvas = useSelector(selectCanvas);

  return (
    <div className={styles.pagePropertyPanel}>
      <PropertyPanelHeader text={'基础'} />
      <div className={styles.pagePropertyPanelContent}>
        <PropertyRow
          leftLabelText="宽度"
          leftChild={
            <NumericInputNumber
              style={{ width: 70 }}
              value={canvas.width}
              onPressEnter={(value) => {
                dispatch(
                  setCanvasSize({
                    width: value,
                  }),
                );
              }}
              onBlur={(value) => {
                dispatch(
                  setCanvasSize({
                    width: value,
                  }),
                );
              }}
            />
          }
          rightLabelText="高度"
          rightChild={
            <NumericInputNumber
              style={{ width: 70 }}
              value={canvas.height}
              onPressEnter={(value) => {
                dispatch(setCanvasSize({ height: value }));
              }}
              onBlur={(value) => {
                dispatch(setCanvasSize({ height: value }));
              }}
            />
          }
        />
      </div>
    </div>
  );
}

export default PagePropertyPanel;
