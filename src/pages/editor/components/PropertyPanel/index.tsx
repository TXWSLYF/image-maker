import React from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { selectCurLayerIds } from 'src/features/editor/editorSlice';
import { selectLayers } from 'src/features/project/projectSlice';
import PagePropertyPanel from './PagePropertyPanel';
import BasePropertyPanel from './BasePropertyPanel';
import TextPropertyPanel from './TextPropertyPanel';
import ImgPropertyPanel from './ImgPropertyPanel';

function PropertyPanel() {
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);
  const curLayers = curLayerIds.map((id) => layers.byId[id]);

  return (
    <div className={styles.propertyPanel}>
      {(() => {
        switch (curLayers.length) {
          case 0:
            return <PagePropertyPanel />;
          case 1:
            const [layer] = curLayers;
            return (
              <div>
                <BasePropertyPanel
                  properties={layer.properties}
                  layerId={layer.id}
                />
                {(() => {
                  switch (layer.type) {
                    case 'TEXT':
                      return <TextPropertyPanel
                        properties={layer.properties}
                        layerId={layer.id}
                      />;
                    case 'IMG':
                      return <ImgPropertyPanel />;
                    default:
                      return <div>TODO</div>;
                  }
                })()}
              </div>
            );
          default:
            return <div>多选TODO</div>;
        }
      })()}
    </div>
  );
}

export default PropertyPanel;
