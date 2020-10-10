import calcTriangleAngle from './calcTriangleAngle';

test('calcTriangleAngle', () => {
  const p0 = { x: 1, y: 1 };
  const p1 = { x: 1, y: 2 };
  const p2 = { x: 2, y: 1 };

  expect(calcTriangleAngle(p0, p1, p2)).toEqual(90);
});
