import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { selectCurLayerIds } from '../../../../features/editor/editorSlice';
import { selectLayers } from '../../../../features/project/projectSlice';

function caculateRectRotateCoordinate({
  x,
  y,
  width,
  height,
  rotation,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}) {
  // 计算旋转基准点
  const rotateOrigin: ICoordinate = {
    x: x + width / 2,
    y: y + height / 2,
  };

  const _caculateRectRotateCoordinate = (coordinate: ICoordinate) => {
    return {
      x:
        (coordinate.x - rotateOrigin.x) * Math.cos((rotation * Math.PI) / 180) -
        (coordinate.y - rotateOrigin.y) * Math.sin((rotation * Math.PI) / 180) +
        rotateOrigin.x,
      y:
        (coordinate.x - rotateOrigin.x) * Math.sin((rotation * Math.PI) / 180) +
        (coordinate.y - rotateOrigin.y) * Math.cos((rotation * Math.PI) / 180) +
        rotateOrigin.y,
    };
  };

  // 左上角
  const coordinateOriginLeftTop: ICoordinate = {
    x,
    y,
  };

  // 右上角
  const coordinateOriginRightTop: ICoordinate = {
    x: x + width,
    y,
  };

  // 左下角
  const coordinateOriginLeftBottom: ICoordinate = {
    x,
    y: y + height,
  };

  // 右下角
  const coordinateOriginRightBottom: ICoordinate = {
    x: x + width,
    y: y + height,
  };

  return [
    _caculateRectRotateCoordinate(coordinateOriginLeftTop),
    _caculateRectRotateCoordinate(coordinateOriginRightTop),
    _caculateRectRotateCoordinate(coordinateOriginLeftBottom),
    _caculateRectRotateCoordinate(coordinateOriginRightBottom),
  ];
}

// 移动控制点大小
const moveableDirectionSize = 14;

function MoveableControlBox() {
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);

  const curLayers = curLayerIds.map((id) => {
    return layers.byId[id];
  });

  return (
    <div className={styles.moveableControlBox}>
      {curLayers.map((layer) => {
        const coordinates = caculateRectRotateCoordinate(layer.properties);

        return coordinates.map(({ x, y }, index) => {
          return (
            <div
              key={index}
              className={styles.point}
              style={{
                transform: `translate(${x - moveableDirectionSize / 2}px, ${
                  y - moveableDirectionSize / 2
                }px)`,
                width: moveableDirectionSize,
                height: moveableDirectionSize,
              }}
            ></div>
          );
        });
      })}
    </div>
  );
}

export default MoveableControlBox;
