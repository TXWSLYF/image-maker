import React, { useMemo } from 'react';
import TextLayer from '../TextLayer/index';
import ImageLayer from '../ImageLayer/index';
import GroupLayer from '../GroupLayer/index';

interface LayerProps {
  layer: ILayer;
}

const Layer = ({ layer }: LayerProps) => {
  return useMemo(() => {
    switch (layer.type) {
      case 'TEXT': {
        return <TextLayer layer={layer} />;
      }

      case 'IMG': {
        return <ImageLayer layer={layer} />;
      }

      case 'GROUP': {
        return <GroupLayer layer={layer} />;
      }

      default: {
        return null;
      }
    }
  }, [layer]);
};

export default Layer;
