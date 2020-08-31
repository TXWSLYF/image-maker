import { guid } from './util';

test('12位随机字符串', () => {
  const id = guid();

  expect(id).toHaveLength(12);
});
