import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setLayerProperties } from 'src/features/project/projectUndoableSlice';
import transfromAngle from 'src/utils/transformAngle';
import NumericInputNumber from 'src/components/NumericInputNumber';
import PropertyPanelHeader from '../components/PropertyPanelHeader';
import PropertyRow from '../PropertyRow';
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
          <PropertyRow
            style={{ marginBottom: 10 }}
            leftChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.x}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { x: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { x: value });
                }}
              />
            }
            leftLabelText="横坐标"
            rightChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.y}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { y: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { y: value });
                }}
              />
            }
            rightLabelText="纵坐标"
          />
          <PropertyRow
            leftChild={
              <NumericInputNumber
                style={{ width: 70 }}
                // TODO: 数据不同步
                value={properties.rotation}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { rotation: transfromAngle(Number(value)) });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { rotation: transfromAngle(Number(value)) });
                }}
              />
            }
            leftLabelText="旋转角"
            rightChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.opacity}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { opacity: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { opacity: value });
                }}
              />
            }
            rightLabelText="透明度"
            style={{ marginBottom: 10 }}
          />

          <PropertyRow
            leftChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.width}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { width: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { width: value });
                }}
              />
            }
            leftLabelText="宽度"
            rightChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.height}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { height: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { height: value });
                }}
              />
            }
            rightLabelText="高度"
          />
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
