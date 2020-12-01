import rectCollide from './rectCollide';

test('rectCollide', () => {
  const rect1: IRect = { x: 100, y: 100, width: 100, height: 100, rotation: 0 };

  const rect2: IRect = { x: 150, y: 150, width: 100, height: 100, rotation: 0 };
  const rect3: IRect = { x: 110, y: 90, width: 30, height: 150, rotation: 0 };
  const rect4: IRect = { x: 110, y: 110, width: 30, height: 30, rotation: 0 };
  const rect5: IRect = { x: 0, y: 0, width: 30, height: 30, rotation: 0 };

  expect(rectCollide(rect1, rect2)).toEqual(true);
  expect(rectCollide(rect1, rect3)).toEqual(true);
  expect(rectCollide(rect1, rect4)).toEqual(true);
  expect(rectCollide(rect1, rect5)).toEqual(false);
});
