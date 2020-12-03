import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLayers } from 'src/features/project/projectUndoableSlice';
import LayerWrapper from '../LayerWrapper';
import Layer from '../Layer';

interface GroupLayerProps {
  layer: IGroupLayer;
}

const GroupLayer = ({ layer }: GroupLayerProps) => {
  const layers = useSelector(selectLayers);
  const { children } = layer.properties;

  return useMemo(() => {
    return (
      <LayerWrapper layer={layer}>
        {children.map((layerId) => {
          return <Layer layer={layers.byId[layerId]} key={layerId} />;
        })}
      </LayerWrapper>
    );
  }, [children, layer, layers.byId]);
};

export default GroupLayer;
