import React, { useMemo } from 'react';
import { ReactComponent as DropDownArrow } from 'src/assets/svg/dropDownArrow.svg';
import styles from './index.module.scss';

interface TopBarIconProps {
  text: string;
  SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  svgStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  showDropDownArrow?: boolean;
  disabled?: boolean;
}

const svgDefaultStyle: React.CSSProperties = { width: 16, height: 16, marginTop: -2 };
const dropDownArrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  right: 4,
  width: 6,
  height: 4,
};

const TopBarIcon = (props: TopBarIconProps) => {
  return useMemo(() => {
    const {
      text,
      SvgComponent,
      svgStyle = svgDefaultStyle,
      style,
      showDropDownArrow = false,
      disabled = false,
      onClick,
    } = props;

    return (
      <div className={`${styles.topBarIcon} ${disabled ? styles.disabled : ''}`} style={style} onClick={onClick}>
        <div className={styles.topBarIconWrapper}>
          <SvgComponent style={svgStyle} />
        </div>

        {showDropDownArrow ? <DropDownArrow style={dropDownArrowStyle} /> : null}

        <span className={styles.tip}>{text}</span>
      </div>
    );
  }, [props]);
};

export default TopBarIcon;
