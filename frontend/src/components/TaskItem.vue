<template>

<tr
    :class="index % 2 === 0 ? 'bg-bluegray' : 'bg-primary'"
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <router-link :to="'/task/' + task.id" class="text-primary-iron">
        #{{ task.id }}
      </router-link>
                </th>
    <td class="p-3 text-sm sm:text-sm px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
      <router-link :to="'/task/' + task.id" :class="{ 'line-through text-primary-dark': task.completed, 'text-primary-iron': !task.completed }">
        {{ task.name }}
      </router-link>
    </td>
    <td class="p-3 text-sm sm:text-sm px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-primary-iron">
      {{ task.due_date }}
    </td>
    <td class="p-3 text-sm sm:text-sm px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleTaskCompletion"
        class="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded ml-6 lg:ml-8"
      />
    </td>
    <td class="p-3 px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-sm sm:text-sm md:text-base">
      <router-link :to="'/task/' + task.id" class="text-bluegray-haze hover:text-blue mr-2">
        <i class="pi pi-eye"></i>
      </router-link>

      <button @click="deleteTask" class="text-bluegray-haze hover:text-red-700 ml-2">
        <i class="pi pi-trash"></i>
      </button>
    </td>
  </tr>



</template>

<script setup>

import { useTaskStore } from '@/stores/taskStore';

const props = defineProps({
task: {
  type: Object,
  required: true,
},
index: {
    type: Number,
    required: true,
  },
});

const taskStore = useTaskStore();

// Function to toggle task completion
const toggleTaskCompletion = async () => {
const taskId = props.task.id;

if (!taskId) {
  console.error('Task ID is undefined');
  return;
}
  console.log('Toggling completion for task ID: ${taskId}'); // Debugging log

try {
  await taskStore.toggleTaskCompletion(taskId, props.task.participant.id);
  console.log( 'Successfully toggled completion for task ID: ${taskId}, participant ID: ${props.task.participant.id}');
} catch (error) {
  console.error('Failed to toggle task completion:', error);
}
};

const deleteTask = async (id) => {
if (!id) {
  console.error('Task ID is undefined');
  return;
}
if (confirm(`Are you sure you want to delete the task "${props.task.name}"?`)) {
  console.log('Deleting task ID: ${id}'); // Debugging log
  try {
    await taskStore.deleteTask(id);
    console.log(`Successfully deleted task ID: ${id}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}
};


</script>