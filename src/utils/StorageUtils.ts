import { Todo } from "@/types/Todo";

// 将数据保存到浏览器缓存
export function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todos))
}

// 获取浏览器缓存中的数据
export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}