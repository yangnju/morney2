import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

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
    const id = createId().toString();
    this.data.push({id: id, name: name});
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