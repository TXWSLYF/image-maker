function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * 生成 12 位随机字符串
 * @return {string} 12 位随机字符串
 */
export function guid() {
  return `${s4()}${s4()}${s4()}`;
}
