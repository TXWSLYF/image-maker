import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurImageId } from 'src/features/editor/editorSlice';
import { addLayer } from 'src/features/project/projectSlice';
import { imgLayer, textLayer } from 'src/layer';
import { ReactComponent as TextSvg } from 'src/assets/svg/text.svg';
import { ReactComponent as PictureSvg } from 'src/assets/svg/picture.svg';
import styles from './index.module.scss';

const basicWidgets = [
  {
    name: '文字',
    initialClass: textLayer,
    SvgComponent: TextSvg,
    hotkey: 'T',
  },
  {
    name: '图片',
    initialClass: imgLayer,
    SvgComponent: PictureSvg,
  },
];

const BasicWidgets = () => {
  const dispatch = useDispatch();
  const curImageId = useSelector(selectCurImageId);
  const handleAddLayer = useCallback(
    (initialClass) => {
      dispatch(addLayer({ imageId: curImageId, layer: initialClass() }));
    },
    [dispatch, curImageId],
  );

  return useMemo(() => {
    return (
      <div className={styles.basicWidgets}>
        <ul>
          {basicWidgets.map((basicWidget) => {
            const { name, initialClass, SvgComponent } = basicWidget;

            return (
              <li
                key={name}
                onClick={() => {
                  handleAddLayer(initialClass);
                }}
              >
                <SvgComponent />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [handleAddLayer]);
};

export default BasicWidgets;
