import React from 'react';
import TextLayer from '../TextLayer/index';
import ImageLayer from '../ImageLayer/index';

function Layer(props: { layer: ILayer }) {
  if (props.layer.type === 'TEXT') {
    return <TextLayer layer={props.layer} />;
  } else if (props.layer.type === 'IMG') {
    return <ImageLayer layer={props.layer} />;
  } else {
    return null;
  }
}

export default Layer;
