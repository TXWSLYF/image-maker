import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import ChromeColorPicker from 'src/components/ChromeColorPicker';
import NumericInputNumber from 'src/components/NumericInputNumber';
import { setLayersColor, setLayerProperties } from 'src/features/project/projectUndoableSlice';
import PropertyPanelHeader from '../components/PropertyPanelHeader';
import PropertyRow from '../PropertyRow';
import styles from './index.module.scss';

export interface TextPropertyPanelProps {
  properties: ITextProperties;
  layerId: string;
}

const TextPropertyPanel = ({ properties, layerId }: TextPropertyPanelProps) => {
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
      <div className={styles.textPropertyPanel}>
        <PropertyPanelHeader text={'文本'} />
        <div className={styles.textPropertyPanelContent}>
          <PropertyRow
            style={{ marginBottom: 10 }}
            leftChild={
              <ChromeColorPicker
                color={properties.color}
                onChange={(colorResult) => {
                  dispatch(
                    setLayersColor({
                      layerIds: [layerId],
                      newColor: colorResult.hex,
                    }),
                  );
                }}
              />
            }
            leftLabelText="颜色"
            rightChild={
              <NumericInputNumber
                style={{ width: 70 }}
                value={properties.fontSize}
                onPressEnter={(value) => {
                  handleBasePropertyChange(layerId, { fontSize: value });
                }}
                onBlur={(value) => {
                  handleBasePropertyChange(layerId, { fontSize: value });
                }}
              />
            }
            rightLabelText="字号"
          />
        </div>
      </div>
    );
  }, [dispatch, handleBasePropertyChange, layerId, properties.color, properties.fontSize]);
};

export default TextPropertyPanel;
