import calcRotatePoint from './calcRotatePoint';

test('rotatePoint', () => {
  const coordinate1: ICoordinate = calcRotatePoint({ x: -3, y: 0 }, { x: 0, y: 0 }, 90);

  expect(coordinate1.x).toEqual(-0);
  expect(coordinate1.y).toEqual(-3);

  const coordinate2: ICoordinate = calcRotatePoint(
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 1,
    },
    135,
  );

  expect(coordinate2.x).toEqual(1 + parseFloat(Math.sqrt(2).toFixed(10)));
  expect(coordinate2.y).toEqual(1);
});
