const localStorageKeyName = 'tagList';
// 因为在声明data时，没法再用冒号声明类型，所以单独声明TagListModel的类型
type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型，不属于7中类型，类似于枚举（如果返回类型不是这两个字符串，就会报错，以免出现拼错导致永远无法报错。
  save: () => void // 没有返回值
}

// 此处自己维护一个data
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    // 直接根据情况返回结果对应的字符串
    if (this.data.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push(name);
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;