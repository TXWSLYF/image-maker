import transfromAngle from './transformAngle';

test('transfromAngle', () => {
  const angle1 = -20;
  const angle2 = 50;
  const angle3 = -361;
  const angle4 = 361;

  expect(transfromAngle(angle1)).toEqual(340);
  expect(transfromAngle(angle2)).toEqual(50);
  expect(transfromAngle(angle3)).toEqual(359);
  expect(transfromAngle(angle4)).toEqual(1);
});
