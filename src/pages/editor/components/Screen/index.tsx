import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from 'src/components/Scroll';
import {
  setCurLayers,
  setScrollTop,
  setScrollLeft,
  selectScrollHeight,
  selectScrollWidth,
  setScreenHeight,
  setScreenWidth,
  selectScrollTop,
  selectScrollLeft,
} from 'src/features/editor/editorSlice';
import { selectCanvasScale, setCanvasScale } from 'src/features/project/projectBasicSlice';
import EditorArea from '../EditorArea';
import FakeCanvas from '../FakeCanvas';

const style1: React.CSSProperties = {
  position: 'fixed',
  top: 52,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#f1f3f7',
};

const style2: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Screen = () => {
  const dispatch = useDispatch();
  const scrollHeight = useSelector(selectScrollHeight);
  const scrollWidth = useSelector(selectScrollWidth);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);
  const scale = useSelector(selectCanvasScale);

  const onMouseDown = useCallback(() => {
    dispatch(setCurLayers([]));
  }, [dispatch]);
  const onScrollResize = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      dispatch(setScreenHeight(height));
      dispatch(setScreenWidth(width));
    },
    [dispatch],
  );
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

  const handleScaleChange = useCallback(
    (scale: number) => {
      dispatch(setCanvasScale(scale));
    },
    [dispatch],
  );

  const style3: React.CSSProperties = useMemo(() => {
    return {
      transform: `translate(${-scrollLeft}px, ${-scrollTop}px) scale(${scale})`,
    };
  }, [scale, scrollLeft, scrollTop]);

  return useMemo(() => {
    return (
      <Scroll
        scrollWidth={scrollWidth}
        scrollHeight={scrollHeight}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        style={style1}
        onMouseDown={onMouseDown}
        onResize={onScrollResize}
        handleWheelX={handleWheelX}
        handleWheelY={handleWheelY}
        scale={scale}
        handleScaleChange={handleScaleChange}
      >
        <div style={style2}>
          <div style={style3}>
            <EditorArea />
          </div>
          <FakeCanvas />
        </div>
      </Scroll>
    );
  }, [
    handleScaleChange,
    handleWheelX,
    handleWheelY,
    onMouseDown,
    onScrollResize,
    scale,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth,
    style3,
  ]);
};

export default Screen;
