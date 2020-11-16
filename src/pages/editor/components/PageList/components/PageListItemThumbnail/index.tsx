import React, { useMemo } from 'react';
import styles from './index.module.scss';

const PageListItemThumbnail = () => {
  return useMemo(() => {
    return <div className={styles.pageListItemThumbnail}></div>;
  }, []);
};

export default PageListItemThumbnail;
