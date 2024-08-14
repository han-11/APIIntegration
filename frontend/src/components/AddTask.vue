<template>
<div class="flex justify-center">
<div class="overflow-x-auto  w-2/3 max-w-4xl mx-5 my-5 bg-white shadow-md rounded-lg">
  <div class="max-w-lg mx-auto bg-white rounded-lg p-6">
    <h2 class="text-2xl font-bold text-center text-sky-800 dark:text-sky-600 mb-4">
      Add New Task
    </h2>

    <!-- Back Button -->
    <div class="mb-4 text-left">
          <router-link to="/" class="text-sky-600 hover:text-sky-800"><i class="pi pi-arrow-left" style="font-size: 1rem"></i></router-link>
        </div>

    <form @submit.prevent="addTask">
      <!-- Task Name Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2" for="taskName">Name:</label>
        <input v-model="taskName" type="text" id="taskName" class="w-full p-2 border rounded" required />
      </div>

      <!-- Due Date Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2" for="dueDate">Due Date:</label>
        <input v-model="dueDate" type="date" id="dueDate" class="w-full p-2 border rounded" required />
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
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  </div>
</div>
</div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted, computed } from 'vue';

const taskStore = useTaskStore();
const router = useRouter();
const taskName = ref('');
const dueDate = ref('');
const selectedParticipantId = ref('');  // Define selectedParticipantId

onMounted(() => {
  taskStore.fetchTasks();  // Fetch tasks including participant data on component mount
});

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

const addTask = async () => {
  if (taskName.value && dueDate.value && selectedParticipantId.value) {
    const newTask = {
      name: taskName.value,
      due_date: dueDate.value,
      completed: false,
      participant_id: selectedParticipantId.value  // Send only the participant ID
    };
    
    console.log("Adding task:", newTask); // Debugging log

    try {
      await taskStore.addTask(newTask);
      router.push('/'); // Navigate back to Task List after adding the task
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }
};
</script>
