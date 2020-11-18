/**
 * @description 睡眠指定时长，单位 ms
 */
const sleep = (duration: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

export default sleep;
