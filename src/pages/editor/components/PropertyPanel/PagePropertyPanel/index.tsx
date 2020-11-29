import React from 'react';
import { Collapse, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanvas, setCanvasSize } from 'src/features/project/projectUndoableSlice';
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
              <InputNumber
                style={{ width: 70 }}
                value={canvas.width}
                onChange={(value) => {
                  dispatch(
                    setCanvasSize({
                      width: Number(value),
                    }),
                  );
                }}
              />
            }
            rightLabelText="高度"
            rightChild={
              <InputNumber
                style={{ width: 70 }}
                value={canvas.height}
                onChange={(value) => {
                  dispatch(setCanvasSize({ height: Number(value) }));
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
