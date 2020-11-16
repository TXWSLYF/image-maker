import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectImages } from 'src/features/project/projectSlice';
import { selectCurImageId, setCurImage, setCurLayers } from 'src/features/editor/editorSlice';
import PageListHeader from './components/PageListHeader';
import styles from './index.module.scss';

function PageList() {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const curImageId = useSelector(selectCurImageId);

  return useMemo(() => {
    return (
      <div className={styles.pageList}>
        <PageListHeader />
        {images.allIds.map((id) => {
          const image = images.byId[id];
          const { name } = image;

          return (
            <div
              onClick={() => {
                dispatch(setCurImage(id));
                dispatch(setCurLayers([]));
              }}
              className={styles.pageItem}
              style={{
                color: id === curImageId ? 'blue' : 'black',
                background: id === curImageId ? '#cecece' : '#fff',
              }}
              key={id}
            >
              {name}
            </div>
          );
        })}
      </div>
    );
  }, [images, curImageId, dispatch]);
}

export default PageList;
