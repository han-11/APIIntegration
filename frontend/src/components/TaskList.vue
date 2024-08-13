<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg">
    <h1 class="text-4xl font-bold text-center text-blue-600 mt-6 mb-6">
      Task Tracker
    </h1>

    <!-- Navigation -->
    <nav class="mb-6 text-center">
      <router-link to="/add-task" class="ml-4 text-blue-500 hover:underline">Add New Task</router-link>
      <router-link to="/participants" class="ml-4 text-blue-500 hover:underline">Manage Participants</router-link>
    </nav>

    <!-- Task List Header -->
    <div class="grid grid-cols-5 gap-4 p-4 border-b bg-gray-100 font-semibold">
      <div class="text-gray-700">Task ID</div>
      <div class="col-span-2 text-gray-700">Name</div>
      <div class="text-gray-700">Due Date</div>
      <div class="text-gray-700 text-center">Completed</div>
      <div class="text-gray-700 text-center">Delete</div>
    </div>

    <!-- Task Items -->
    <div v-if="taskStore.tasks.length === 0" class="p-4 text-center text-gray-500">
      No tasks available.
    </div>
    <div v-else class="divide-y divide-gray-200">
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTaskCompletion"
      />
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
