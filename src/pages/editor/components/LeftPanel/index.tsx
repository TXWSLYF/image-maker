import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import {
  selectIsLeftPanelVisible,
  selectLeftPanelWidth,
  setLeftPanelIndeedWidth,
} from 'src/features/editor/editorSlice';
import PageList from '../PageList';
import styles from './index.module.scss';

let clockId = 0;
const LEFT_PANEL_BORDER_RIGHT = 1;
const STEP = 6;

const LeftPanel = () => {
  const dispatch = useDispatch();
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
      <div className={styles.leftPanel} style={{ width: leftPanelInnerWidth }} ref={ref}>
        <PageList />
      </div>
    );
  }, [leftPanelInnerWidth]);
};

export default LeftPanel;
