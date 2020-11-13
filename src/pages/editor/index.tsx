import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initProject } from 'src/features/project/projectSlice';
import { setCurImage } from 'src/features/editor/editorSlice';
import projectApi from 'src/api/project';
import styles from './index.module.scss';
import Draggable from './components/Draggable';

function EditorPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const res = await projectApi.retrieve(Number(id));
        const {
          data: {
            data: { data },
          },
        } = res;
        const initProjectData: IProjectState = { id, ...JSON.parse(data) };
        const {
          images: { allIds },
        } = initProjectData;

        // 初始化 project 数据
        dispatch(initProject(initProjectData));

        // 设置当前选中图片
        dispatch(setCurImage(allIds[0]));
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [dispatch, id]);

  return (
    <div className={styles.editorPage}>
      <Draggable />
    </div>
  );
}

export default EditorPage;
