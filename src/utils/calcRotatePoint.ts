import { D2R } from 'src/common/constants';
import { toFixed } from './util';

/**
 * @description 旋转点算法，求一个坐标点绕中心点顺时针旋转任意角度之后的坐标
 * @param point 被旋转点
 * @param center 中心点
 * @param rotation 旋转角
 */
const calcRotatePoint = (point: ICoordinate, center: ICoordinate, rotation: number): ICoordinate => {
  // 转换为弧度
  const rad = rotation * D2R;

  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const { x, y } = point;
  const { x: centerX, y: centerY } = center;

  return {
    // 解决浮点数溢出问题
    x: toFixed(centerX + cos * (x - centerX) - sin * (y - centerY)),
    y: toFixed(centerY + sin * (x - centerX) + cos * (y - centerY)),
  };
};

export default calcRotatePoint;
