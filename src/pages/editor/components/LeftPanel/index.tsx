import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import {
  selectIsLeftPanelVisible,
  selectLeftPanelWidth,
  setLeftPanelIndeedWidth,
} from 'src/features/editor/editorSlice';
import PageList from '../PageList';
import styles from './index.module.scss';

const LEFT_PANEL_BORDER_RIGHT = 1;

const LeftPanel = () => {
  const dispatch = useDispatch();
  const leftPanelWidth = useSelector(selectLeftPanelWidth);
  const isLeftPanelVisible = useSelector(selectIsLeftPanelVisible);
  const leftPanelIndeedWidth = isLeftPanelVisible ? leftPanelWidth : 0;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      // 监听尺寸变化
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const {
            target,
            contentRect: { width },
          } = entry;

          if (target === ref.current) {
            dispatch(setLeftPanelIndeedWidth(width + LEFT_PANEL_BORDER_RIGHT));
          }
        }
      });
      ro.observe(ref.current);

      return () => {
        ro.disconnect();
      };
    }
  }, [dispatch]);

  return useMemo(() => {
    return (
      <div className={styles.leftPanel} style={{ width: leftPanelIndeedWidth }} ref={ref}>
        <PageList />
      </div>
    );
  }, [leftPanelIndeedWidth]);
};

export default LeftPanel;
