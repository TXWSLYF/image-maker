/**
 * @description 矩形放大运算
 */
const scaleRect = (rect: IRect, scale: number) => {
  const { width, height, x, y, rotation } = rect;

  return {
    width: width * scale,
    height: height * scale,
    x: x * scale,
    y: y * scale,
    rotation,
  };
};

export default scaleRect;
