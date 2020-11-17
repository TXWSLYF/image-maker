import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectImages } from 'src/features/project/projectSlice';
import { selectCurImageId, setCurImage, setCurLayers } from 'src/features/editor/editorSlice';
import PageListHeader from './components/PageListHeader';
import PageListItemLi from './components/PageListItemLi';
import styles from './index.module.scss';

function PageList() {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const curImageId = useSelector(selectCurImageId);

  const handleClickPageListItem = useCallback(
    (id) => {
      dispatch(setCurImage(id));
      dispatch(setCurLayers([]));
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.pageList}>
        <PageListHeader />
        <ul>
          {images.allIds.map((id) => {
            const image = images.byId[id];
            const { name } = image;

            return (
              <PageListItemLi
                key={id}
                onClick={() => {
                  handleClickPageListItem(id);
                }}
                text={name}
                isActive={id === curImageId}
              />
            );
          })}
        </ul>
      </div>
    );
  }, [images, curImageId, handleClickPageListItem]);
}

export default PageList;
