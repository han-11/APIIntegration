<template>
  <div class="flex items-center justify-between p-4 border-b">
    <div>
      <router-link :to="'/task/' + task.id" class="text-gray-500 font-semibold mr-2">
        #{{ task.id }}
      </router-link>
      <router-link :to="'/task/' + task.id" :class="{
          'line-through text-gray-500': task.completed,
          'text-black': !task.completed}">
        {{ task.name }}
      </router-link>
    </div>
    <div class="text-sm text-gray-400">
      Due: {{ task.due_date }}
    </div>
        <input
      type="checkbox"
      :id="'task-' + task.id"  
      :checked="task.completed"
      @change="toggleTaskCompletion" 
      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">
      <i class="pi pi-trash" style="color: slateblue"></i>
    </button>
  </div>
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
