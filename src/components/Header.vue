<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="addTodo" />
  </div>
</template>

<script lang="ts">
import { Todo } from '@/types/Todo'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  props: {
    // 接收App发送的数据
    handleAddTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const title = ref('') // todo 的 title

    const addTodo = () => {
      // 判断数据的合法性
      if (!title.value.trim()) {
        return alert('输入不能为空')
      }
      const todo: Todo = {
        id: Date.now(),
        title: title.value,
        done: false, // 默认为false
      }
      props.handleAddTodo(todo)

      // 添加完毕后 清空 title
      title.value = ''
    }
    return {
      addTodo,
      title,
    }
  },
})
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>