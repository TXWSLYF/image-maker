import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import {
  selectCurLayerIds,
  setIsDraging,
  setDragStartMouseCoordinate,
  setDragStartLayersCoordinate,
  setDragId,
} from 'src/features/editor/editorSlice';
import { selectLayers } from 'src/features/project/projectSlice';
import { guid } from 'src/utils/util';

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
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const layers = useSelector(selectLayers);

  const curLayers = curLayerIds.map((id) => {
    return layers.byId[id];
  });

  // 单一选中组件的情况
  if (curLayers.length === 1) {
    const [layer] = curLayers;
    const coordinates = caculateRectRotateCoordinate(layer.properties);
    const { x, y, width, height, rotation } = layer.properties;

    return (
      <div className={styles.moveableControlBox}>
        {coordinates.map(({ x, y }, index) => {
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
        })}
        <div
          className={styles.moveableArae}
          style={{
            width,
            height,
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          }}
          onMouseDown={(e) => {
            dispatch(setIsDraging(true));
            dispatch(
              setDragStartMouseCoordinate({ x: e.clientX, y: e.clientY })
            );
            dispatch(setDragId(guid()));
            dispatch(
              setDragStartLayersCoordinate(
                curLayers.map((layer) => {
                  const {
                    id,
                    properties: { x, y },
                  } = layer;

                  return { id, x, y };
                })
              )
            );
            e.stopPropagation();
          }}
        ></div>
      </div>
    );
  } else {
    return (
      <div className={styles.moveableControlBox}>
        <div className={styles.moveableArae}></div>
      </div>
    );
  }
}

export default MoveableControlBox;
