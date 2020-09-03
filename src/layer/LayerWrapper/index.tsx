import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import {
  setCurLayers,
  setIsDraging,
  setDragStartMouseCoordinate,
  selectCurLayerIds,
  setDragStartLayersCoordinate,
} from '../../features/editor/editorSlice';
import { selectLayers } from '../../features/project/projectSlice';

/**
 * @description HOC，所有图层的 wrapper
 */
function LayerWrapper(props: { children: ReactElement; layer: ILayer }) {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);

  const {
    id,
    properties: { width, height, x, y, rotation },
  } = props.layer;

  return (
    <div
      onMouseDown={(e) => {
        dispatch(setCurLayers(id));
        dispatch(setIsDraging(true));
        dispatch(setDragStartMouseCoordinate({ x: e.clientX, y: e.clientY }));

        const dragStartLayersCoordinate: IEditorState['dragStartLayersCoordinate'] = [];

        [...curLayerIds, id].forEach((id) => {
          const { x, y } = layers.byId[id].properties;
          dragStartLayersCoordinate.push({ id, x, y });
        });

        dispatch(setDragStartLayersCoordinate(dragStartLayersCoordinate));
      }}
      className={styles.layerWrapper}
      style={{
        width,
        height,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      }}
    >
      {props.children}
    </div>
  );
}

export default LayerWrapper;
