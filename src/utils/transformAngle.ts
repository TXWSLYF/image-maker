/**
 * @description 将任意角度转换到 0° ~ 360° 的区间
 */
const transfromAngle = (angle: number): number => {
  const x = Math.floor(angle / 360);

  if (angle < 0) {
    return Math.abs(x) * 360 + angle;
  } else {
    return angle - 360 * x;
  }
};

export default transfromAngle;
