import React, { useCallback, useMemo } from 'react';
import { Collapse, Input } from 'antd';
import { Dispatch } from '@reduxjs/toolkit';
import { setImgLayerProperties } from 'src/features/project/projectSlice';

const { Panel } = Collapse;
const style1: React.CSSProperties = { display: 'flex', alignItems: 'center' };
const style2: React.CSSProperties = { width: 100 };

const ImgPropertyPanel = ({
  properties,
  layerId,
  dispatch,
}: {
  properties: IImgProperties;
  layerId: IBaseLayer['id'];
  dispatch: Dispatch;
}) => {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setImgLayerProperties({ layerId, newProperties: { src: e.target.value } }));
    },
    [layerId, dispatch],
  );

  return useMemo(() => {
    return (
      <div>
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'} style={{ border: 'none', background: '#fff' }}>
          <Panel header="图片" key="1">
            <div style={style1}>
              <label style={style2}>图片地址：</label>
              <Input value={properties.src} onChange={handleInput} />
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }, [handleInput, properties]);
};

export default ImgPropertyPanel;
