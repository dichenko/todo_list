<template>
  <div class="active-tasks">
    <div class="task-input">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask"
        placeholder="Введите новую задачу"
      >
      <button @click="addTask">Добавить</button>
    </div>
    
    <div class="tasks-list">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <span>{{ task.text }}</span>
        <button @click="deleteTask(task.id)" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'

export default {
  name: 'ActiveTasks',
  setup() {
    const taskStore = useTaskStore()
    const newTask = ref('')
    const tasks = ref([])

    onMounted(async () => {
      await taskStore.loadActiveTasks()
      tasks.value = taskStore.activeTasks
    })

    const addTask = async () => {
      if (newTask.value.trim()) {
        await taskStore.addTask({
          text: newTask.value,
          status: 'active',
          createTime: new Date(),
          deleteTime: null
        })
        newTask.value = ''
        tasks.value = taskStore.activeTasks
      }
    }

    const deleteTask = async (id) => {
      await taskStore.deleteTask(id)
      tasks.value = taskStore.activeTasks
    }

    return {
      newTask,
      tasks,
      addTask,
      deleteTask
    }
  }
}
</script> 