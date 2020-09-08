import React from 'react';
import { InputNumber, Collapse } from 'antd';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { setLayersProperties } from '../../../../../features/project/projectSlice';

const { Panel } = Collapse;

function BasePropertyPanel({
  properties,
  layerId,
}: {
  properties: IBaseProperties;
  layerId: string;
}) {
  const dispatch = useDispatch();

  return (
    <div className={styles.basePropertyPanel}>
      <Collapse
        defaultActiveKey={['1']}
        expandIconPosition={'right'}
        style={{ border: 'none', background: '#fff' }}
      >
        <Panel header="基础" key="1">
          <InputNumber
            value={properties.x}
            formatter={(value) => `X  ${value}`}
            parser={(value) => (value ? value.replace('X', '') : '')}
            onChange={(value) => {
              dispatch(setLayersProperties({
                layerId,
                newProperties: {
                  x: value
                }
              }))
            }}
          />
          <InputNumber
            value={properties.y}
            formatter={(value) => `Y  ${value}`}
            parser={(value) => (value ? value.replace('Y', '') : '')}
            onChange={(value) => {
              dispatch(setLayersProperties({
                layerId,
                newProperties: {
                  y: value
                }
              }))
            }}
          />
          <InputNumber
            value={properties.rotation}
            formatter={(value) => `${value} °`}
            parser={(value) => (value ? value.replace('°', '') : '')}
            onChange={(value) => {
              dispatch(setLayersProperties({
                layerId,
                newProperties: {
                  rotation: value
                }
              }))
            }}
          />
        </Panel>
      </Collapse>
    </div>
  );
}

export default BasePropertyPanel;
