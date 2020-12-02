import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { deleteLayers, selectCanvas, selectImages, selectLayers } from 'src/features/project/projectUndoableSlice';
import {
  selectCurImageId,
  selectCurLayerIds,
  setCurLayers,
  setEditorCanvasCoordinate,
  setHoverLayerId,
} from 'src/features/editor/editorSlice';
import { Layer } from 'src/layer';
import styles from './index.module.scss';

function EditorArea() {
  const canvas = useSelector(selectCanvas);
  const curLayerIds = useSelector(selectCurLayerIds);
  const curImageId = useSelector(selectCurImageId);
  const images = useSelector(selectImages);
  const layers = useSelector(selectLayers);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(() => {
    if (curLayerIds.length === 0) return;

    // 重置 hoverLayerId
    dispatch(setHoverLayerId(''));

    // 重置当前选中图层 id
    dispatch(setCurLayers([]));

    // 删除当前选中图层数据
    dispatch(deleteLayers(curLayerIds));
  }, [curLayerIds, dispatch]);

  // fixed: 使用 useHotkeys 可以过滤掉输入框中按下的 backspace 事件
  useHotkeys(
    'backspace',
    () => {
      handleKeyDown();
    },
    {},
    [handleKeyDown],
  );

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
    <div className={styles.editorArea}>
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
    </div>
  );
}

export default EditorArea;
