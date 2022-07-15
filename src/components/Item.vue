<template>
  <li
    @mouseenter="handleMouse(true)"
    @mouseleave="handleMouse(false)"
    :style="{backgroundColor:bgColor,color:myColor}"
  >
    <label>
      <!-- 不推荐这种写法 因为数据不在这里 -->
      <input type="checkbox" v-model="isDone" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteTodo(todo.id)">删除</button>
  </li>
</template>

<script lang="ts">
import { Todo } from '@/types/Todo'
import { computed, defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'Item',
  // 接收 List 组件传过来的数据
  props: {
    todo: {
      type: Object as () => Todo, // 声明todo的类型
      required: true, // 必须的
    },
  },
  setup(props) {
    const bgColor = ref('white')
    const myColor = ref('black')
    // 删除按钮是否显示
    const isShow = ref(false)

    const handleMouse = (flag: boolean) => {
      if (flag) {
        // 鼠标移入事件
        bgColor.value = 'pink'
        myColor.value = 'skyblue'
        isShow.value = true
      } else {
        // 鼠标移出事件
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }

    // 子孙组件使用 inject 函数接收 祖组件传过来的数据
    const handleDeleteTodo = <Function>inject('handleDeleteTodo') // 类型断言

    /* 删除一个todo的方法 */
    const deleteTodo = (id: number) => {
      if (confirm('确认要删除吗??')) {
        handleDeleteTodo(id)
      }
    }

    // 使用 inject 函数接收
    const handleChecked = <Function>inject('handleChecked')

    const isDone = computed({
      get() {
        return props.todo.done
      },
      set(value) {
        handleChecked(props.todo)
      }
    })
    return {
      handleMouse,
      bgColor,
      myColor,
      isShow,
      deleteTodo,
      isDone
    }
  },
})
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>