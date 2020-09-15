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
          <div className={styles.propertyRow} style={{ marginBottom: 10 }}>
            <div>
              <label>横坐标：</label>
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
                    })
                  );
                }}
              />
            </div>
            <div>
              <label>纵坐标：</label>
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
                    })
                  );
                }}
              />
            </div>
          </div>
          <div className={styles.propertyRow} style={{ marginBottom: 10 }}>
            <div>
              <label>旋转角：</label>
              <InputNumber
                style={{ width: 70 }}
                value={properties.rotation}
                onChange={(value) => {
                  dispatch(
                    setLayersProperties({
                      layerId,
                      newProperties: {
                        rotation: value,
                      },
                    })
                  );
                }}
              />
            </div>
            <div>
              <label>透明度：</label>
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
                    })
                  );
                }}
              />
            </div>
          </div>
          <div className={styles.propertyRow} >
            <div>
              <label>宽度：</label>
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
                    })
                  );
                }}
              />
            </div>
            <div>
              <label>高度：</label>
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
                    })
                  );
                }}
              />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default BasePropertyPanel;
