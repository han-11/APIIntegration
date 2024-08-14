<template>
    <div class="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
        Edit Task
      </h2>
  
      <div v-if="task">
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="taskName">Name:</label>
            <input v-model="editedName" type="text" id="taskName" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="dueDate">Due Date:</label>
            <input v-model="editedDueDate" type="date" id="dueDate" class="w-full p-2 border rounded" required />
          </div>

           <!-- Dropdown for Participant Selection -->
        <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="participant">Assign to Participant:</label>
            <select v-model="selectedParticipantId" id="participant" class="w-full p-2 border rounded" required>
            <option disabled value="">Please select a participant</option>
            <option v-for="participant in uniqueParticipants" :key="participant.id" :value="participant.id">
                {{ participant.first_name }} {{ participant.last_name }}
            </option>
            </select>
        </div>
            
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="completed">Completed:</label>
            <input type="checkbox" v-model="editedCompleted" id="completed" />
          </div>
          <div class="flex justify-between mt-4">
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Save Changes
            </button>
            <router-link to="/" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel
            </router-link>
          </div>
        </form>
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

const editedName = ref('');
const editedDueDate = ref('');
const editedCompleted = ref(false);
const task = ref(null);
const selectedParticipantId = ref('');  // Define selectedParticipantId

// Compute unique participants based on the tasks
const uniqueParticipants = computed(() => {
  const participantsMap = new Map();

  // Iterate over tasks and add each participant to the map
  taskStore.tasks.forEach(task => {
    if (task.participant && !participantsMap.has(task.participant.id)) {
      participantsMap.set(task.participant.id, task.participant);
    }
  });

  // Convert map to array to use in dropdown
  return Array.from(participantsMap.values());
});

// Function to initialize task fields for editing
const initializeEditableFields = () => {
  editedName.value = task.value.name;
  editedDueDate.value = task.value.due_date;
  editedCompleted.value = task.value.completed;
  selectedParticipantId.value = task.value.participant?.id || ''; // Set the participant ID
};

// Fetch tasks and initialize the specific task based on the route ID
onMounted(async () => {
  await taskStore.fetchTasks();  // Fetch tasks from the store

  task.value = taskStore.tasks.find(t => t.id === parseInt(route.params.id));

  if (task.value) {
    initializeEditableFields();
  } else {
    console.error(`Task with ID ${route.params.id} not found.`);
    router.push('/');
  }
});

const saveChanges = async () => {
  if (!task.value) {
    console.error('Task is not defined');
    return;
  }

  const updatedTask = {
    name: editedName.value,
    due_date: editedDueDate.value,
    completed: editedCompleted.value,
    participant_id: selectedParticipantId.value,  // Use the selected participant ID
  };

  try {
    await taskStore.updateTask(task.value.id, updatedTask);
    console.log('Task updated successfully');
    router.push(`/task/${task.value.id}`); // Navigate back to task detail after saving
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};
</script>
  