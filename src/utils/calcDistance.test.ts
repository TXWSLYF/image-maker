import calcDistance from './calcDistance';

test('calcDistance', () => {
  const c1 = { x: 1, y: 1 };
  const c2 = { x: 3, y: 1 };

  expect(calcDistance(c1, c2)).toEqual(2);
});
