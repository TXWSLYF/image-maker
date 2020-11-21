import React, { useMemo } from 'react';
import {} from 'src/features/editor/editorSlice';
import ScrollBar from './components/ScrollBar';
import styles from './index.module.scss';

const MainContent = () => {
  return useMemo(() => {
    return (
      <main className={styles.mainContent}>
        <ScrollBar />
      </main>
    );
  }, []);
};

export default MainContent;
