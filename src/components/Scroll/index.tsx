import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import styles from './index.module.scss';

const sensitivity = 1;

export interface ScrollProps {
  scrollWidth: number;
  scrollHeight: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onMouseDown?: () => void;
}

const Scroll = (props: ScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown } = props;

  // 滚动速率
  const [wheelSpeed, setWheelSpeed] = useState(1);

  // 容器宽高
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // 拖拽移动相关数据
  const [isSpacePressed] = useKeyPress((e) => {
    return e.code === 'Space';
  });
  const [isDraging, setIsDraging] = useState(false);
  const [dragStartCoordinate, setDragStartCoordinate] = useState<ICoordinate>({ x: 0, y: 0 });
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  // 滚动条拖动相关数据
  const [mouseDownType, setMouseDownType] = useState<'X' | 'Y' | null>(null);
  const [mouseDownCoordinate, setMouseDownCoordinate] = useState<ICoordinate>({ x: 0, y: 0 });
  const [mouseDownScrollTop, setMouseDownScrollTop] = useState(0);
  const [mouseDownScrollLeft, setMouseDownScrollLeft] = useState(0);

  // 当前偏移量
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 垂直水平方向最大偏移量
  const [maxScrollTop, setMaxScrollTop] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  // 滚动范围
  const [scrollWidth, setScrollWidth] = useState(props.scrollWidth);
  const [scrollHeight, setScrollHeight] = useState(props.scrollHeight);

  // 滚动条宽高百分比
  const [scrollBarYHeight, setScrollBarYHeight] = useState(0);
  const [scrollBarXWidth, setScrollBarXWidth] = useState(0);

  // 获取容器宽高
  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();

      setContainerWidth(width);
      setContainerHeight(height);
    }
  }, []);

  // 计算滚动条尺寸
  useEffect(() => {
    setScrollBarYHeight((containerHeight / scrollHeight) * 100);
  }, [containerHeight, scrollHeight]);
  useEffect(() => {
    if (ref.current) {
      setScrollBarXWidth((containerWidth / scrollWidth) * 100);
    }
  }, [containerWidth, scrollWidth]);

  // 计算最大偏移量
  useEffect(() => {
    setMaxScrollTop(scrollHeight - containerHeight);
  }, [scrollHeight, containerHeight]);
  useEffect(() => {
    setMaxScrollLeft(scrollWidth - containerWidth);
  }, [scrollWidth, containerWidth]);

  // 处理垂直方向滚动逻辑
  const handleWheelY = useCallback(
    (offset: number, newScrollTop?: number) => {
      if (offset === 0 && newScrollTop === undefined) return;

      setScrollTop((scrollTop) => {
        const indeedScrollTop = newScrollTop === undefined ? scrollTop + offset : newScrollTop;

        if (indeedScrollTop < 0) {
          return 0;
        }

        if (indeedScrollTop > maxScrollTop) {
          return maxScrollTop;
        }

        return indeedScrollTop;
      });
    },
    [maxScrollTop],
  );

  // 处理水平方向滚动逻辑
  const handleWheelX = useCallback(
    (offset: number, newScrollLeft?: number) => {
      if (offset === 0 && newScrollLeft === undefined) return;

      setScrollLeft((scrollLeft) => {
        const indeedScrollLeft = newScrollLeft === undefined ? scrollLeft + offset : newScrollLeft;

        if (indeedScrollLeft < 0) {
          return 0;
        }

        if (indeedScrollLeft > maxScrollLeft) {
          return maxScrollLeft;
        }

        return indeedScrollLeft;
      });
    },
    [maxScrollLeft],
  );

  /**
   * @description 窗口滚动相关逻辑
   */
  useEffect(() => {
    const { current } = ref;
    const handleWheel = (e: WheelEvent) => {
      const { deltaX, deltaY } = e;

      handleWheelY(deltaY > sensitivity ? wheelSpeed * deltaY : deltaY < -sensitivity ? wheelSpeed * deltaY : 0);
      handleWheelX(deltaX > sensitivity ? wheelSpeed * deltaX : deltaX < -sensitivity ? wheelSpeed * deltaX : 0);

      e.stopPropagation();
      e.preventDefault();
    };
    current?.addEventListener('wheel', handleWheel);

    return () => {
      current?.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheelY, handleWheelX, wheelSpeed]);

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
          handleWheelY(0, ((clientY - y) / containerHeight) * scrollHeight + mouseDownScrollTop);
        } else if (mouseDownType === 'X') {
          handleWheelX(0, ((clientX - x) / containerWidth) * scrollWidth + mouseDownScrollLeft);
        }
      };
      const handleMouseUp = (e: MouseEvent) => {
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
    containerWidth,
    containerHeight,
  ]);

  /**
   * @description 拖拽移动相关逻辑
   */
  const handleDragMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onMouseDown && onMouseDown();

      if (isSpacePressed) {
        const { clientX, clientY } = e;
        setIsDraging(true);
        setDragStartCoordinate({ x: clientX, y: clientY });
        setDragStartScrollTop(scrollTop);
        setDragStartScrollLeft(scrollLeft);
      }
    },
    [onMouseDown, isSpacePressed, scrollTop, scrollLeft],
  );
  useEffect(() => {
    if (isDraging) {
      const { x, y } = dragStartCoordinate;
      const handleDragMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const offsetX = clientX - x;
        const offsetY = clientY - y;

        handleWheelX(0, -offsetX + dragStartScrollLeft);
        handleWheelY(0, -offsetY + dragStartScrollTop);
      };
      const handleDragMouseUp = () => {
        setIsDraging(false);
        document.removeEventListener('mousemove', handleDragMouseMove);
        document.removeEventListener('mouseup', handleDragMouseUp);
      };

      document.addEventListener('mousemove', handleDragMouseMove);
      document.addEventListener('mouseup', handleDragMouseUp);
    }
  }, [isDraging, handleWheelX, handleWheelY, dragStartCoordinate, dragStartScrollLeft, dragStartScrollTop]);

  return useMemo(() => {
    return (
      <div
        className={`${styles.scroll} ${isDraging ? styles.draging : isSpacePressed ? styles.waitDrag : ''}`}
        ref={ref}
        style={props.style}
        onMouseDown={handleDragMouseDown}
      >
        <div
          style={{
            transform: `translate(${-scrollLeft}px, ${-scrollTop}px) scale(1)`,
          }}
        >
          {props.children}
        </div>

        {/* 模拟滚动条 */}
        <div className={styles.scrollBar}>
          {/* 垂直滚动条 */}
          <div className={`${styles.scrollBarTrack} ${styles.scrollBarTrackY}`}>
            <div
              className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerY}`}
              style={{ height: `${scrollBarYHeight}%`, top: `${(scrollTop / scrollHeight) * 100}%` }}
              onMouseDown={handleMouseDownY}
            >
              <div className={`${styles.thumb} ${styles.thumbY}`}></div>
            </div>
          </div>

          {/* 水平滚动条 */}
          <div className={`${styles.scrollBarTrack} ${styles.scrollBarTrackX}`}>
            <div
              className={`${styles.scrollBarHandler} ${styles.scrollBarHandlerX}`}
              style={{ width: `${scrollBarXWidth}%`, left: `${(scrollLeft / scrollWidth) * 100}%` }}
              onMouseDown={handleMouseDownX}
            >
              <div className={`${styles.thumb} ${styles.thumbX}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    isDraging,
    isSpacePressed,
    props.style,
    props.children,
    handleDragMouseDown,
    scrollLeft,
    scrollTop,
    scrollBarYHeight,
    scrollHeight,
    handleMouseDownY,
    scrollBarXWidth,
    scrollWidth,
    handleMouseDownX,
  ]);
};

export default Scroll;
