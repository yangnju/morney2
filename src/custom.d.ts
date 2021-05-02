/*很多地方都要声明变量类型，为了避免多次引入麻烦，就将record移动至全局声明;
xxx.d.ts （只要以d.ts结尾，ts就知道这里面是全局变量）*/
type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: Date  // 类 / 构造函数
}

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

// 给 window 加上一个属性 tagList
interface Window {
  tagList: Tag[]
}