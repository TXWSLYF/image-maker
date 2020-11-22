import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectScrollHeight,
  selectScrollLeft,
  selectScrollTop,
  selectScrollWidth,
  selectScreenHeight,
  selectScreenWidth,
  setScrollLeft,
  setScrollTop,
} from 'src/features/editor/editorSlice';
import styles from './index.module.scss';

const ScrollBar = () => {
  const dispatch = useDispatch();
  const scrollHeight = useSelector(selectScrollHeight);
  const scrollWidth = useSelector(selectScrollWidth);
  const screenHeight = useSelector(selectScreenHeight);
  const screenWidth = useSelector(selectScreenWidth);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);

  const scrollTrackY = useRef<HTMLDivElement>(null);
  const scrollTrackX = useRef<HTMLDivElement>(null);

  const [scrollTrackYHeight, setScrollTrackYHeight] = useState(0);
  const [scrollTrackXWidth, setScrollTrackXWidth] = useState(0);

  // 滚动条宽高百分比
  const [scrollBarYHeight, setScrollBarYHeight] = useState(0);
  const [scrollBarXWidth, setScrollBarXWidth] = useState(0);

  // 滚动条拖动相关数据
  const [mouseDownType, setMouseDownType] = useState<'X' | 'Y' | null>(null);
  const [mouseDownCoordinate, setMouseDownCoordinate] = useState<ICoordinate>({ x: 0, y: 0 });
  const [mouseDownScrollTop, setMouseDownScrollTop] = useState(0);
  const [mouseDownScrollLeft, setMouseDownScrollLeft] = useState(0);

  // 计算滚动条尺寸
  useEffect(() => {
    setScrollBarYHeight((screenHeight / scrollHeight) * 100);
  }, [screenHeight, scrollHeight]);
  useEffect(() => {
    setScrollBarXWidth((screenWidth / scrollWidth) * 100);
  }, [screenWidth, scrollWidth]);

  useEffect(() => {
    if (scrollTrackY.current) {
      const { height } = scrollTrackY.current.getBoundingClientRect();
      setScrollTrackYHeight(height);
    }
  }, []);
  useEffect(() => {
    if (scrollTrackX.current) {
      const { width } = scrollTrackX.current.getBoundingClientRect();
      setScrollTrackXWidth(width);
    }
  }, []);

  const handleWheelX = useCallback(
    (data: { offset?: number; newScrollLeft?: number }) => {
      dispatch(setScrollLeft(data));
    },
    [dispatch],
  );

  const handleWheelY = useCallback(
    (data: { offset?: number; newScrollTop?: number }) => {
      dispatch(setScrollTop(data));
    },
    [dispatch],
  );

  /**
   * @description 滚动条拖动相关逻辑
   */
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setMouseDownCoordinate({ x: clientX, y: clientY });
  }, []);
  const handleMouseDownX = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleMouseDown(e);
      setMouseDownScrollLeft(scrollLeft);
      setMouseDownType('X');
    },
    [handleMouseDown, scrollLeft],
  );
  const handleMouseDownY = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleMouseDown(e);
      setMouseDownScrollTop(scrollTop);
      setMouseDownType('Y');
    },
    [handleMouseDown, scrollTop],
  );
  useEffect(() => {
    if (mouseDownType) {
      const handleMouseMove = (e: MouseEvent) => {
        const { x, y } = mouseDownCoordinate;
        const { clientX, clientY } = e;

        if (mouseDownType === 'Y') {
          handleWheelY({ newScrollTop: ((clientY - y) / scrollTrackYHeight) * scrollHeight + mouseDownScrollTop });
        } else if (mouseDownType === 'X') {
          handleWheelX({ newScrollLeft: ((clientX - x) / scrollTrackXWidth) * scrollWidth + mouseDownScrollLeft });
        }
      };
      const handleMouseUp = () => {
        setMouseDownType(null);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, [
    mouseDownType,
    mouseDownCoordinate,
    handleWheelX,
    handleWheelY,
    mouseDownScrollLeft,
    mouseDownScrollTop,
    scrollWidth,
    scrollHeight,
    scrollTrackYHeight,
    scrollTrackXWidth,
  ]);

  return useMemo(() => {
    return (
      <div className={styles.scrollBar}>
        {/* 垂直滚动条 */}
        <div ref={scrollTrackY} className={`${styles.scrollBarTrack} ${styles.scrollBarTrackY}`}>
          <div
            className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerY}`}
            style={{
              height: `${scrollBarYHeight}%`,
              top: `${((scrollTop + (scrollHeight - screenHeight) / 2) / scrollHeight) * 100}%`,
            }}
            onMouseDown={handleMouseDownY}
          >
            <div className={`${styles.thumb} ${styles.thumbY}`}></div>
          </div>
        </div>

        {/* 水平滚动条 */}
        <div ref={scrollTrackX} className={`${styles.scrollBarTrack} ${styles.scrollBarTrackX}`}>
          <div
            className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerX}`}
            style={{
              width: `${scrollBarXWidth}%`,
              left: `${((scrollLeft + (scrollWidth - screenWidth) / 2) / scrollWidth) * 100}%`,
            }}
            onMouseDown={handleMouseDownX}
          >
            <div className={`${styles.thumb} ${styles.thumbX}`}></div>
          </div>
        </div>
      </div>
    );
  }, [
    handleMouseDownX,
    handleMouseDownY,
    screenHeight,
    screenWidth,
    scrollBarXWidth,
    scrollBarYHeight,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth,
  ]);
};

export default ScrollBar;
