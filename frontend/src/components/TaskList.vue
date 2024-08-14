<template>
   
   <div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark shadow-md rounded-lg mx-8">
      <!-- Task Table -->
      <div class="py-10 px-10 inline-block min-w-full sm:px-4 lg:px-8 bg-primary-dark ">
        <h1 class="text-2xl font-bold text-center text-primary-iron mb-4">
          Task list
        </h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-5">Task ID</th>
                <th scope="col" class="px-6 py-5">Task Name</th>
                <th scope="col" class="px-6 py-5">Due Date</th>
                <th scope="col" class="px-6 py-5">Completed</th>
                <th scope="col" class="px-6 py-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="taskStore.tasks.length === 0">
                <td colspan="5" class="p-3 px-2 sm:px-4 px-6 py-4 text-sm sm:text-sm font-medium text-center">
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
