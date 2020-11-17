import React, { useMemo } from 'react';
import { ReactComponent as PageSvg } from 'src/assets/svg/page.svg';
import styles from './index.module.scss';

interface PageListItemLiProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
}

const PageListItemLi = ({ isActive, onClick, text }: PageListItemLiProps) => {
  return useMemo(() => {
    return (
      <li className={`${styles.pageListItemLi} ${isActive ? styles.active : ''}`} onClick={onClick}>
        <div className={styles.pageName}>
          <div className={styles.pageListItemLiIcon}>
            <PageSvg />
          </div>
          <span className={styles.editableDiv}>{text}</span>
        </div>
      </li>
    );
  }, [isActive, onClick, text]);
};

export default PageListItemLi;
