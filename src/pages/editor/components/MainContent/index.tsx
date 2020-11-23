import React, { useMemo } from 'react';
import Ruler from './components/Ruler';
import ScrollBar from './components/ScrollBar';
import styles from './index.module.scss';

const MainContent = () => {
  return useMemo(() => {
    return (
      <main className={styles.mainContent}>
        <ScrollBar />
        <Ruler />
      </main>
    );
  }, []);
};

export default MainContent;
