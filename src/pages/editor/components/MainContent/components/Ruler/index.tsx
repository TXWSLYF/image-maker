import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import {
  selectBasicWidgetsPanelWidth,
  selectLeftPanelIndeedWidth,
  selectScreenHeight,
  selectScreenWidth,
  selectScrollLeft,
  selectScrollTop,
  setScrollLeft,
  setScrollTop,
} from 'src/features/editor/editorSlice';
import { selectCanvas } from 'src/features/project/projectSlice';
import styles from './index.module.scss';

const { devicePixelRatio } = window; // 设备像素比
const cornerSize = 16;
const rulerXStyle: React.CSSProperties = { left: cornerSize };
const rulerYStyle: React.CSSProperties = { top: cornerSize };
const rulerXCanvasStyle: React.CSSProperties = { width: '100%', height: cornerSize };
const rulerYCanvasStyle: React.CSSProperties = { width: cornerSize, height: '100%' };
const cornerStyle: React.CSSProperties = { width: cornerSize, height: cornerSize };

/**
 * @description 重置画布
 */
const resetCanvasCtx = (ctx: CanvasRenderingContext2D) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

/**
 * @description 绘制刻度函数
 */
const drawRuler = ({
  ctx,
  step,
  shortScaleLength,
  longScaleLength,
  start,
  end,
  direction,
}: {
  ctx: CanvasRenderingContext2D;
  step: number;
  shortScaleLength: number;
  longScaleLength: number;
  start: number;
  end: number;
  direction: 'X' | 'Y';
}) => {
  // 重新画线
  ctx.beginPath();

  for (let i = 0; i < end; i += 1) {
    // 加 0.5 是为了让线条的中心点位置不为整数，让线条显示宽度为 1px
    ctx.moveTo(i + 0.5, 0);

    const temp = Math.floor(i + start);
    if (direction === 'X') {
      if (temp % (10 * step) === 0) {
        ctx.lineTo(i + 0.5, longScaleLength);
        ctx.fillText(temp.toString(), i, longScaleLength + 10);
      } else if (temp % step === 0) {
        ctx.lineTo(i + 0.5, shortScaleLength);
      }
    } else if (direction === 'Y') {
      if (temp % (10 * step) === 0) {
        ctx.lineTo(i + 0.5, -longScaleLength);
        ctx.fillText(temp.toString(), i, -longScaleLength - 2);
      } else if (temp % step === 0) {
        ctx.lineTo(i + 0.5, -shortScaleLength);
      }
    }
  }

  ctx.stroke();
};

const Ruler = () => {
  const dispatch = useDispatch();

  const basicWidgetsPanelWidth = useSelector(selectBasicWidgetsPanelWidth);
  const leftPanelIndeedWidth = useSelector(selectLeftPanelIndeedWidth);
  const screenHeight = useSelector(selectScreenHeight);
  const { height: canvasHeight, width: canvasWidth } = useSelector(selectCanvas);
  const screenWidth = useSelector(selectScreenWidth);
  const scrollTop = useSelector(selectScrollTop);
  const scrollLeft = useSelector(selectScrollLeft);

  const rulerXCanvas = useRef<HTMLCanvasElement>(null);
  const rulerYCanvas = useRef<HTMLCanvasElement>(null);

  const [rulerXCanvasCtx, setRulerXCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [rulerYCanvasCtx, setRulerYCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [rulerXCanvasWidth, setRulerXCanvasWidth] = useState(0);
  const [rulerYCanvasHeight, setRulerYCanvasHeight] = useState(0);

  const handleClickCorner = useCallback(() => {
    dispatch(setScrollLeft({ newScrollLeft: 0 }));
    dispatch(setScrollTop({ newScrollTop: 0 }));
  }, [dispatch]);

  /**
   * @description 尺子相关属性
   */
  const [rulerColor] = useState('#666'); // 尺子颜色
  const [rulerStep] = useState(10); // 尺子的最小间隔，单位像素
  const [shortScaleLength] = useState(3); // 短刻度长度
  const [longScaleLength] = useState(6); // 长刻度长度

  // 获取 canvas context2d & 计算画布大小
  useEffect(() => {
    if (rulerXCanvas.current && rulerYCanvas.current) {
      setRulerXCanvasCtx(rulerXCanvas.current.getContext('2d'));
      setRulerYCanvasCtx(rulerYCanvas.current.getContext('2d'));

      // 监听尺寸变化
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const {
            target,
            contentRect: { width, height },
          } = entry;

          if (target === rulerXCanvas.current) {
            setRulerXCanvasWidth(width);
          }

          if (target === rulerYCanvas.current) {
            setRulerYCanvasHeight(height);
          }
        }
      });
      ro.observe(rulerXCanvas.current);
      ro.observe(rulerYCanvas.current);

      return () => {
        ro.disconnect();
      };
    }
  }, []);

  /**
   * @description 绘制刻度
   */
  useEffect(() => {
    if (rulerXCanvasCtx) {
      resetCanvasCtx(rulerXCanvasCtx);
      rulerXCanvasCtx.strokeStyle = rulerColor;
      rulerXCanvasCtx.fillStyle = rulerColor;
      rulerXCanvasCtx.scale(devicePixelRatio, devicePixelRatio);

      const offset = (screenWidth - canvasWidth) / 2 - cornerSize - basicWidgetsPanelWidth - leftPanelIndeedWidth;
      drawRuler({
        ctx: rulerXCanvasCtx,
        step: rulerStep,
        shortScaleLength,
        longScaleLength,
        start: scrollLeft - offset,
        end: rulerXCanvasWidth,
        direction: 'X',
      });
    }
  }, [
    rulerXCanvasCtx,
    rulerColor,
    rulerStep,
    shortScaleLength,
    longScaleLength,
    rulerXCanvasWidth,
    scrollLeft,
    screenWidth,
    canvasWidth,
    basicWidgetsPanelWidth,
    leftPanelIndeedWidth,
  ]);
  useEffect(() => {
    if (rulerYCanvasCtx) {
      resetCanvasCtx(rulerYCanvasCtx);
      rulerYCanvasCtx.strokeStyle = rulerColor;
      rulerYCanvasCtx.fillStyle = rulerColor;
      rulerYCanvasCtx.scale(devicePixelRatio, devicePixelRatio);
      rulerYCanvasCtx.rotate(Math.PI / 2); // 坐标系顺时针旋转90度

      const offset = (screenHeight - canvasHeight) / 2 - cornerSize;
      drawRuler({
        ctx: rulerYCanvasCtx,
        step: rulerStep,
        shortScaleLength,
        longScaleLength,
        start: scrollTop - offset,
        end: rulerYCanvasHeight,
        direction: 'Y',
      });
    }
  }, [
    rulerYCanvasCtx,
    rulerColor,
    rulerStep,
    shortScaleLength,
    longScaleLength,
    rulerYCanvasHeight,
    scrollTop,
    canvasHeight,
    screenHeight,
  ]);

  return useMemo(() => {
    return (
      <div className={styles.ruler}>
        <div className={styles.rulerX} style={rulerXStyle}>
          <canvas
            ref={rulerXCanvas}
            width={rulerXCanvasWidth * devicePixelRatio}
            height={cornerSize * devicePixelRatio}
            style={rulerXCanvasStyle}
          />
          <div className={styles.lines}></div>
        </div>
        <div className={styles.rulerY} style={rulerYStyle}>
          <canvas
            ref={rulerYCanvas}
            height={rulerYCanvasHeight * devicePixelRatio}
            width={cornerSize * devicePixelRatio}
            style={rulerYCanvasStyle}
          />
          <div className={styles.lines}></div>
        </div>

        <div className={styles.corner} style={cornerStyle} onClick={handleClickCorner}></div>
      </div>
    );
  }, [rulerXCanvasWidth, rulerYCanvasHeight, handleClickCorner]);
};

export default Ruler;
