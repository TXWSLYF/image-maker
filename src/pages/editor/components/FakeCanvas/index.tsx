import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurLayerIds,
  selectHoverLayerId,
} from "../../../../features/editor/editorSlice";
import {
  selectCanvas,
  selectLayers,
} from "../../../../features/project/projectSlice";
import styles from "./index.module.scss";

function curContainerRender(
  curLayerIds: string[],
  layersById: {
    [key: string]: ILayer;
  }
) {
  return (
    <div className={styles.curContainer}>
      {curLayerIds.map((curLayerId) => {
        const { width, height, x, y, rotation } = layersById[
          curLayerId
        ].properties;

        return (
          <div
            key={curLayerId}
            className={styles.curItem}
            style={{
              width,
              height,
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
            }}
          ></div>
        );
      })}
    </div>
  );
}

function hoverContainerRender(
  hoverLayerId: string,
  curLayerIds: string[],
  layersById: {
    [key: string]: ILayer;
  }
) {
  if (!hoverLayerId) return null;
  if (curLayerIds.findIndex((layerId) => layerId === hoverLayerId) !== -1)
    return null;

  const { width, height, x, y, rotation } = layersById[hoverLayerId].properties;

  return (
    <div className={styles.hoverContainer}>
      <div
        className={styles.hoverItem}
        style={{
          width,
          height,
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        }}
      ></div>
    </div>
  );
}

function FakeCanvas() {
  const canvas = useSelector(selectCanvas);
  const layers = useSelector(selectLayers);
  const curLayerIds = useSelector(selectCurLayerIds);
  const hoverLayerId = useSelector(selectHoverLayerId);

  return (
    <div
      className={styles.fakeCanvas}
      style={{
        width: canvas.width,
        height: canvas.height,
      }}
    >
      {curContainerRender(curLayerIds, layers.byId)}
      {hoverContainerRender(hoverLayerId, curLayerIds, layers.byId)}
    </div>
  );
}

export default FakeCanvas;
