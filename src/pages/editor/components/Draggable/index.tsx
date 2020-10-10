import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLayersCoordinate, setLayersRotation } from 'src/features/project/projectSlice';
import {
  setIsDraging,
  setIsRotating,
  selectIsDraging,
  selectDragStartMouseCoordinate,
  selectDragStartLayersCoordinate,
  selectDragId,
  selectIsRotating,
  selectRotateId,
  selectRotateStartMouseCoordinate,
  selectRotateStartLayersRotation,
  selectRotateCenterCoordinate,
} from 'src/features/editor/editorSlice';
import calcTriangleAngle from 'src/utils/calcTriangleAngle';
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
  const rotateStartMouseCoordinate = useSelector(selectRotateStartMouseCoordinate);
  const rotateCenterCoordinate = useSelector(selectRotateCenterCoordinate);
  const rotateStartLayersRotation = useSelector(selectRotateStartLayersRotation);

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
                const angle = calcTriangleAngle(rotateCenterCoordinate, rotateStartMouseCoordinate, {
                  x: clientX,
                  y: clientY,
                });

                return { id, rotation: rotation + angle };
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
