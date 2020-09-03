import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectInfo } from '../../api/project';
import styles from './index.module.scss';
import Draggable from './components/Draggable';
import { initProject } from '../../features/project/projectSlice';
import { setCurImage } from '../../features/editor/editorSlice';

function EditorPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectInfo(id);
        const {
          data: { data },
        } = res;
        const {
          images: { allIds },
        } = data;
        // 初始化 project 数据
        dispatch(initProject(data));

        // 设置当前选中图片
        dispatch(setCurImage(allIds[0]));
      } catch (error) {
        console.error(error.message);
      }
    })();
  });

  return (
    <div className={styles.editorPage}>
      <Draggable />
    </div>
  );
}

export default EditorPage;
