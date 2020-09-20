import { Collapse } from 'antd';
import React from 'react';
import PropertyRow from '../PropertyRow';
import './index.scss';
import ChromeColorPicker from '../../../../../components/ChromeColorPicker'
import { useDispatch } from 'react-redux';
import { setLayersColor } from '../../../../../features/project/projectSlice';

const { Panel } = Collapse

function TextPropertyPanel({
  properties,
  layerId,
}: {
  properties: ITextProperties;
  layerId: string;
}) {
  const dispatch = useDispatch();

  return <div className="textPropertyPanel">
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition={'right'}
      style={{ border: 'none', background: '#fff' }}
    >
      <Panel header="文本" key="1">
        <PropertyRow
          style={{ marginBottom: 10 }}
          leftChild={<ChromeColorPicker color={properties.color} onChange={(colorResult) => {
            dispatch(setLayersColor({
              layerIds: [layerId],
              newColor: colorResult.hex
            }))
          }} />}
          leftLabelText="颜色"
          rightChild={<div></div>}
          rightLabelText="纵坐标"
        />
      </Panel>
    </Collapse>
  </div>;
}

export default TextPropertyPanel;
