import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLayersBaseProperties, setLayersCoordinate, setLayersRotation } from 'src/features/project/projectSlice';
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
import transfromAngle from 'src/utils/transformAngle';
import { R2D } from 'src/common/constants';
import styles from './index.module.scss';
import TopBar from '../TopBar';
import PageList from '../PageList';
import EditArea from '../EditorArea';
import PropertyPanel from '../PropertyPanel';

function Draggeble() {
  const dispatch = useDispatch();

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

  return (
    <div
      className={styles.editorPageWrapper}
      onMouseMove={(e) => {
        const { clientX, clientY } = e;

        // 处理拖拽逻辑
        if (isDraging) {
          const { x, y } = dragStartMouseCoordinate;
          const offsetX = clientX - x;
          const offsetY = clientY - y;

          dispatch(
            setLayersCoordinate({
              dragId,
              idWithCoordinate: dragStartLayersCoordinate.map((idWithCoordinate) => {
                const { id, x, y } = idWithCoordinate;
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
          let moveX = 0;
          let moveY = 0;

          if (
            dragZoomDirection.find((d) => {
              return d === 'n' || d === 's';
            })
          ) {
            moveY = clientY - y;
          }

          if (
            dragZoomDirection.find((d) => {
              return d === 'w' || d === 'e';
            })
          ) {
            moveX = clientX - x;
          }

          dispatch(
            setLayersBaseProperties({
              actionId: dragZoomId,
              layers: dragZoomStartLayersPosition.map((position) => {
                let { x, y, width, height, rotation } = position;

                width = width + moveX;
                height = height + moveY;

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
        <PageList />
        <EditArea />
        <PropertyPanel />
      </main>
    </div>
  );
}

export default Draggeble;
