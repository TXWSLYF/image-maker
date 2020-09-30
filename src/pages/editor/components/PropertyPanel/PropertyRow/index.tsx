import React, { ReactElement } from 'react';
import commonStyle from './index.module.scss';

function PropertyRow({
  leftChild,
  leftLabelText,
  rightChild,
  rightLabelText,
  style,
}: {
  leftChild: ReactElement;
  leftLabelText: string;
  rightChild: ReactElement;
  rightLabelText: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={commonStyle.propertyRow} style={style}>
      <div>
        <label>{leftLabelText}：</label>
        {leftChild}
      </div>
      <div>
        <label>{rightLabelText}：</label>
        {rightChild}
      </div>
    </div>
  );
}

export default PropertyRow;
