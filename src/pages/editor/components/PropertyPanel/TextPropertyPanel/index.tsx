import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Collapse } from 'antd';
import ChromeColorPicker from 'src/components/ChromeColorPicker';
import { setLayersColor } from 'src/features/project/projectUndoableSlice';
import PropertyRow from '../PropertyRow';
import './index.scss';

const { Panel } = Collapse;

export interface TextPropertyPanelProps {
  properties: ITextProperties;
  layerId: string;
}

const TextPropertyPanel = ({ properties, layerId }: TextPropertyPanelProps) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return (
      <div className="textPropertyPanel">
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'} style={{ border: 'none', background: '#fff' }}>
          <Panel header="文本" key="1">
            <PropertyRow
              style={{ marginBottom: 10 }}
              leftChild={
                <ChromeColorPicker
                  color={properties.color}
                  onChange={(colorResult) => {
                    dispatch(
                      setLayersColor({
                        layerIds: [layerId],
                        newColor: colorResult.hex,
                      }),
                    );
                  }}
                />
              }
              leftLabelText="颜色"
              rightChild={<div></div>}
              rightLabelText="纵坐标"
            />
          </Panel>
        </Collapse>
      </div>
    );
  }, [dispatch, layerId, properties.color]);
};

export default TextPropertyPanel;
