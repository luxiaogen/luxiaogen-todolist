<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckedAll" />
    </label>
    <span>
      <span>已完成{{count}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { Todo } from '@/types/Todo'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true, // 必须的
    },
    handleCheckedAll: {
      type: Function,
      required: true,
    },
    handleClearAllDone: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 已完成的数量
    // 发现不需要改变值
    const count = computed(() => {
      // 使用 规约 求和计算
      return props.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
    })

    // 全选 / 全不选
    const isCheckedAll = computed({
      get() {
        return count.value > 0 && count.value === props.todos.length
      },
      set(value) {
        props.handleCheckedAll(value)
      },
    })

    /* 清除所有 */
    const clearAll = () => {
      if (confirm("是否要清除所有已完成的todo吗")) {
        props.handleClearAllDone()
      }
    }
    return {
      count,
      isCheckedAll,
      clearAll
    }
  },
})
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>