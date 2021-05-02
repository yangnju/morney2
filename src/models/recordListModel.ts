import clone from '@/lib/clone';

// 为了避免每次用到数据的时候都要parse，stringify，所以根据MVC思想，将数据封装到model中
// 因为不希望别人改变量名，所以声明一个 localStorageKeyName
const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.data));
  }
};

export default recordListModel;