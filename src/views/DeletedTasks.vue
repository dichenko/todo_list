<template>
  <div class="deleted-tasks">
    <table>
      <thead>
        <tr>
          <th @click="changeSort('text')">
            Задача
            <i :class="getSortIcon('text')" />
          </th>
          <th @click="changeSort('createTime')">
            Дата создания
            <i :class="getSortIcon('createTime')" />
          </th>
          <th @click="changeSort('deleteTime')">
            Дата удаления
            <i :class="getSortIcon('deleteTime')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in paginatedTasks" :key="task.id">
          <td>{{ task.text }}</td>
          <td>{{ formatDate(task.createTime) }}</td>
          <td>{{ formatDate(task.deleteTime) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button 
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Назад
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import { ITEMS_PER_PAGE, SORT_DIRECTIONS } from '@/constants'

export default {
  name: 'DeletedTasks',
  setup() {
    const taskStore = useTaskStore()
    const sortField = ref('deleteTime')
    const sortDirection = ref(SORT_DIRECTIONS.DESC)
    const currentPage = ref(1)

    const changeSort = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === SORT_DIRECTIONS.ASC 
          ? SORT_DIRECTIONS.DESC 
          : SORT_DIRECTIONS.ASC
      } else {
        sortField.value = field
        sortDirection.value = SORT_DIRECTIONS.DESC
      }
    }

    const getSortIcon = (field) => {
      if (sortField.value !== field) return 'fas fa-sort'
      return sortDirection.value === SORT_DIRECTIONS.ASC 
        ? 'fas fa-sort-up' 
        : 'fas fa-sort-down'
    }

    const paginatedTasks = computed(() => {
      const start = (currentPage.value - 1) * ITEMS_PER_PAGE
      const sorted = [...taskStore.deletedTasks].sort((a, b) => {
        let comparison = 0
        if (sortField.value === 'text') {
          comparison = a.text.localeCompare(b.text)
        } else {
          comparison = new Date(a[sortField.value]) - new Date(b[sortField.value])
        }
        return sortDirection.value === SORT_DIRECTIONS.ASC ? comparison : -comparison
      })
      return sorted.slice(start, start + ITEMS_PER_PAGE)
    })

    const totalPages = computed(() => {
      return Math.ceil(taskStore.deletedTasks.length / ITEMS_PER_PAGE)
    })

    onMounted(async () => {
      await taskStore.loadDeletedTasks()
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    return {
      sortField,
      currentPage,
      paginatedTasks,
      totalPages,
      formatDate,
      changeSort,
      getSortIcon
    }
  }
}
</script>

<style scoped>
.deleted-tasks {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #e5e5e5;
}

tr:hover {
  background-color: #f9f9f9;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 16px;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 