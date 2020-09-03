import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import TopBar from '../TopBar';
import PageList from '../PageList';
import EditArea from '../EditorArea';
import PropertyPanel from '../PropertyPanel';
import { setLayersCoordinate } from '../../../../features/project/projectSlice';
import {
  selectIsDraging,
  setIsDraging,
  selectDragStartMouseCoordinate,
  selectDragStartLayersCoordinate,
} from '../../../../features/editor/editorSlice';

function Draggeble() {
  const dispatch = useDispatch();
  const isDraging = useSelector(selectIsDraging);
  const { x, y } = useSelector(selectDragStartMouseCoordinate);
  const dragStartLayersCoordinate = useSelector(
    selectDragStartLayersCoordinate
  );

  return (
    <div
      className={styles.editorPageWrapper}
      onMouseMove={(e) => {
        if (isDraging) {
          const offsetX = e.clientX - x;
          const offsetY = e.clientY - y;

          dispatch(
            setLayersCoordinate(
              dragStartLayersCoordinate.map((idWithCoordinate) => {
                const { id, x, y } = idWithCoordinate;
                return { id, x: x + offsetX, y: y + offsetY };
              })
            )
          );
        }
      }}
      onMouseUp={(e) => {
        dispatch(setIsDraging(false));
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
