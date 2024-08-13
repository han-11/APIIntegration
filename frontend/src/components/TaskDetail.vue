<template>
  <div class="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
      Task Detail
    </h2>

    <div v-if="task">
      <div class="mb-4">
        <span class="text-gray-700 font-semibold">Task ID:</span>
        <span class="text-gray-900">{{ task.id }}</span>
      </div>
      <div class="mb-4">
        <span class="text-gray-700 font-semibold">Name:</span>
        <span :class="{
            'line-through text-gray-500': task.completed,
            'text-black': !task.completed
          }">{{ task.name }}</span>
      </div>
      <div class="mb-4">
        <span class="text-gray-700 font-semibold">Due Date:</span>
        <span class="text-gray-900">{{ task.due_date }}</span>
      </div>
      <div class="mb-4">
        <span class="text-gray-700 font-semibold">Assigned to:</span>
        <span class="text-gray-900">{{ task.participant.first_name }} {{ task.participant.last_name }}</span>
      </div>
      <div class="mb-4">
        <span class="text-gray-700 font-semibold">Completed:</span>
        <span class="text-gray-900">{{ task.completed ? 'Yes' : 'No' }}</span>
      </div>

      <div class="flex justify-between mt-4">
        <router-link :to="`/task/${task.id}/edit`" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Edit Task
        </router-link>
        <button @click="deleteTask" class="text-red-500 hover:text-red-700">
          <i class="pi pi-trash" style="color: slateblue"></i>
        </button>
        <router-link to="/" class="text-blue-500 hover:underline">Back to Task List</router-link>
      </div>
    

    </div>

    <div v-else>
      <p class="text-center text-red-500">Task not found.</p>
      <router-link to="/" class="text-blue-500 hover:underline">Back to Task List</router-link>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const task = ref(null);

onMounted(() => {
  console.log('Route ID:', route.params.id); // Debugging log

  if (!taskStore.tasks.length) {
    // Tasks might not be loaded yet, fetch them
    taskStore.fetchTasks().then(() => {
      task.value = taskStore.tasks.find(t => t.id === parseInt(route.params.id));
      if (!task.value) {
        console.error(`Task with ID ${route.params.id} not found.`);
        router.push('/');  // Redirect to task list if task not found
      }
    });
  } else {
    task.value = taskStore.tasks.find(t => t.id === parseInt(route.params.id));
    if (!task.value) {
      console.error(`Task with ID ${route.params.id} not found.`);
      router.push('/');  // Redirect to task list if task not found
    }
  }
});

// Function to delete task
const deleteTask = async () => {
  const taskId = task.value.id;

  if (!taskId) {
    console.error('Task ID is undefined');
    return;
  }

  if (confirm(`Are you sure you want to delete the task "${task.value.name}"?`)) {
    console.log(`Deleting task ID: ${taskId}`); // Debugging log
    try {
      await taskStore.deleteTask(taskId);
      console.log(`Successfully deleted task ID: ${taskId}`);
      router.push('/');  // Navigate back to the task list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }
};
</script>

