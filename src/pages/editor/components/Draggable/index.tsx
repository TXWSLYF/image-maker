import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLayers,
  setLayersBaseProperties,
  setLayersCoordinate,
  setLayersRotation,
} from 'src/features/project/projectUndoableSlice';
import {
  setIsDraging,
  setIsRotating,
  selectIsDraging,
  selectDragStartMouseCoordinate,
  selectDragStartLayersCoordinate,
  selectDragId,
  selectIsRotating,
  selectRotateId,
  selectRotateStartMouseAngle,
  selectRotateStartLayersRotation,
  selectRotateCenterCoordinate,
  setIsDragZooming,
  selectIsDragZooming,
  selectDragZoomId,
  selectDragZoomDirection,
  selectDragZoomStartMouseCoordinate,
  selectDragZoomStartLayersPosition,
} from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import transfromAngle from 'src/utils/transformAngle';
import { R2D } from 'src/common/constants';
import styles from './index.module.scss';
import TopBar from '../TopBar';
import Screen from '../Screen';
import BasicWidgets from '../BasicWidgets';
import LeftPanel from '../LeftPanel';
import MainContent from '../MainContent';
import PropertyPanel from '../PropertyPanel';

function Draggeble() {
  const dispatch = useDispatch();
  const { byId: layersById } = useSelector(selectLayers);

  const canvasScale = useSelector(selectCanvasScale);

  // 拖拽相关数据
  const isDraging = useSelector(selectIsDraging);
  const dragId = useSelector(selectDragId);
  const dragStartMouseCoordinate = useSelector(selectDragStartMouseCoordinate);
  const dragStartLayersCoordinate = useSelector(selectDragStartLayersCoordinate);

  // 旋转相关数据
  const isRotating = useSelector(selectIsRotating);
  const rotateId = useSelector(selectRotateId);
  const rotateStartMouseAngle = useSelector(selectRotateStartMouseAngle);
  const rotateCenterCoordinate = useSelector(selectRotateCenterCoordinate);
  const rotateStartLayersRotation = useSelector(selectRotateStartLayersRotation);

  // 拖拽缩放相关
  const isDragZooming = useSelector(selectIsDragZooming);
  const dragZoomId = useSelector(selectDragZoomId);
  const dragZoomDirection = useSelector(selectDragZoomDirection);
  const dragZoomStartMouseCoordinate = useSelector(selectDragZoomStartMouseCoordinate);
  const dragZoomStartLayersPosition = useSelector(selectDragZoomStartLayersPosition);

  // 判断拖拽方向
  const hasN = dragZoomDirection.find((d) => d === 'n');
  const hasS = dragZoomDirection.find((d) => d === 's');
  const hasW = dragZoomDirection.find((d) => d === 'w');
  const hasE = dragZoomDirection.find((d) => d === 'e');

  return (
    <div
      className={styles.editorPageWrapper}
      onMouseMove={(e) => {
        const { clientX, clientY } = e;

        // 处理拖拽逻辑
        if (isDraging) {
          const { x, y } = dragStartMouseCoordinate;

          // 需要将画布放大比例考虑进来
          const offsetX = (clientX - x) / canvasScale;
          const offsetY = (clientY - y) / canvasScale;

          dispatch(
            setLayersCoordinate({
              dragId,
              idWithCoordinate: dragStartLayersCoordinate.map((idWithCoordinate) => {
                const { id, x, y } = idWithCoordinate;
                const parentLayerId = layersById[id].parent;

                // 对于子图层，需要考虑父图层的旋转角度
                if (parentLayerId) {
                  const { rotation } = layersById[parentLayerId].properties;
                  const newOffsetX =
                    offsetX * Math.cos((rotation / 180) * Math.PI) + offsetY * Math.sin((rotation / 180) * Math.PI);
                  const newOffsetY =
                    -offsetX * Math.sin((rotation / 180) * Math.PI) + offsetY * Math.cos((rotation / 180) * Math.PI);

                  return { id, x: x + newOffsetX, y: y + newOffsetY };
                }

                return { id, x: x + offsetX, y: y + offsetY };
              }),
            }),
          );
        }

        // 处理旋转逻辑
        if (isRotating) {
          dispatch(
            setLayersRotation({
              rotateId,
              idWithRotation: rotateStartLayersRotation.map((idWithRotation) => {
                const { id, rotation } = idWithRotation;
                const rotateEndMouseAngle =
                  R2D * Math.atan2(clientY - rotateCenterCoordinate.y, clientX - rotateCenterCoordinate.x);
                const angle = rotateEndMouseAngle - rotateStartMouseAngle;
                const newRotation = transfromAngle(Math.round(rotation + angle));

                return { id, rotation: newRotation };
              }),
            }),
          );
        }

        // 处理拖拽缩放逻辑
        if (isDragZooming) {
          const { x, y } = dragZoomStartMouseCoordinate;

          // 鼠标移动距离
          const moveX = clientX - x;
          const moveY = clientY - y;

          // 各个属性的变化值
          let changeX = 0;
          let changeY = 0;
          let changeWidth = 0;
          let changeHeight = 0;

          dispatch(
            setLayersBaseProperties({
              actionId: dragZoomId,
              layers: dragZoomStartLayersPosition.map((position) => {
                const { rotation } = position;
                let { x, y, width, height } = position;

                // TODO: 将 rotation 考虑进来
                if (hasN) {
                  changeY = moveY;
                  changeHeight = -moveY;
                }

                if (hasS) {
                  changeHeight = moveY;
                }

                if (hasW) {
                  changeX = moveX;
                  changeWidth = -moveX;
                }

                if (hasE) {
                  changeWidth = moveX;
                }

                x = x + changeX / canvasScale;
                y = y + changeY / canvasScale;
                width = width + changeWidth / canvasScale;
                height = height + changeHeight / canvasScale;

                return {
                  id: position.id,
                  newProperties: {
                    x,
                    y,
                    width,
                    height,
                    rotation,
                  },
                };
              }),
            }),
          );
        }
      }}
      onMouseUp={() => {
        // 取消拖拽状态
        dispatch(setIsDraging(false));

        // 取消旋转状态
        dispatch(setIsRotating(false));

        // 取消拖拽缩放状态
        dispatch(setIsDragZooming(false));
      }}
    >
      <TopBar />
      <main className={styles.mainContainer}>
        <Screen />
        <BasicWidgets />
        <LeftPanel />
        <MainContent />
        <PropertyPanel />
      </main>
    </div>
  );
}

export default Draggeble;
