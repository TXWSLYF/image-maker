import React, { useMemo } from 'react';
import LayerPanelHeader, { LayerPanelHeaderProps } from './LayerPanelHeader';
import LayerScrollList, { LayerScrollListProps } from './LayerScrollList';
import styles from './index.module.scss';

interface LayerPanelProps extends LayerPanelHeaderProps, LayerScrollListProps {
  style?: React.CSSProperties;
}

const LayerPanel = ({ style, visible, onVisiblechange, layers }: LayerPanelProps) => {
  return useMemo(() => {
    return (
      <div style={style} className={styles.layerPanel}>
        <div className={styles.layerPanelWrapper}>
          <LayerPanelHeader visible={visible} onVisiblechange={onVisiblechange} />
          <LayerScrollList layers={layers} />
        </div>
      </div>
    );
  }, [layers, onVisiblechange, style, visible]);
};

export default LayerPanel;
