import calcDistance from './calcDistance';
import { toFixed } from './util';

/**
 * @description 根据三角形三个顶点坐标，计算夹角
 */
const calcTriangleAngle = (p0: ICoordinate, p1: ICoordinate, p2: ICoordinate) => {
  const a = calcDistance(p0, p1);
  const b = calcDistance(p0, p2);
  const c = calcDistance(p1, p2);

  const cosθ = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);

  return toFixed((Math.acos(cosθ) / Math.PI) * 180);
};

export default calcTriangleAngle;
