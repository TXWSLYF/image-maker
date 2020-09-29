import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurLayerIds,
  selectHoverLayerId,
} from "src/features/editor/editorSlice";
import {
  selectCanvas,
  selectLayers,
} from "src/features/project/projectSlice";
import styles from "./index.module.scss";

function curContainerRender(
  curLayerIds: string[],
  layersById: IProjectState["layers"]["byId"]
) {
  return (
    <div className={styles.curContainer}>
      {curLayerIds.length > 1 ? (
        <div className={styles.itemTotalBorder}></div>
      ) : null}
      {curLayerIds.map((curLayerId) => {
        const { width, height, x, y, rotation } = layersById[
          curLayerId
        ].properties;

        return (
          <div
            key={curLayerId}
            className={styles.itemSelectBorder}
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
  layersById: IProjectState["layers"]["byId"]
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

function selectionHandlerRender(
  curLayerIds: string[],
  layersById: IProjectState["layers"]["byId"]
) {
  let SingleResizer: JSX.Element | null = null;

  // TODO: 数量大于等于 2 的情况
  if (curLayerIds.length === 1) {
    const { width, height, x, y, rotation } = layersById[
      curLayerIds[0]
    ].properties;
    SingleResizer = (
      <div
        className={styles.singleResizer}
        style={{
          width,
          height,
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        }}
      >
        <div className={styles.rotate}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
              fill="#eb5648"
            ></path>
          </svg>
        </div>
        <div
          className={`${styles.t} ${styles["resizable-handler"]}`}
          style={{ cursor: "nw-resize" }}
        ></div>
        <div
          className={`${styles.b} ${styles["resizable-handler"]}`}
          style={{ cursor: "se-resize" }}
        ></div>
        <div
          className={`${styles.r} ${styles["resizable-handler"]}`}
          style={{ cursor: "ne-resize" }}
        ></div>
        <div
          className={`${styles.l} ${styles["resizable-handler"]}`}
          style={{ cursor: "sw-resize" }}
        ></div>
        <div
          className={`${styles.tr} ${styles["resizable-handler"]}`}
          style={{ cursor: "n-resize" }}
        ></div>
        <div
          className={`${styles.tl} ${styles["resizable-handler"]}`}
          style={{ cursor: "w-resize" }}
        ></div>
        <div
          className={`${styles.br} ${styles["resizable-handler"]}`}
          style={{ cursor: "e-resize" }}
        ></div>
        <div
          className={`${styles.bl} ${styles["resizable-handler"]}`}
          style={{ cursor: "s-resize" }}
        ></div>
        <div className={`${styles.t} ${styles.square}`}></div>
        <div className={`${styles.b} ${styles.square}`}></div>
        <div className={`${styles.r} ${styles.square}`}></div>
        <div className={`${styles.l} ${styles.square}`}></div>
        <div className={`${styles.tr} ${styles.square}`}></div>
        <div className={`${styles.tl} ${styles.square}`}></div>
        <div className={`${styles.br} ${styles.square}`}></div>
        <div className={`${styles.bl} ${styles.square}`}></div>
      </div>
    );
  }

  return <div className={styles.selectionHandler}>{SingleResizer}</div>;
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
      {selectionHandlerRender(curLayerIds, layers.byId)}
    </div>
  );
}

export default FakeCanvas;
