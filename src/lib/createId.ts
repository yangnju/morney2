// 第一个0保证原来的值不为空，第二个是默认兜底值
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
  id++;
  window.localStorage.setItem('_idMax',id.toString())
  return id;
}

export default createId;