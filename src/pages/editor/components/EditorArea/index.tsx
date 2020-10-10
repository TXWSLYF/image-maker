import React, { useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { selectCanvas, selectImages, selectLayers } from 'src/features/project/projectSlice';
import { selectCurImageId, setCurLayers, setEditorCanvasCoordinate } from 'src/features/editor/editorSlice';
import { Layer } from 'src/layer';
import FakeCanvas from '../FakeCanvas';

function EditorArea() {
  const canvas = useSelector(selectCanvas);
  const curImageId = useSelector(selectCurImageId);
  const images = useSelector(selectImages);
  const layers = useSelector(selectLayers);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateEditorCanvasCoordinate = () => {
      const { current } = ref;
      if (current) {
        const { x, y } = current.getBoundingClientRect();
        dispatch(setEditorCanvasCoordinate({ x, y }));
      }
    };

    window.addEventListener('resize', updateEditorCanvasCoordinate);
    updateEditorCanvasCoordinate();

    return () => window.removeEventListener('resize', updateEditorCanvasCoordinate);
  }, [dispatch, ref, canvas]);

  return (
    <div
      className={styles.editorArea}
      onMouseDown={() => {
        dispatch(setCurLayers([]));
      }}
    >
      <div
        id="editorCanvas"
        ref={ref}
        className={styles.canvas}
        style={{
          width: canvas.width,
          height: canvas.height,
        }}
      >
        {curImageId && images.byId[curImageId]
          ? images.byId[curImageId].layers.map((id) => <Layer layer={layers.byId[id]} key={id} />)
          : null}
      </div>
      <FakeCanvas />
    </div>
  );
}

export default EditorArea;
