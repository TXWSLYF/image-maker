import React, { FC, memo } from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';

const DEFAULT_BACKGROUND_COLOR = '#1f292e';
const defaultOverlayInnerStyle = {
  fontSize: 12,
  lineHeight: '18px',
  padding: '3px 7px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.9,
  minHeight: 0,
};

const Tooltip: FC<TooltipPropsWithTitle> = memo((props) => {
  return (
    <AntdTooltip
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      color={DEFAULT_BACKGROUND_COLOR}
      overlayInnerStyle={defaultOverlayInnerStyle}
      {...props}
    ></AntdTooltip>
  );
});

export default Tooltip;
