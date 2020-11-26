import React, { useMemo } from 'react';
import styles from './index.module.scss';
import LayerPanelHeader, { LayerPanelHeaderProps } from './LayerPanelHeader';

interface LayerPanelProps extends LayerPanelHeaderProps {
  layers: ILayer[];
  style?: React.CSSProperties;
}

const LayerPanel = ({ style, visible, onVisiblechange, layers }: LayerPanelProps) => {
  return useMemo(() => {
    return (
      <div style={style} className={styles.layerPanel}>
        <div className={styles.layerPanelWrapper}>
          <LayerPanelHeader visible={visible} onVisiblechange={onVisiblechange} />
        </div>
      </div>
    );
  }, [onVisiblechange, style, visible]);
};

export default LayerPanel;
