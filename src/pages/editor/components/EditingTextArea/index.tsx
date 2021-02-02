import React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectEditingTextLayerId } from 'src/features/editor/editorSlice';
import { selectCanvasScale } from 'src/features/project/projectBasicSlice';
import { selectCanvas, selectLayers } from 'src/features/project/projectUndoableSlice';
import RichTextEditor from './RichTextEditor';
import styles from './index.module.scss';

const EditingTextArea = () => {
  const canvas = useSelector(selectCanvas);
  const canvasScale = useSelector(selectCanvasScale);
  const editingTextLayerId = useSelector(selectEditingTextLayerId);
  const { byId } = useSelector(selectLayers);

  const editingTextAreaStyle = useMemo(() => {
    return {
      width: canvas.width,
      height: canvas.height,
      transform: `scale(${canvasScale})`,
    };
  }, [canvas.height, canvas.width, canvasScale]);

  return useMemo(() => {
    if (!editingTextLayerId) return null;

    const layer = byId[editingTextLayerId];

    if (layer.type !== 'TEXT') return null;

    const { x, y, width, fontFamily, text, fontSize, color } = layer.properties;
    const style = {
      top: y,
      left: x,
      width,
      fontSize,
      fontFamily,
      lineHeight: `${fontSize}px`,
      color,
    };

    return (
      <div className={styles.editingTextArea} style={editingTextAreaStyle}>
        <div className={styles.richTextContainer} style={style}>
          <RichTextEditor text={text} layerId={editingTextLayerId} />
        </div>
      </div>
    );
  }, [editingTextLayerId, byId, editingTextAreaStyle]);
};

export default EditingTextArea;
