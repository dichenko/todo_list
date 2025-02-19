import { defineStore } from 'pinia'
import { getUserId } from '@/utils/user-identifier'
import { openDB } from 'idb'
import { DB_NAME, DB_VERSION } from '@/constants'

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('tasks', { keyPath: 'id' })
  }
})

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    activeTasks: [],
    deletedTasks: [],
    userId: null
  }),

  actions: {
    async initialize() {
      this.userId = await getUserId()
    },

    async loadActiveTasks() {
      const db = await dbPromise
      const tasks = await db.getAll('tasks')
      this.activeTasks = tasks.filter(
        task => task.userId === this.userId && task.status === 'active'
      )
    },

    async loadDeletedTasks() {
      const db = await dbPromise
      const tasks = await db.getAll('tasks')
      this.deletedTasks = tasks.filter(
        task => task.userId === this.userId && task.status === 'deleted'
      )
    },

    async addTask(taskData) {
      const db = await dbPromise
      const task = {
        id: Date.now().toString(),
        userId: this.userId,
        ...taskData
      }
      await db.add('tasks', task)
      this.activeTasks.push(task)
    },

    async deleteTask(id) {
      const db = await dbPromise
      const task = await db.get('tasks', id)
      task.status = 'deleted'
      task.deleteTime = new Date()
      await db.put('tasks', task)
      
      this.activeTasks = this.activeTasks.filter(t => t.id !== id)
      this.deletedTasks.push(task)
    }
  }
}) 