import { createRouter, createWebHistory } from 'vue-router'
import ActiveTasks from '@/views/ActiveTasks.vue'
import DeletedTasks from '@/views/DeletedTasks.vue'

const routes = [
  {
    path: '/',
    name: 'active',
    component: ActiveTasks
  },
  {
    path: '/deleted',
    name: 'deleted',
    component: DeletedTasks
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 