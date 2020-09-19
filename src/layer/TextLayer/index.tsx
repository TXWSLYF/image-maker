import React from 'react';
import LayerWrapper from '../LayerWrapper';

function TextLayer(props: { layer: ITextLayer }) {
  const {
    properties: { fontSize, text, fontFamily, color },
  } = props.layer;

  return (
    <LayerWrapper layer={props.layer}>
      <div style={{ fontSize, fontFamily, lineHeight: `${fontSize}px`, color }}>{text}</div>
    </LayerWrapper>
  );
}

export default TextLayer;
