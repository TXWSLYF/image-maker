import React, { useMemo } from 'react';
import Tooltip from 'src/components/Tooltip';
import { ReactComponent as PageSvg } from 'src/assets/svg/page.svg';
import { ReactComponent as EllipsisSvg } from 'src/assets/svg/ellipsis.svg';
import { ReactComponent as CircleSvg } from 'src/assets/svg/circle.svg';
import styles from './index.module.scss';

const circleSvgStyle: React.CSSProperties = {
  position: 'absolute',
  right: 17,
  width: 6,
  height: 6,
  fill: 'currentcolor',
};

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
          <div className={styles.editableDiv}>{text}</div>
          <Tooltip
            title="1"
            placement="rightTop"
            align={{ offset: [-10, 0] }}
            onVisibleChange={(visible) => {
              // TODO:
            }}
          >
            <div className={styles.actions}>
              <EllipsisSvg />
            </div>
          </Tooltip>

          {isActive ? <CircleSvg style={circleSvgStyle} /> : null}
        </div>
      </li>
    );
  }, [isActive, onClick, text]);
};

export default PageListItemLi;
