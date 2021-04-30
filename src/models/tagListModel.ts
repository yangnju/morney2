const localStorageKeyName = 'tagList';

// 为了让tag在以后数据库好维护，需要加入一个id
type Tag = {
  id: string;
  name: string;
}

// 因为在声明data时，没法再用冒号声明类型，所以单独声明TagListModel的类型
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
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
    // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
    // 从data中拿到所有的name，赋值给names
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;