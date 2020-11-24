import React, { useEffect, useMemo, useRef } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurLayerIds, setPropertyPanelWidth } from 'src/features/editor/editorSlice';
import { selectLayers } from 'src/features/project/projectSlice';
import PagePropertyPanel from './PagePropertyPanel';
import BasePropertyPanel from './BasePropertyPanel';
import TextPropertyPanel from './TextPropertyPanel';
import ImgPropertyPanel from './ImgPropertyPanel';

function PropertyPanel() {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);
  const curLayers = curLayerIds.map((id) => layers.byId[id]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      dispatch(setPropertyPanelWidth(width));
    }
  }, [dispatch]);

  return useMemo(() => {
    return (
      <div className={styles.propertyPanel} ref={ref}>
        {(() => {
          switch (curLayers.length) {
            case 0:
              return <PagePropertyPanel />;
            case 1:
              const [layer] = curLayers;
              return (
                <div>
                  <BasePropertyPanel properties={layer.properties} layerId={layer.id} />
                  {(() => {
                    switch (layer.type) {
                      case 'TEXT':
                        return <TextPropertyPanel properties={layer.properties} layerId={layer.id} />;
                      case 'IMG':
                        return (
                          <ImgPropertyPanel properties={layer.properties} layerId={layer.id} dispatch={dispatch} />
                        );
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
  }, [curLayers, dispatch]);
}

export default PropertyPanel;
