/**
 * @description 计算两点之间距离
 */
const calcDistance = (c1: ICoordinate, c2: ICoordinate) => {
  return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
};

export default calcDistance;
