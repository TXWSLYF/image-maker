import React from 'react';
import LayerWrapper from '../LayerWrapper';

function TextLayer(props: { layer: ITextLayer }) {
  const {
    properties: { fontSize, text },
  } = props.layer;

  return (
    <LayerWrapper layer={props.layer}>
      <span style={{ fontSize }}>{text}</span>
    </LayerWrapper>
  );
}

export default TextLayer;
