import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToggle } from 'react-use';
import { selectCurImageLayers, selectIsLeftPanelVisible, selectLeftPanelWidth } from 'src/features/editor/editorSlice';
import PageList from '../PageList';
import LayerPanel from '../LayerPanel';
import styles from './index.module.scss';

const LeftPanel = () => {
  const leftPanelWidth = useSelector(selectLeftPanelWidth);
  const isLeftPanelVisible = useSelector(selectIsLeftPanelVisible);
  const [isLayerPanelVisible, toggle] = useToggle(true);
  const [layerPanelHeight] = useState(300);
  const layerPanelStyle = {
    flexBasis: isLayerPanelVisible ? layerPanelHeight : 36,
  };
  const leftPanelIndeedWidth = isLeftPanelVisible ? leftPanelWidth : 0;
  const curImageLayers = useSelector(selectCurImageLayers);

  return useMemo(() => {
    return (
      <div className={styles.leftPanel} style={{ width: leftPanelIndeedWidth }}>
        <PageList />
        <LayerPanel
          style={layerPanelStyle}
          visible={isLayerPanelVisible}
          onVisiblechange={toggle}
          layers={curImageLayers}
        />
      </div>
    );
  }, [isLayerPanelVisible, layerPanelStyle, leftPanelIndeedWidth, toggle, curImageLayers]);
};

export default LeftPanel;
