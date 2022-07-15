<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :handleAddTodo="handleAddTodo" />
      <List :todos="todos" />
      <Footer
        :todos="todos"
        :handleCheckedAll="handleCheckedAll"
        :handleClearAllDone="handleClearAllDone"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  provide,
  reactive,
  toRef,
  toRefs,
  watch,
} from 'vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import { Todo } from './types/Todo'
import { readTodos, saveTodos } from './utils/StorageUtils'

export default defineComponent({
  name: 'App',
  components: { Header, List, Footer },
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      // 开始为空
      todos: [],
    })

    // 界面加载完毕过一会再读取数据
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos()
      }, 1000)
    })

    /* 添加一个todo */
    const handleAddTodo = (todo: Todo) => {
      state.todos.unshift(todo)
    }

    // 因为 数据在 app这 所以对数据的操作都在这完成
    /* 删除一个todo */
    const handleDeleteTodo = (id: number) => {
      // 过滤掉要删除的那个
      state.todos = state.todos.filter((todo) => todo.id !== id)
    }

    /* 一个todo选/不选 */
    const handleChecked = (todo: Todo) => {
      todo.done = !todo.done
    }

    /* 设置全选全不选 */
    const handleCheckedAll = (isDone: boolean) => {
      state.todos.forEach((todo) => (todo.done = isDone))
    }

    /* 清除所有已完成 */
    const handleClearAllDone = () => {
      // 要没有完成的
      state.todos = state.todos.filter((todo) => !todo.done)
    }

    // 使用 provide 函数 方便 祖孙之间的数据传递
    provide('handleDeleteTodo', handleDeleteTodo)
    provide('handleChecked', handleChecked)

    /* 检测 todos 的改变 如果改变就保存到浏览器的缓存 */
    // 对 state 里面的 内部数据 进行监视  开始深层监视
    watch(() => state.todos, saveTodos, { deep: true })

    return {
      ...toRefs(state), // 向外暴露
      handleAddTodo,
      handleCheckedAll,
      handleClearAllDone,
    }
  },
})
</script>

<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
