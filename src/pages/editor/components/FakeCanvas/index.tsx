import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurLayerIds, selectEditorCanvasCoordinate, selectHoverLayerId } from 'src/features/editor/editorSlice';
import { selectCanvas, selectLayers } from 'src/features/project/projectSlice';
import calcMiniEnclosingRect, { calcRectCenter } from 'src/utils/calcMiniEnclosingRect';
import {
  setIsRotating,
  setRotateId,
  setRotateStartMouseCoordinate,
  setRotateStartLayersRotation,
  setRotateCenterCoordinate,
} from 'src/features/editor/editorSlice';
import { guid } from 'src/utils/util';
import styles from './index.module.scss';

interface ISingleResizerStyle {
  width: number;
  height: number;
  transform: string;
}

function curContainerRender(
  curLayerIds: string[],
  layersById: IProjectState['layers']['byId'],
  singleResizerStyle: ISingleResizerStyle,
) {
  return (
    <div className={styles.curContainer}>
      {curLayerIds.length > 1 ? <div className={styles.itemTotalBorder} style={singleResizerStyle}></div> : null}
      {curLayerIds.map((curLayerId) => {
        const { width, height, x, y, rotation } = layersById[curLayerId].properties;

        return (
          <div
            key={curLayerId}
            className={styles.itemSelectBorder}
            style={{
              width,
              height,
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
            }}
          ></div>
        );
      })}
    </div>
  );
}

function hoverContainerRender(
  hoverLayerId: string,
  curLayerIds: string[],
  layersById: IProjectState['layers']['byId'],
) {
  if (!hoverLayerId) return null;
  if (curLayerIds.findIndex((layerId) => layerId === hoverLayerId) !== -1) return null;

  const { width, height, x, y, rotation } = layersById[hoverLayerId].properties;

  return (
    <div className={styles.hoverContainer}>
      <div
        className={styles.hoverItem}
        style={{
          width,
          height,
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        }}
      ></div>
    </div>
  );
}

function selectionHandlerRender(
  curLayerIds: string[],
  layersById: IProjectState['layers']['byId'],
  singleResizerStyle: ISingleResizerStyle,
  editorCanvasCoordinate: ICoordinate,
  dispatch: Dispatch,
) {
  if (!curLayerIds.length) return null;

  return (
    <div className={styles.selectionHandler}>
      <div className={styles.singleResizer} style={singleResizerStyle}>
        <div
          className={styles.rotate}
          onMouseDown={(e) => {
            // 设置旋转状态为 true
            dispatch(setIsRotating(true));

            // 设置本次旋转过程 id
            dispatch(setRotateId(guid()));

            // 记录鼠标初始点击位置
            dispatch(setRotateStartMouseCoordinate({ x: e.clientX, y: e.clientY }));

            // 记录旋转中心点坐标
            const rectCenter = calcRectCenter(layersById[curLayerIds[0]].properties);
            dispatch(
              setRotateCenterCoordinate({
                x: rectCenter.x + editorCanvasCoordinate.x,
                y: rectCenter.y + editorCanvasCoordinate.y,
              }),
            );

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
        <div className={`${styles.t} ${styles['resizable-handler']}`} style={{ cursor: 'nw-resize' }}></div>
        <div className={`${styles.b} ${styles['resizable-handler']}`} style={{ cursor: 'se-resize' }}></div>
        <div className={`${styles.r} ${styles['resizable-handler']}`} style={{ cursor: 'ne-resize' }}></div>
        <div className={`${styles.l} ${styles['resizable-handler']}`} style={{ cursor: 'sw-resize' }}></div>
        <div className={`${styles.tr} ${styles['resizable-handler']}`} style={{ cursor: 'n-resize' }}></div>
        <div className={`${styles.tl} ${styles['resizable-handler']}`} style={{ cursor: 'w-resize' }}></div>
        <div className={`${styles.br} ${styles['resizable-handler']}`} style={{ cursor: 'e-resize' }}></div>
        <div className={`${styles.bl} ${styles['resizable-handler']}`} style={{ cursor: 's-resize' }}></div>
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
  const hoverLayerId = useSelector(selectHoverLayerId);
  const editorCanvasCoordinate = useSelector(selectEditorCanvasCoordinate);

  let singleResizerStyle = undefined;
  if (curLayerIds.length === 1) {
    const { width, height, x, y, rotation } = layersById[curLayerIds[0]].properties;
    singleResizerStyle = {
      width,
      height,
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
    };
  } else {
    const { width, height, x, y, rotation } = calcMiniEnclosingRect(
      curLayerIds.map((layerId) => layersById[layerId].properties),
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
        width: canvas.width,
        height: canvas.height,
      }}
    >
      {curContainerRender(curLayerIds, layersById, singleResizerStyle)}
      {hoverContainerRender(hoverLayerId, curLayerIds, layersById)}
      {selectionHandlerRender(curLayerIds, layersById, singleResizerStyle, editorCanvasCoordinate, dispatch)}
    </div>
  );
}

export default FakeCanvas;
