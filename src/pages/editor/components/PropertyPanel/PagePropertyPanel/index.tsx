import React from 'react';
import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanvas, setCanvasSize } from 'src/features/project/projectUndoableSlice';
import NumericInputNumber from 'src/components/NumericInputNumber';
import PropertyRow from '../PropertyRow';
import styles from './index.module.scss';

const { Panel } = Collapse;

function PagePropertyPanel() {
  const dispatch = useDispatch();
  const canvas = useSelector(selectCanvas);

  return (
    <div className={styles.pagePropertyPanel}>
      <Collapse defaultActiveKey={['1']} expandIconPosition={'right'} style={{ border: 'none', background: '#fff' }}>
        <Panel header="基础" key="1">
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
        </Panel>
      </Collapse>
    </div>
  );
}

export default PagePropertyPanel;
