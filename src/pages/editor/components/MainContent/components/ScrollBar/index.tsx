import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectScrollHeight,
  selectScrollLeft,
  selectScrollTop,
  selectScrollWidth,
  selectScreenHeight,
  selectScreenWidth,
} from 'src/features/editor/editorSlice';
import styles from './index.module.scss';

const ScrollBar = () => {
  const scrollHeight = useSelector(selectScrollHeight);
  const scrollWidth = useSelector(selectScrollWidth);
  const screenHeight = useSelector(selectScreenHeight);
  const screenWidth = useSelector(selectScreenWidth);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);

  // 滚动条宽高百分比
  const [scrollBarYHeight, setScrollBarYHeight] = useState(0);
  const [scrollBarXWidth, setScrollBarXWidth] = useState(0);

  // 计算滚动条尺寸
  useEffect(() => {
    setScrollBarYHeight((screenHeight / scrollHeight) * 100);
  }, [screenHeight, scrollHeight]);
  useEffect(() => {
    setScrollBarXWidth((screenWidth / scrollWidth) * 100);
  }, [screenWidth, scrollWidth]);

  return useMemo(() => {
    return (
      <div className={styles.scrollBar}>
        {/* 垂直滚动条 */}
        <div className={`${styles.scrollBarTrack} ${styles.scrollBarTrackY}`}>
          <div
            className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerY}`}
            style={{
              height: `${scrollBarYHeight}%`,
              top: `${((scrollTop + (scrollHeight - screenHeight) / 2) / scrollHeight) * 100}%`,
            }}
          >
            <div className={`${styles.thumb} ${styles.thumbY}`}></div>
          </div>
        </div>

        {/* 水平滚动条 */}
        <div className={`${styles.scrollBarTrack} ${styles.scrollBarTrackX}`}>
          <div
            className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerX}`}
            style={{
              width: `${scrollBarXWidth}%`,
              left: `${((scrollLeft + (scrollWidth - screenWidth) / 2) / scrollWidth) * 100}%`,
            }}
          >
            <div className={`${styles.thumb} ${styles.thumbX}`}></div>
          </div>
        </div>
      </div>
    );
  }, [screenHeight, screenWidth, scrollBarXWidth, scrollBarYHeight, scrollHeight, scrollLeft, scrollTop, scrollWidth]);
};

export default ScrollBar;
