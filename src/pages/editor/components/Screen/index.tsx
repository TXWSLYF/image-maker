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
import EditorArea from '../EditorArea';

const style: React.CSSProperties = {
  position: 'fixed',
  top: 52,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#f1f3f7',
};

const Screen = () => {
  const dispatch = useDispatch();
  const scrollHeight = useSelector(selectScrollHeight);
  const scrollWidth = useSelector(selectScrollWidth);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);

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

  return useMemo(() => {
    return (
      <Scroll
        scrollWidth={scrollWidth}
        scrollHeight={scrollHeight}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        style={style}
        onMouseDown={onMouseDown}
        onResize={onScrollResize}
        handleWheelX={handleWheelX}
        handleWheelY={handleWheelY}
      >
        <EditorArea />
      </Scroll>
    );
  }, [handleWheelX, handleWheelY, onMouseDown, onScrollResize, scrollHeight, scrollLeft, scrollTop, scrollWidth]);
};

export default Screen;