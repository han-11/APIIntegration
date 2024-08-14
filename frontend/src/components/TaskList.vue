<template>
  <div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark rounded-lg ">
      <!-- Task Table -->
      <div class="py-8 px-4 sm:px-6 lg:px-8 bg-primary-dark rounded-lg mx-8">
        <h1 class="text-xl sm:text-2xl font-bold text-center text-bluegray-10 mb-5">
          Task List
        </h1>

        <div class="relative overflow-x-auto shadow-lg sm:rounded-lg"> <!-- Added shadow-lg class here -->
          <table class="w-full text-sm text-left">
    <thead class="text-xs sm:text-sm text-gray-700 uppercase bg-bluegray-15">
      <tr>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Task ID</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Task Name</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Due Date</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Completed</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="taskStore.tasks.length === 0" class="bg-bluegray-10">
        <td colspan="5" class="p-3 px-4 sm:px-6 py-4 text-sm font-medium text-center text-gray-700">
          No tasks available.
        </td>
      </tr>
      <template v-for="(task, index) in taskStore.tasks" :key="task.id">
        <TaskItem
          :task="task"
          :index="index"
          @toggle-task="toggleTaskCompletion"
          @delete-task="deleteTask"
        />
      </template>
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

const toggleTaskCompletion = async (taskId) => {
  try {
    await taskStore.toggleTaskCompletion(taskId);
    console.log('Task completion toggled successfully');
  } catch (error) {
    console.error('Failed to toggle task completion:', error);
  }
};


const deleteTask = async (taskId) => {
  try {
    await taskStore.deleteTask(taskId);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};


</script>
