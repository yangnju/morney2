// 保证clone前后格式一致
function clone<X>(data: X): X {
  return JSON.parse(JSON.stringify(data));
}

export default clone;