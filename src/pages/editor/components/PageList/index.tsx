import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { difference } from 'lodash';
import { message } from 'antd';
import { deletePages, selectImages, selectPageAllIds } from 'src/features/project/projectSlice';
import { selectCurImageId, setCurImage, setCurLayers } from 'src/features/editor/editorSlice';
import PageListHeader from './components/PageListHeader';
import PageListItemLi from './components/PageListItemLi';
import styles from './index.module.scss';

function PageList() {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const pageAllIds = useSelector(selectPageAllIds);
  const curImageId = useSelector(selectCurImageId);

  // 选中页面逻辑
  const handleClickPageListItem = useCallback(
    (id) => {
      dispatch(setCurLayers([]));
      dispatch(setCurImage(id));
    },
    [dispatch],
  );

  // 删除页面逻辑
  const handleDeletePage = useCallback(
    (id) => {
      const unDeletedPageIds = difference(pageAllIds, [id]);
      if (unDeletedPageIds.length === 0) {
        message.error('不能删除全部页面');
        return;
      }

      dispatch(setCurImage(unDeletedPageIds[0]));
      dispatch(deletePages([id]));
    },
    [dispatch, pageAllIds],
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
                onDelete={() => {
                  handleDeletePage(id);
                }}
                text={name}
                isActive={id === curImageId}
              />
            );
          })}
        </ul>
      </div>
    );
  }, [images, curImageId, handleClickPageListItem, handleDeletePage]);
}

export default PageList;
