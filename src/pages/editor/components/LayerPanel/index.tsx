import React, { useCallback, useMemo } from 'react';
import { ReactComponent as LeftOutlinedIcon } from 'src/assets/svg/leftOutlined.svg';
import styles from './index.module.scss';

interface LayerPanelProps {
  style?: React.CSSProperties;
  visible: boolean;
  onVisiblechange: (visible: boolean) => void;
}

const LayerPanel = ({ style, visible, onVisiblechange }: LayerPanelProps) => {
  const handleToggleVisible = useCallback(() => {
    onVisiblechange(!visible);
  }, [onVisiblechange, visible]);

  return useMemo(() => {
    return (
      <div style={style} className={styles.layerPanel}>
        <div className={styles.layerPanelWrapper}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <p>图层</p>
            </div>
            <div className={styles.headerRight}>
              <div
                onClick={handleToggleVisible}
                className={styles.svgIcon}
                style={{
                  transform: visible ? 'rotate(-90deg)' : 'rotate(90deg)',
                }}
              >
                <LeftOutlinedIcon />
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }, [handleToggleVisible, style, visible]);
};

export default LayerPanel;
