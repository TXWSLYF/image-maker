import React from 'react';
import styles from './index.module.scss';

export interface MenuListItemProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface MenuListProps {
  menuList: MenuListItemProps[];
}

const MenuList = React.memo((props: MenuListProps) => {
  return (
    <div className={styles.menuList}>
      {props.menuList.map((item) => {
        const { text, onClick } = item;

        return (
          <div className={styles.menuListItem} onClick={onClick} key={text}>
            {text}
          </div>
        );
      })}
    </div>
  );
});

export default MenuList;
