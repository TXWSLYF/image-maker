import React, { useEffect } from 'react';
import TopBar from './components/TopBar/index';
import { useDispatch } from 'react-redux';
import { getProjectInfo } from '../../api/project';
import { initProject } from '../../features/project/projectSlice';
import { useParams } from 'react-router-dom';

function Editor() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectInfo(id);
        dispatch(initProject(res.data.data));
      } catch (error) {
        console.error(error.message);
      }
    })();
  });

  return (
    <div>
      <TopBar />
    </div>
  );
}

export default Editor;
