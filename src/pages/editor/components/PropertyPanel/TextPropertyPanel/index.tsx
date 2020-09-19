import { Collapse } from 'antd';
import React from 'react';
import PropertyRow from '../PropertyRow';
import styles from './index.module.scss';
import ChromeColorPicker from '../../../../../components/ChromeColorPicker'

const { Panel } = Collapse

function TextPropertyPanel({
  properties,
  layerId,
}: {
  properties: ITextProperties;
  layerId: string;
}) {
  return <div className={styles.textPropertyPanel}>
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition={'right'}
      style={{ border: 'none', background: '#fff' }}
    >
      <Panel header="文本" key="1">
        <PropertyRow
          style={{ marginBottom: 10 }}
          leftChild={<ChromeColorPicker color={properties.color}/>}
          leftLabelText="颜色"
          rightChild={<div></div>}
          rightLabelText="纵坐标"
        />
      </Panel>
    </Collapse>
  </div>;
}

export default TextPropertyPanel;
