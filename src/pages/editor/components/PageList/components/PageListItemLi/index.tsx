import React, { useCallback, useMemo, useState } from 'react';
import { Tooltip, Modal } from 'antd';
import { ReactComponent as PageSvg } from 'src/assets/svg/page.svg';
import { ReactComponent as EllipsisSvg } from 'src/assets/svg/ellipsis.svg';
import { ReactComponent as CircleSvg } from 'src/assets/svg/circle.svg';
import MenuList from 'src/components/MenuList';
import styles from './index.module.scss';
interface PageListItemLiProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const ACTIVE_COLOR = 'rgb(41, 141, 248)';
const ACTIVE_BG_COLOR = 'rgb(242, 248, 255)';
const HOVER_BG_COLOR = 'rgb(247, 247, 247)';

const circleSvgStyle: React.CSSProperties = {
  position: 'absolute',
  right: 17,
  width: 6,
  height: 6,
  fill: 'currentcolor',
};

const overlayInnerStyle = {
  padding: 0,
};

const pageNameStyle: React.CSSProperties = {
  color: 'red',
  marginLeft: 6,
  marginRight: 6,
};

const PageListItemLi = ({ text, isActive, onClick, onDelete }: PageListItemLiProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const pageListItemLiClassName = useMemo(() => {
    if (isActive) {
      return `${styles.pageListItemLi} ${styles.active}`;
    } else {
      return `${styles.pageListItemLi}`;
    }
  }, [isActive]);
  const pageListItemLiStyle = useMemo(() => {
    return {
      background: `${isActive ? ACTIVE_BG_COLOR : tooltipVisible ? HOVER_BG_COLOR : ''}`,
    };
  }, [isActive, tooltipVisible]);
  const handleVisibleChange = useCallback((visible) => {
    setTooltipVisible(visible);
  }, []);

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      Modal.confirm({
        mask: false,
        title: (
          <div>
            确定删除页面<span style={pageNameStyle}>{text}</span>？
          </div>
        ),
        okText: '确定',
        onOk: () => {
          onDelete();
        },
        cancelText: '取消',
      });
      e.stopPropagation();
    },
    [text, onDelete],
  );

  const menuList = useMemo(() => {
    return [
      {
        text: '删除',
        onClick: handleDelete,
      },
    ];
  }, [handleDelete]);

  return useMemo(() => {
    return (
      <li className={pageListItemLiClassName} onClick={onClick} style={pageListItemLiStyle}>
        <div className={styles.pageName}>
          <div className={styles.pageListItemLiIcon}>
            <PageSvg />
          </div>
          <div className={styles.editableDiv}>{text}</div>
          <Tooltip
            color={'white'}
            title={<MenuList menuList={menuList} />}
            placement="rightTop"
            overlayInnerStyle={overlayInnerStyle}
            onVisibleChange={handleVisibleChange}
          >
            <div
              className={styles.actions}
              style={{
                display: `${tooltipVisible ? 'flex' : ''}`,
                color: `${tooltipVisible ? ACTIVE_COLOR : ''}`,
              }}
            >
              <EllipsisSvg />
            </div>
          </Tooltip>

          {isActive && !tooltipVisible ? <CircleSvg style={circleSvgStyle} /> : null}
        </div>
      </li>
    );
  }, [
    isActive,
    onClick,
    text,
    tooltipVisible,
    handleVisibleChange,
    pageListItemLiClassName,
    pageListItemLiStyle,
    menuList,
  ]);
};

export default PageListItemLi;
