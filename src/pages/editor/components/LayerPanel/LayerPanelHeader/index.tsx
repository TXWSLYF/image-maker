import React, { useCallback, useMemo } from 'react';
import { ReactComponent as LeftOutlinedIcon } from 'src/assets/svg/leftOutlined.svg';
import styles from './index.module.scss';

export interface LayerPanelHeaderProps {
  visible: boolean;
  onVisiblechange: (visible: boolean) => void;
}

const LayerPanelHeader = ({ onVisiblechange, visible }: LayerPanelHeaderProps) => {
  const handleToggleVisible = useCallback(() => {
    onVisiblechange(!visible);
  }, [onVisiblechange, visible]);
  const style: React.CSSProperties = useMemo(() => {
    return {
      transform: visible ? 'rotate(-90deg)' : 'rotate(90deg)',
    };
  }, [visible]);

  return useMemo(() => {
    return (
      <header className={styles.layerPanelHeader}>
        <div className={styles.layerPanelHeaderLeft}>
          <p>图层</p>
        </div>
        <div className={styles.layerPanelHeaderRight}>
          <div onClick={handleToggleVisible} className={styles.svgIcon} style={style}>
            <LeftOutlinedIcon />
          </div>
        </div>
      </header>
    );
  }, [style, handleToggleVisible]);
};

export default LayerPanelHeader;
