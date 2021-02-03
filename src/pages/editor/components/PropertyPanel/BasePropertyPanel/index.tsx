import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setLayerProperties } from 'src/features/project/projectUndoableSlice';
import transfromAngle from 'src/utils/transformAngle';
import MyInputNumber from 'src/components/MyInputNumber';
import PropertyPanelHeader from '../PropertyPanelHeader';
import styles from './index.module.scss';

export interface BasePropertyPanelProps {
  properties: IBaseProperties;
  layerId: string;
}

const BasePropertyPanel = ({ properties, layerId }: BasePropertyPanelProps) => {
  const dispatch = useDispatch();

  const handleBasePropertyChange = useCallback(
    (layerId: IBaseLayer['id'], newProperties) => {
      dispatch(
        setLayerProperties({
          layerId,
          newProperties,
        }),
      );
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.basePropertyPanel}>
        <PropertyPanelHeader text={'基础'} />
        <div className={styles.basePropertyPanelContent}>
          <div className={styles.flexBox} style={{ marginBottom: 10 }}>
            <MyInputNumber
              value={properties.x}
              width={85}
              text="X"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { x: value });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { x: value });
              }}
            />

            <MyInputNumber
              value={properties.y}
              width={85}
              text="Y"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { y: value });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { y: value });
              }}
            />
          </div>

          <div className={styles.flexBox} style={{ marginBottom: 10 }}>
            <MyInputNumber
              value={properties.width}
              width={85}
              text="W"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { width: value });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { width: value });
              }}
            />

            <MyInputNumber
              value={properties.height}
              width={85}
              text="H"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { height: value });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { height: value });
              }}
            />
          </div>

          <div className={styles.flexBox} style={{ marginBottom: 10 }}>
            <MyInputNumber
              value={properties.rotation}
              width={85}
              text="°"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { rotation: transfromAngle(Number(value)) });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { rotation: transfromAngle(Number(value)) });
              }}
            />

            <MyInputNumber
              value={properties.opacity}
              width={85}
              text="Y"
              onPressEnter={(value) => {
                handleBasePropertyChange(layerId, { opacity: value });
              }}
              onBlur={(value) => {
                handleBasePropertyChange(layerId, { opacity: value });
              }}
            />
          </div>
        </div>
      </div>
    );
  }, [
    handleBasePropertyChange,
    layerId,
    properties.height,
    properties.opacity,
    properties.rotation,
    properties.width,
    properties.x,
    properties.y,
  ]);
};

export default BasePropertyPanel;
