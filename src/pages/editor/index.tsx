import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { initProject } from 'src/features/project/projectSlice';
import { setCurImage } from 'src/features/editor/editorSlice';
import useRequest from 'src/common/hooks/useRequest';
import projectApi from 'src/api/project';
import styles from './index.module.scss';
import Draggable from './components/Draggable';

function EditorPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const fetcher = useCallback(() => {
    return projectApi.retrieve(Number(id));
  }, [id]);

  const { data, error } = useRequest(fetcher);

  function renderChild() {
    if (error) return <div>error</div>;
    if (!data)
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );

    const { id, name, data: data1 } = data.data.data;
    const initProjectData: IProjectState = { id, name, data: JSON.parse(data1) };

    const {
      data: { imageAllIds },
    } = initProjectData;

    // 初始化 project 数据
    dispatch(initProject(initProjectData));

    // 设置当前选中图片
    dispatch(setCurImage(imageAllIds[0]));

    return <Draggable />;
  }

  return <div className={styles.editorPage}>{renderChild()}</div>;
}

export default EditorPage;
