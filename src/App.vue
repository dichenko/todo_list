<template>
  <div id="app">
    <nav>
      <router-link to="/">Активные задачи</router-link> |
      <router-link to="/deleted">Удаленные задачи</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { useTaskStore } from './stores/tasks'

export default {
  name: 'App',
  setup() {
    const taskStore = useTaskStore()
    // Инициализируем store при запуске приложения
    taskStore.initialize()
  }
}
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  padding: 20px 0;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  padding: 10px;
}

nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.task-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  border-radius: 4px;
}

.delete-btn {
  background-color: #ff4444;
  padding: 4px 8px;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
