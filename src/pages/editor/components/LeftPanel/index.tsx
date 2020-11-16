import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLeftPanelVisible, selectLeftPanelWidth } from 'src/features/editor/editorSlice';
import styles from './index.module.scss';

const LeftPanel = () => {
  const leftPanelWidth = useSelector(selectLeftPanelWidth);
  const isLeftPanelVisible = useSelector(selectIsLeftPanelVisible);
  const leftPanelIndeedWidth = isLeftPanelVisible ? leftPanelWidth : 0;

  return useMemo(() => {
    return <div className={styles.leftPanel} style={{ width: leftPanelIndeedWidth }}></div>;
  }, [leftPanelIndeedWidth]);
};

export default LeftPanel;
