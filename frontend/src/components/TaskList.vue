<template>
    <div class="flex justify-center px-4 md:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-full sm:max-w-2xl md:max-w-4xl mx-5 my-5 w-full shadow-md rounded-lg">
      
      
             <!-- Task Table -->
      <div class="py-10 bg-white inline-block min-w-full sm:px-4 lg:px-8">
        <h1 class="text-2xl font-bold text-center text-sky-600 dark:text-sky-500 mb-4">
      Task list
    </h1>
      <div class="overflow-hidden">
        <table class="min-w-full table-auto">
          <thead class="">
            <tr>
              <th scope="col" class="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-4 md:px-6 py-4 text-left">Task ID</th>
              <th scope="col" class="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-4 md:px-6 py-4 text-left">Task Name</th>
              <th scope="col" class="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-4 md:px-6 py-4 text-left">Due Date</th>
              <th scope="col" class="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-4 md:px-6 py-4 text-left">Completed</th>
              <th scope="col" class="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-4 md:px-6 py-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="taskStore.tasks.length === 0" class="bg-500 dark:bg-slate-800">
              <td colspan="5" class="px-2 sm:px-4 px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 text-center">
                No tasks available.
              </td>
            </tr>
            <TaskItem
              v-for="(task,index) in taskStore.tasks"
              :key="task.id"
              :task="task"
              :index="index"
              @toggle-task="toggleTaskCompletion"
              @delete-task="deleteTask"
            />
          </tbody>
        </table>
      </div>
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
