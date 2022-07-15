// 定义一个接口 限制Todo的类型 将 这个接口 抽取出去
// 向外暴露
export interface Todo { 
  id: number
  title: string
  done: boolean
}
