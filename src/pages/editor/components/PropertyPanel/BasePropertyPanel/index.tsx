import React from 'react';
import { InputNumber, Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import { setLayersProperties } from 'src/features/project/projectSlice';
import transfromAngle from 'src/utils/transformAngle';
import styles from './index.module.scss';
import PropertyRow from '../PropertyRow';

const { Panel } = Collapse;

function BasePropertyPanel({ properties, layerId }: { properties: IBaseProperties; layerId: string }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.basePropertyPanel}>
      <Collapse defaultActiveKey={['1']} expandIconPosition={'right'} style={{ border: 'none', background: '#fff' }}>
        <Panel header="基础" key="1">
          <PropertyRow
            style={{ marginBottom: 10 }}
            leftChild={
              <InputNumber
                style={{ width: 70 }}
                value={properties.x}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        x: value,
                      },
                    }),
                  );
                }}
              />
            }
            leftLabelText="横坐标"
            rightChild={
              <InputNumber
                style={{ width: 70 }}
                value={properties.y}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        y: value,
                      },
                    }),
                  );
                }}
              />
            }
            rightLabelText="纵坐标"
          />
          <PropertyRow
            leftChild={
              <InputNumber
                style={{ width: 70 }}
                // TODO: 数据不同步
                value={properties.rotation}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        rotation: transfromAngle(Number(value)),
                      },
                    }),
                  );
                }}
              />
            }
            leftLabelText="旋转角"
            rightChild={
              <InputNumber
                style={{ width: 70 }}
                value={properties.opacity}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        opacity: value,
                      },
                    }),
                  );
                }}
              />
            }
            rightLabelText="透明度"
            style={{ marginBottom: 10 }}
          />

          <PropertyRow
            leftChild={
              <InputNumber
                style={{ width: 70 }}
                value={properties.width}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        width: value,
                      },
                    }),
                  );
                }}
              />
            }
            leftLabelText="宽度"
            rightChild={
              <InputNumber
                style={{ width: 70 }}
                value={properties.height}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        height: value,
                      },
                    }),
                  );
                }}
              />
            }
            rightLabelText="高度"
          />
        </Panel>
      </Collapse>
    </div>
  );
}

export default BasePropertyPanel;
