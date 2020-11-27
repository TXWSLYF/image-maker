import React, { useMemo } from 'react';
import { ReactComponent as DropDownArrow } from 'src/assets/svg/dropDownArrow.svg';
import styles from './index.module.scss';

interface TopBarIconProps {
  text: string;
  iconElement: React.ReactElement;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  showDropDownArrow?: boolean;
  disabled?: boolean;
}

const dropDownArrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  right: 4,
  width: 6,
  height: 4,
};

const TopBarIcon = (props: TopBarIconProps) => {
  const { text, iconElement, style, showDropDownArrow = false, disabled = false, onClick } = props;

  return useMemo(() => {
    return (
      <div className={`${styles.topBarIcon} ${disabled ? styles.disabled : ''}`} style={style} onClick={onClick}>
        <div className={styles.topBarIconWrapper}>{iconElement}</div>

        {showDropDownArrow ? <DropDownArrow style={dropDownArrowStyle} /> : null}

        <span className={styles.tip}>{text}</span>
      </div>
    );
  }, [disabled, iconElement, onClick, showDropDownArrow, style, text]);
};

export default TopBarIcon;
