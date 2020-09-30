import calcRotatePoint from './calcRotatePoint';

/**
 * @description 计算矩形中心点坐标
 * @param rect 矩形位置信息
 */
export const calcRectCenter = (rect: IRect): ICoordinate => {
  const { x, y, width, height } = rect;

  return {
    x: x + width / 2,
    y: y + height / 2,
  };
};

/**
 * @description 计算矩形四个点坐标
 * @param rect 矩形位置信息
 */
export const calcRectCoordinates = (rect: IRect) => {
  const { x, y, width, height } = rect;

  // 左上角
  const tl: ICoordinate = {
    x,
    y,
  };

  // 右上角
  const tr: ICoordinate = {
    x: x + width,
    y,
  };

  // 左下角
  const bl: ICoordinate = {
    x,
    y: y + height,
  };

  // 右下角
  const br: ICoordinate = {
    x: x + width,
    y: y + height,
  };

  return [tl, tr, bl, br];
};

/**
 * @description 最小包围矩形算法（假），求一组矩形的最小包围矩形（该矩形旋转角为 0）
 */
const calcMiniEnclosingRect = (rects: IRect[]): IRect => {
  let left: undefined | number = undefined;
  let right: undefined | number = undefined;
  let top: undefined | number = undefined;
  let bottom: undefined | number = undefined;

  rects.forEach((rect) => {
    const rectCenter = calcRectCenter(rect);
    const rectCoordinates = calcRectCoordinates(rect);

    rectCoordinates.forEach((coordinate) => {
      const { x, y } = calcRotatePoint(coordinate, rectCenter, rect.rotation);

      if (left === undefined || x < left) {
        left = x;
      }

      if (right === undefined || x > right) {
        right = x;
      }

      if (top === undefined || y < top) {
        top = y;
      }

      if (bottom === undefined || y > bottom) {
        bottom = y;
      }
    });
  });

  // TODO: 寻找一种更加优雅的方式！
  return {
    x: left || 0,
    y: top || 0,
    width: (right || 0) - (left || 0),
    height: (bottom || 0) - (top || 0),
    rotation: 0,
  };
};

export default calcMiniEnclosingRect;
