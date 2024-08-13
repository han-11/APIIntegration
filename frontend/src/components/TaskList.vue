<template>
    
    <div class="overflow-x-auto max-w-4xl ml-10 mr-10 mt-5 bg-white shadow-md rounded-lg">

             <!-- Task Table -->
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-2 sm:px-6 py-4 text-left">Task ID</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-2 sm:px-6 py-4 text-left">Task Name</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-2 sm:px-6 py-4 text-left">Due Date</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-2 sm:px-6 py-4 text-left">Completed</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-2 sm:px-6 py-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="taskStore.tasks.length === 0" class="bg-gray-100 border-b">
              <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                No tasks available.
              </td>
            </tr>
            <TaskItem
              v-for="task in taskStore.tasks"
              :key="task.id"
              :task="task"
              @toggle-task="toggleTaskCompletion"
              @delete-task="deleteTask"
            />
          </tbody>
        </table>
      </div>
    </div>

  </div>
  
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import TaskItem from './TaskItem.vue';
import { onMounted } from 'vue';

const taskStore = useTaskStore();

// Fetch tasks when the component is mounted
onMounted(() => {
  taskStore.fetchTasks();
});
</script>
