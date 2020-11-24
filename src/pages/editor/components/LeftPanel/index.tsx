import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLeftPanelVisible, selectLeftPanelWidth } from 'src/features/editor/editorSlice';
import PageList from '../PageList';
import styles from './index.module.scss';

let clockId = 0;
const STEP = 6;

const LeftPanel = () => {
  const leftPanelWidth = useSelector(selectLeftPanelWidth);
  const isLeftPanelVisible = useSelector(selectIsLeftPanelVisible);
  const [leftPanelInnerWidth, setLeftPanelInnerWidth] = useState(isLeftPanelVisible ? leftPanelWidth : 0);

  useEffect(() => {
    if (isLeftPanelVisible) {
      // 展开
      clockId = window.setInterval(() => {
        setLeftPanelInnerWidth((leftPanelInnerWidth) => {
          const newLeftPanelInnerWidth = Math.min(leftPanelWidth, leftPanelInnerWidth + STEP);
          if (newLeftPanelInnerWidth === leftPanelInnerWidth) {
            window.clearInterval(clockId);
          }

          return newLeftPanelInnerWidth;
        });
      });
    } else {
      // 收起
      clockId = window.setInterval(() => {
        setLeftPanelInnerWidth((leftPanelInnerWidth) => {
          const newLeftPanelInnerWidth = Math.max(0, leftPanelInnerWidth - STEP);
          if (newLeftPanelInnerWidth === 0) {
            window.clearInterval(clockId);
          }

          return newLeftPanelInnerWidth;
        });
      });
    }

    return () => {
      window.clearInterval(clockId);
    };
  }, [isLeftPanelVisible, leftPanelInnerWidth, leftPanelWidth]);

  return useMemo(() => {
    return (
      <div className={styles.leftPanel} style={{ width: leftPanelInnerWidth }}>
        <PageList />
      </div>
    );
  }, [leftPanelInnerWidth]);
};

export default LeftPanel;
