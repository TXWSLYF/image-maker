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

  const onMouseDown = useCallback(() => {
    dispatch(setCurLayers([]));
  }, [dispatch]);
  const onScrollTopChange = useCallback(
    (scrollTop) => {
      dispatch(setScrollTop(scrollTop));
    },
    [dispatch],
  );
  const onScrollLeftChange = useCallback(
    (scrollLeft) => {
      dispatch(setScrollLeft(scrollLeft));
    },
    [dispatch],
  );
  const onScrollResize = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      dispatch(setScreenHeight(height));
      dispatch(setScreenWidth(width));
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <Scroll
        scrollWidth={scrollWidth}
        scrollHeight={scrollHeight}
        style={style}
        onMouseDown={onMouseDown}
        onScrollTopChange={onScrollTopChange}
        onScrollLeftChange={onScrollLeftChange}
        onResize={onScrollResize}
      >
        <EditorArea />
      </Scroll>
    );
  }, [onMouseDown, onScrollLeftChange, onScrollResize, onScrollTopChange, scrollHeight, scrollWidth]);
};

export default Screen;
