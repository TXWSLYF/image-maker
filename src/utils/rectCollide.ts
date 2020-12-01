/**
 * @description 矩形相交算法
 */
const rectCollide = (rect1: IRect, rect2: IRect): boolean => {
  const { x: x1, y: y1, width: w1, height: h1 } = rect1;
  const { x: x2, y: y2, width: w2, height: h2 } = rect2;
  let maxX, maxY, minX, minY;

  maxX = x1 + w1 >= x2 + w2 ? x1 + w1 : x2 + w2;
  maxY = y1 + h1 >= y2 + h2 ? y1 + h1 : y2 + h2;
  minX = x1 <= x2 ? x1 : x2;
  minY = y1 <= y2 ? y1 : y2;

  if (maxX - minX <= w1 + w2 && maxY - minY <= h1 + h2) {
    return true;
  } else {
    return false;
  }
};

export default rectCollide;
