import { guid, toFixed } from './util';

test('12位随机字符串', () => {
  const id = guid();

  expect(id).toHaveLength(12);
});

test('toFixed', () => {
  expect(toFixed(1.02929833773727282828)).toEqual(1.0292983377);
});
