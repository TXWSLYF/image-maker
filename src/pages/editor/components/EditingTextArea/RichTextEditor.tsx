import React, { useCallback, useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setLayerProperties } from 'src/features/project/projectUndoableSlice';
import styles from './index.module.scss';

const RichTextEditor = ({ text, layerId }: { text: string; layerId: IBaseLayer['id'] }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    ref.current && ref.current.focus();
    const current = ref.current;

    return () => {
      if (current) {
        dispatch(setLayerProperties({ layerId, newProperties: { text: current.innerHTML } }));
      }
    };
  }, [dispatch, layerId]);

  return useMemo(() => {
    return (
      <div
        contentEditable
        className={styles.richTextEditor}
        ref={ref}
        onMouseDown={handleMouseDown}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }, [handleMouseDown, text]);
};

export default RichTextEditor;
