<template>
  <tr :class="index % 2 === 0 ? 'bg-white border-b' : 'bg-gray-100 border-b'">
    <td class="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
      <router-link :to="'/task/' + task.id" class="text-gray-500 font-semibold">
        #{{ task.id }}
      </router-link>
    </td>
    <td class="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light text-gray-900">
      <router-link :to="'/task/' + task.id" :class="{ 'line-through text-gray-500': task.completed, 'text-black': !task.completed }">
        {{ task.name }}
      </router-link>
    </td>
    <td class="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light text-gray-900">
      {{ task.due_date }}
    </td>
    <td class="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light text-gray-900">
      <input
        type="checkbox"
        :checked="task.completed"
         @change="toggleTaskCompletion"
        class="h-4 w-4 text-sky-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
    </td>
    <td class="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light text-gray-900">
      <button @click="deleteTask(task.id)" class="text-sky-500 hover:text-red-700">
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
});

const taskStore = useTaskStore();

// Function to toggle task completion
const toggleTaskCompletion = async () => {
  const taskId = props.task.id;

  if (!taskId) {
    console.error('Task ID is undefined');
    return;
  }

  console.log(`Toggling completion for task ID: ${taskId}`); // Debugging log

  try {
    await taskStore.toggleTaskCompletion(taskId, props.task.participant.id);
    console.log(`Successfully toggled completion for task ID: ${taskId}, participant ID: ${props.task.participant.id}`);
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
    console.log(`Deleting task ID: ${id}`); // Debugging log
    try {
      await taskStore.deleteTask(id);
      console.log(`Successfully deleted task ID: ${id}`);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }
};
</script>
