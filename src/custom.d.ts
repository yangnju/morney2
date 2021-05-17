/*很多地方都要声明变量类型，为了避免多次引入麻烦，就将record移动至全局声明;
xxx.d.ts （只要以d.ts结尾，ts就知道这里面是全局变量）*/
type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: string  // 可以是 类 / 构造函数（比如Date）
}

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
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
// 因为update使用的还是tagListModel中的update方法，所以应该返回相同的类型
// 把之前window上的内容转移到了store上
interface Window {
}