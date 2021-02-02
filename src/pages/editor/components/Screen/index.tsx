import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useKeyPress } from 'react-use';
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
  setIsRangeSelecting,
  setRangeSelectionStartCoordinate,
  setRangeSelectionCurrentCoordinate,
  selectRangeSelectionStartCoordinate,
  selectCurImageLayerIds,
  selectScreenWidth,
  selectScreenHeight,
  selectTopBarHeight,
  selectIsRangeSelecting,
  setEditingTextLayerId,
} from 'src/features/editor/editorSlice';
import { selectCanvasScale, setCanvasScale } from 'src/features/project/projectBasicSlice';
import { selectCanvas, selectLayers } from 'src/features/project/projectUndoableSlice';
import calcMiniEnclosingRect from 'src/utils/calcMiniEnclosingRect';
import rectCollide from 'src/utils/rectCollide';
import scaleRect from 'src/utils/scaleRect';
import EditingTextArea from '../EditingTextArea';
import EditorArea from '../EditorArea';
import FakeCanvas from '../FakeCanvas';
import RangeSelection from '../RangeSelection';

const style1: React.CSSProperties = {
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
  const scale = useSelector(selectCanvasScale);
  const curImageLayerIds = useSelector(selectCurImageLayerIds);
  const { byId: layersById } = useSelector(selectLayers);
  const rangeSelectionStartCoordinate = useSelector(selectRangeSelectionStartCoordinate);
  const canvasScale = useSelector(selectCanvasScale);
  const canvas = useSelector(selectCanvas);
  const screenWidth = useSelector(selectScreenWidth);
  const screenHeight = useSelector(selectScreenHeight);
  const topBarHeight = useSelector(selectTopBarHeight);
  const isRangeSelecting = useSelector(selectIsRangeSelecting);

  // 拖拽移动相关数据
  const [isSpacePressed] = useKeyPress((e: KeyboardEvent) => {
    return e.code === 'Space';
  });

  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isSpacePressed) return;

      const { clientX, clientY } = event;
      dispatch(setIsRangeSelecting(true));
      dispatch(setRangeSelectionStartCoordinate({ x: clientX, y: clientY }));
      dispatch(setRangeSelectionCurrentCoordinate({ x: clientX, y: clientY }));
      dispatch(setCurLayers([]));
      dispatch(setEditingTextLayerId(''));
    },
    [dispatch, isSpacePressed],
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isRangeSelecting) return;

      const { clientX: currentX, clientY: currentY } = event;
      const { x: startX, y: startY } = rangeSelectionStartCoordinate;

      const rangeSelection: IRect = {
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        width: Math.abs(startX - currentX),
        height: Math.abs(startY - currentY),
        rotation: 0,
      };

      const curLayerIds = curImageLayerIds.filter((layerId) => {
        const { x, y, width, height } = calcMiniEnclosingRect([scaleRect(layersById[layerId].properties, canvasScale)]);

        const layerClientX = screenWidth / 2 - (canvas.width * canvasScale) / 2 + x - scrollLeft;
        const layerClientY = screenHeight / 2 - (canvas.height * canvasScale) / 2 + y - scrollTop + topBarHeight;

        return rectCollide(rangeSelection, { x: layerClientX, y: layerClientY, width, height, rotation: 0 });
      });

      dispatch(setCurLayers(curLayerIds));
      dispatch(setRangeSelectionCurrentCoordinate({ x: currentX, y: currentY }));
    },
    [
      canvas.height,
      canvas.width,
      canvasScale,
      curImageLayerIds,
      dispatch,
      isRangeSelecting,
      layersById,
      rangeSelectionStartCoordinate,
      screenHeight,
      screenWidth,
      scrollLeft,
      scrollTop,
      topBarHeight,
    ],
  );

  const onMouseUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      dispatch(setIsRangeSelecting(false));
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

  const style2: React.CSSProperties = useMemo(() => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `translate(${-scrollLeft}px, ${-scrollTop}px) `,
    };
  }, [scrollLeft, scrollTop]);

  const style3: React.CSSProperties = useMemo(() => {
    return {
      transform: `scale(${scale})`,
    };
  }, [scale]);

  return useMemo(() => {
    return (
      <Scroll
        scrollWidth={scrollWidth}
        scrollHeight={scrollHeight}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        style={style1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
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
          <EditingTextArea />
        </div>
        <RangeSelection />
      </Scroll>
    );
  }, [
    handleScaleChange,
    handleWheelX,
    handleWheelY,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onScrollResize,
    scale,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth,
    style2,
    style3,
  ]);
};

export default Screen;
