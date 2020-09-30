import calcMiniEnclosingRect, {
  calcRectCenter,
  calcRectCoordinates,
} from './calcMiniEnclosingRect';
import calcRotatePoint from './calcRotatePoint';

test('miniEnclosingRect', () => {
  const rect1: IRect = {
    x: 97,
    y: 167,
    width: 996,
    height: 700,
    rotation: 23,
  };
  const rect2: IRect = {
    x: 1264,
    y: 416,
    width: 200,
    height: 100,
    rotation: 286,
  };

  // 计算两个矩形中心点坐标
  const rect1Center = calcRectCenter(rect1);
  const rect2Center = calcRectCenter(rect2);

  // 计算两个矩形各自的四周坐标点
  const rect1Coordinates = calcRectCoordinates(rect1);
  const rect2Coordinates = calcRectCoordinates(rect2);

  // 计算期望最小包围矩形 x 坐标
  const expectMiniRectX = calcRotatePoint(
    rect1Coordinates[2],
    rect1Center,
    rect1.rotation
  ).x;

  // 计算期望最小包围矩形 y 坐标
  const expectMiniRectY = calcRotatePoint(
    rect1Coordinates[0],
    rect1Center,
    rect1.rotation
  ).y;

  const miniRect = calcMiniEnclosingRect([rect1, rect2]);

  expect(miniRect.x).toEqual(expectMiniRectX);
  expect(miniRect.y).toEqual(expectMiniRectY);
  expect(miniRect.width).toEqual(
    calcRotatePoint(rect2Coordinates[3], rect2Center, rect2.rotation).x -
      expectMiniRectX
  );
  expect(miniRect.height).toEqual(
    calcRotatePoint(rect1Coordinates[3], rect1Center, rect1.rotation).y -
      expectMiniRectY
  );
  expect(miniRect.rotation).toEqual(0);
});
