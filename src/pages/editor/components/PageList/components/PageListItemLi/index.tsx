import React, { useMemo } from 'react';
import styles from './index.module.scss';

const PageListItemLi = () => {
  return useMemo(() => {
    return <div className={styles.pageListItemLi}></div>;
  }, []);
};

export default PageListItemLi;
