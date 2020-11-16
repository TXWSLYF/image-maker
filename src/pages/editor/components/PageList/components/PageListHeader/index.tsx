import { Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { ReactComponent as AddSvg } from 'src/assets/svg/add.svg';
import styles from './index.module.scss';

const iconList = [
  {
    name: '页面',
    SvgIcon: AddSvg,
  },
];

const PageListHeader = () => {
  return useMemo(() => {
    return (
      <div className={styles.pageListHeader}>
        {iconList.map((icon) => {
          const { SvgIcon, name } = icon;

          return (
            <Tooltip key={name} title={name} placement="top" mouseEnterDelay={0} mouseLeaveDelay={0}>
              <SvgIcon />
            </Tooltip>
          );
        })}
      </div>
    );
  }, []);
};

export default PageListHeader;
