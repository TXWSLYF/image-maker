import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import ResizeObserver from 'resize-observer-polyfill';
import styles from './index.module.scss';

export interface ScrollProps {
  scrollWidth: number;
  scrollHeight: number;
  scrollTop: number;
  scrollLeft: number;
  handleWheelY: (data: { offset?: number; newScrollTop?: number }) => void;
  handleWheelX: (data: { offset?: number; newScrollLeft?: number }) => void;
  onMouseDown: () => void;
  onResize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
  style: React.CSSProperties;
}

const Scroll = (props: ScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown, onResize, handleWheelX, handleWheelY, scrollLeft, scrollTop } = props;

  // 滚动速率
  const [wheelSpeed] = useState(1);

  // 识别灵敏度
  const [sensitivity] = useState(1);

  // 拖拽移动相关数据
  const [isSpacePressed] = useKeyPress((e) => {
    return e.code === 'Space';
  });
  const [isDraging, setIsDraging] = useState(false);
  const [dragStartCoordinate, setDragStartCoordinate] = useState<ICoordinate>({ x: 0, y: 0 });
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  // 获取容器宽高
  useEffect(() => {
    if (ref.current) {
      // 监听尺寸变化
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const {
            target,
            contentRect: { width, height },
          } = entry;

          if (target === ref.current) {
            onResize({ width, height });
          }
        }
      });
      ro.observe(ref.current);

      return () => {
        ro.disconnect();
      };
    }
  }, [onResize]);

  /**
   * @description 窗口滚动相关逻辑
   */
  useEffect(() => {
    const { current } = ref;
    const handleWheel = (e: WheelEvent) => {
      const { deltaX, deltaY } = e;

      handleWheelY({
        offset: deltaY > sensitivity ? wheelSpeed * deltaY : deltaY < -sensitivity ? wheelSpeed * deltaY : 0,
      });
      handleWheelX({
        offset: deltaX > sensitivity ? wheelSpeed * deltaX : deltaX < -sensitivity ? wheelSpeed * deltaX : 0,
      });

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
      onMouseDown();

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

        handleWheelX({ newScrollLeft: -offsetX + dragStartScrollLeft });
        handleWheelY({ newScrollTop: -offsetY + dragStartScrollTop });
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
