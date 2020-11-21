import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import styles from './index.module.scss';

export interface ScrollProps {
  scrollWidth: number;
  scrollHeight: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onMouseDown?: () => void;
  onScrollTopChange?: (scrollTop: number) => void;
  onScrollLeftChange?: (scrollLeft: number) => void;
  onResize?: (size: { width: number; height: number }) => void;
}

const Scroll = (props: ScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown, onScrollTopChange, onScrollLeftChange, onResize } = props;

  // 滚动速率
  const [wheelSpeed] = useState(1);

  // 识别灵敏度
  const [sensitivity] = useState(1);

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

  // 当前偏移量
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 垂直水平方向最大偏移量
  const [maxScrollTop, setMaxScrollTop] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  // 滚动范围
  const [scrollWidth] = useState(props.scrollWidth);
  const [scrollHeight] = useState(props.scrollHeight);

  // 获取容器宽高
  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();

      setContainerWidth(width);
      setContainerHeight(height);

      onResize && onResize({ width, height });
    }
  }, [onResize]);

  // 同步 scrollTop & scrollLeft
  useEffect(() => {
    onScrollTopChange && onScrollTopChange(scrollTop);
  }, [onScrollTopChange, scrollTop]);
  useEffect(() => {
    onScrollLeftChange && onScrollLeftChange(scrollLeft);
  }, [onScrollLeftChange, scrollLeft]);

  // 计算最大偏移量
  useEffect(() => {
    setMaxScrollTop((scrollHeight - containerHeight) / 2);
  }, [scrollHeight, containerHeight]);
  useEffect(() => {
    setMaxScrollLeft((scrollWidth - containerWidth) / 2);
  }, [scrollWidth, containerWidth]);

  // 处理垂直方向滚动逻辑
  const handleWheelY = useCallback(
    (offset: number, newScrollTop?: number) => {
      if (offset === 0 && newScrollTop === undefined) return;

      setScrollTop((scrollTop) => {
        let indeedScrollTop = newScrollTop === undefined ? scrollTop + offset : newScrollTop;

        if (indeedScrollTop < -maxScrollTop) {
          indeedScrollTop = -maxScrollTop;
        }

        if (indeedScrollTop > maxScrollTop) {
          indeedScrollTop = maxScrollTop;
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
        let indeedScrollLeft = newScrollLeft === undefined ? scrollLeft + offset : newScrollLeft;

        if (indeedScrollLeft < -maxScrollLeft) {
          indeedScrollLeft = -maxScrollLeft;
        }

        if (indeedScrollLeft > maxScrollLeft) {
          indeedScrollLeft = maxScrollLeft;
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
  }, [handleWheelY, handleWheelX, wheelSpeed, sensitivity]);

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
      </div>
    );
  }, [props.style, props.children, isDraging, isSpacePressed, handleDragMouseDown, scrollLeft, scrollTop]);
};

export default Scroll;
