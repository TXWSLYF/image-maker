import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditingTextLayerId, setEditingTextLayerId } from 'src/features/editor/editorSlice';
import LayerWrapper from '../LayerWrapper';
import styles from './index.module.scss';

function TextLayer({ layer }: { layer: ITextLayer }) {
  const dispatch = useDispatch();
  const {
    properties: { fontSize, text, fontFamily, color },
  } = layer;
  const editingTextLayerId = useSelector(selectEditingTextLayerId);

  const handleDoubleClick = useCallback(() => {
    dispatch(setEditingTextLayerId(layer.id));
  }, [dispatch, layer.id]);

  return (
    <LayerWrapper layer={layer}>
      <div
        className={styles.richTextContainer}
        onDoubleClick={handleDoubleClick}
        style={{
          fontSize,
          fontFamily,
          lineHeight: `${fontSize}px`,
          color,
          display: editingTextLayerId === layer.id ? 'none' : 'inline',
        }}
      >
        <div className={styles.richText} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </LayerWrapper>
  );
}

export default TextLayer;
