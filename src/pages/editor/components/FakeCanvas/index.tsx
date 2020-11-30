import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurLayerIds,
  selectEditorCanvasCoordinate,
  selectScrollLeft,
  selectScrollTop,
  setDragZoomDirection,
  setDragZoomId,
  setDragZoomStartLayersPosition,
  setDragZoomStartMouseCoordinate,
  setIsDragZooming,
} from 'src/features/editor/editorSlice';
import { selectCanvas, selectLayers } from 'src/features/project/projectUndoableSlice';
import calcMiniEnclosingRect, { calcRectCenter } from 'src/utils/calcMiniEnclosingRect';
import {
  setIsRotating,
  setRotateId,
  setRotateStartMouseAngle,
  setRotateStartLayersRotation,
  setRotateCenterCoordinate,
} from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import { guid } from 'src/utils/util';
import scaleRect from 'src/utils/scaleRect';
import { R2D } from 'src/common/constants';
import HoverContainer from './components/HoverContainer';
import EchoContainer from './components/EchoContainer';
import SelectedContainer from './components/SelectedContainer';
import styles from './index.module.scss';

export interface ISingleResizerStyle {
  width: number;
  height: number;
  transform: string;
}

function selectionHandlerRender(
  curLayerIds: string[],
  layersById: IProjectUndoableState['data']['layersById'],
  singleResizerStyle: ISingleResizerStyle,
  editorCanvasCoordinate: ICoordinate,
  dispatch: Dispatch,
  canvasScale: number,
  scrollLeft: number,
  scrollTop: number,
  canvas: IProjectUndoableState['data']['canvas'],
) {
  if (!curLayerIds.length) return null;

  const handleDragZoom = (
    dragZoomDirection: IEditorState['dragZoomDirection'],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = e;

    // 设置拖拽缩放状态为 true
    dispatch(setIsDragZooming(true));

    // 设置本次拖拽缩放 id
    dispatch(setDragZoomId(guid()));

    // 记录拖拽缩放鼠标起始坐标
    dispatch(
      setDragZoomStartMouseCoordinate({
        x: clientX,
        y: clientY,
      }),
    );

    // 记录拖拽缩放方向
    dispatch(setDragZoomDirection(dragZoomDirection));

    // 记录当前图层信息
    dispatch(
      setDragZoomStartLayersPosition(
        curLayerIds.map((layerId) => {
          const {
            id,
            properties: { x, y, width, height, rotation },
          } = layersById[layerId];

          return {
            id,
            x,
            y,
            width,
            height,
            rotation,
          };
        }),
      ),
    );

    e.stopPropagation();
  };

  return (
    <div className={styles.selectionHandler}>
      <div className={styles.singleResizer} style={singleResizerStyle}>
        <div
          className={styles.rotate}
          onMouseDown={(e) => {
            const { clientX, clientY } = e;

            // 设置旋转状态为 true
            dispatch(setIsRotating(true));

            // 设置本次旋转过程 id
            dispatch(setRotateId(guid()));

            // 记录旋转中心点坐标
            const rectCenterCoordinate = calcRectCenter(scaleRect(layersById[curLayerIds[0]].properties, canvasScale));
            const rotateCenterCoordinate = {
              x:
                rectCenterCoordinate.x + editorCanvasCoordinate.x - scrollLeft - ((canvasScale - 1) * canvas.width) / 2,
              y:
                rectCenterCoordinate.y + editorCanvasCoordinate.y - scrollTop - ((canvasScale - 1) * canvas.height) / 2,
            };
            dispatch(setRotateCenterCoordinate(rotateCenterCoordinate));

            const rotateStartMouseAngle =
              R2D * Math.atan2(clientY - rotateCenterCoordinate.y, clientX - rotateCenterCoordinate.x);

            // 记录初始旋转时，鼠标点击点与 x 轴正方向夹角
            dispatch(setRotateStartMouseAngle(rotateStartMouseAngle));

            // 记录旋转图层当前时刻位置
            dispatch(
              setRotateStartLayersRotation(
                curLayerIds.map((id) => {
                  const {
                    properties: { rotation },
                  } = layersById[id];

                  return { id, rotation };
                }),
              ),
            );

            e.stopPropagation();
          }}
        >
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
              fill="#298df8"
            ></path>
          </svg>
        </div>
        <div
          className={`${styles.t} ${styles['resizable-handler']}`}
          style={{ cursor: 'n-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['n'], e);
          }}
        ></div>
        <div
          className={`${styles.b} ${styles['resizable-handler']}`}
          style={{ cursor: 's-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['s'], e);
          }}
        ></div>
        <div
          className={`${styles.r} ${styles['resizable-handler']}`}
          style={{ cursor: 'e-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['e'], e);
          }}
        ></div>
        <div
          className={`${styles.l} ${styles['resizable-handler']}`}
          style={{ cursor: 'w-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['w'], e);
          }}
        ></div>
        <div
          className={`${styles.tr} ${styles['resizable-handler']}`}
          style={{ cursor: 'ne-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['n', 'e'], e);
          }}
        ></div>
        <div
          className={`${styles.tl} ${styles['resizable-handler']}`}
          style={{ cursor: 'nw-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['n', 'w'], e);
          }}
        ></div>
        <div
          className={`${styles.br} ${styles['resizable-handler']}`}
          style={{ cursor: 'se-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['s', 'e'], e);
          }}
        ></div>
        <div
          className={`${styles.bl} ${styles['resizable-handler']}`}
          style={{ cursor: 'sw-resize' }}
          onMouseDown={(e) => {
            handleDragZoom(['s', 'w'], e);
          }}
        ></div>
        <div className={`${styles.t} ${styles.square}`}></div>
        <div className={`${styles.b} ${styles.square}`}></div>
        <div className={`${styles.r} ${styles.square}`}></div>
        <div className={`${styles.l} ${styles.square}`}></div>
        <div className={`${styles.tr} ${styles.square}`}></div>
        <div className={`${styles.tl} ${styles.square}`}></div>
        <div className={`${styles.br} ${styles.square}`}></div>
        <div className={`${styles.bl} ${styles.square}`}></div>
      </div>
    </div>
  );
}

function FakeCanvas() {
  const dispatch = useDispatch();
  const canvas = useSelector(selectCanvas);
  const { byId: layersById } = useSelector(selectLayers);
  const curLayerIds = useSelector(selectCurLayerIds);
  const editorCanvasCoordinate = useSelector(selectEditorCanvasCoordinate);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);
  const canvasScale = useSelector(selectCanvasScale);

  let singleResizerStyle = undefined;
  if (curLayerIds.length === 1) {
    const { width, height, x, y, rotation } = scaleRect(layersById[curLayerIds[0]].properties, canvasScale);
    singleResizerStyle = {
      width,
      height,
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    };
  } else {
    const { width, height, x, y, rotation } = calcMiniEnclosingRect(
      curLayerIds.map((layerId) => scaleRect(layersById[layerId].properties, canvasScale)),
    );
    singleResizerStyle = {
      width,
      height,
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    };
  }

  return (
    <div
      className={styles.fakeCanvas}
      style={{
        width: canvas.width * canvasScale,
        height: canvas.height * canvasScale,
        transform: `translate(${-scrollLeft}px, ${-scrollTop}px) `,
      }}
    >
      <SelectedContainer singleResizerStyle={singleResizerStyle} />
      <HoverContainer />
      <EchoContainer />
      {selectionHandlerRender(
        curLayerIds,
        layersById,
        singleResizerStyle,
        editorCanvasCoordinate,
        dispatch,
        canvasScale,
        scrollLeft,
        scrollTop,
        canvas,
      )}
    </div>
  );
}

export default FakeCanvas;
