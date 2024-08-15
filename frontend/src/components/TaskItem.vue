<template>
  <!-- Iterate Through TaskItems List That Fetached In TaskStore -->
  <tr
    :class="index % 2 === 0 ? 'bg-bluegray-10' : 'bg-white'"
    class="border-b border-gray-300 hover:bg-bluegray-50"
  >
  <!-- Table Head : TaskID -->
    <th
      scope="row"
      class="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-700 whitespace-nowrap"
    >
      <router-link :to="'/task/' + task.id" class="text-primary">
        #{{ task.id }}
      </router-link>
    </th>

    <!-- Task Name -->
    <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
      <router-link
        :to="'/task/' + task.id"
        :class="{
          'line-through text-primary-dark': task.completed,
          'text-primary': !task.completed,
        }"
      >
        {{ task.name }}
      </router-link>
    </td>

    <!-- Due Date -->
    <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-primary">
      {{ task.due_date }}
    </td>
    <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTaskCompletion"
          class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-iron dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-iron focus:ring-2 accent-primary"
        />
      </label>
    </td>

    <!-- Actions to allow users check task details or delete the task-->
    <td
      class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap flex items-center space-x-2"
    >
      <router-link
        :to="'/task/' + task.id"
        class="text-primary hover:text-sky-600 ml-2 mr-2"
      >
        <i class="pi pi-eye" style="font-size: 1.2rem"></i>
      </router-link>

      <button @click="deleteTask(task.id)" class="text-primary hover:text-red-600">
        <i class="pi pi-trash" style="font-size: 1.2rem"></i>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useTaskStore } from "@/stores/taskStore";

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
    console.error("Task ID is undefined");
    return;
  }
  console.log("Toggling completion for task ID: ${taskId}"); // Debugging log

  try {
    await taskStore.toggleTaskCompletion(taskId, props.task.participant.id);
    console.log(
      "Successfully toggled completion for task ID: ${taskId}, participant ID: ${props.task.participant.id}"
    );
  } catch (error) {
    console.error("Failed to toggle task completion:", error);
  }
};

// Function to delete a task
const deleteTask = async (taskId) => {
  if (!taskId) {
    console.error("Task ID is undefined");
    return;
  }
  if (
    confirm(`Are you sure you want to delete the task "${props.task.name}"?`)
  ) {
    console.log(`Deleting task ID: ${taskId}`); // Debugging log
    try {
      await taskStore.deleteTask(taskId);
      console.log(`Successfully deleted task ID: ${taskId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }
};

</script>

<style scoped>
/* Fallback for browsers that may not fully support Tailwind's accent-* class */
input[type="checkbox"] {
  accent-color: var(
    -color-primary
  ); /* Fallback to Tailwind's custom primary color */
}
</style>
