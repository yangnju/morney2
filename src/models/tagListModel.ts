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
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
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
  update(id, name) {
      // 根据id找到对应的tag，如果找到了，就拿到对应tag的name，如果name已存在，就提示重复了，否则就替换掉，保存，返回成功
      const idList = this.data.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = this.data.filter(item => item.id === id)[0];
          tag.name = name;
          this.save();
          return 'success';
        }
      } else {
        return 'not found';
      }
    },

    remove(id: string) {
      let index = -1;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === id) {
          index = i;
          break;
        }
      }
      this.data.splice(index, 1);
      this.save();
      return true;
    },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;