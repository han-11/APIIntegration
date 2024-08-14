<template>


<div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark shadow-md rounded-lg mx-8">
      
      <div class="py-10 px-10 inline-block min-w-full sm:px-4 lg:px-8 bg-primary-dark ">
        
       
        <h2 class="text-2xl font-bold text-center text-bluegray-10 mb-4">
          Add New Task
        </h2>

        <!-- Back Button -->

        <div class="mb-4 text-left ml-10">
          <router-link to="/" class="text-primary-iron hover:text-blue">
            <i class="pi pi-arrow-left" style="font-size: 1.5rem"></i>
          </router-link>
        </div>
        
        <div class="overflow-x-auto  py-8 px-4 sm:px-6 lg:px-8 bg-bluegray-10 rounded-lg mx-8">
        
        <form @submit.prevent="addTask">
          <!-- Task Name Input -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="taskName">Name:</label>
            <input v-model="taskName" type="text" id="taskName"
            placeholder="Enter task name"
            class="mt-1 block w-full p-2  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required />
          </div>

          <!-- Due Date Input -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="dueDate">Due Date:</label>
            <input v-model="dueDate" type="date" id="dueDate" 
            class="mt-1 block w-full p-2 rounded-md shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required />
          </div>

          <!-- Dropdown for Participant Selection -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="participant">Assign to Participant:</label>
            <select v-model="selectedParticipantId" id="participant" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              <option disabled value="" selected>Please select a participant</option>
              <option v-for="participant in uniqueParticipants" :key="participant.id" :value="participant.id">
                {{ participant.first_name }} {{ participant.last_name }}
              </option>
            </select>
          </div>
          <button type="submit" class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark ">Add Task</button>
        </form>
      </div>
    </div>
  </div>
</div>






</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const taskStore = useTaskStore();
const router = useRouter();
const taskName = ref('');
const dueDate = ref('');
const selectedParticipantId = ref('');  // Define selectedParticipantId

onMounted(async () => {
  // Fetch tasks including participant data on component mount
  await taskStore.fetchTasks();

  // Fetch participants from the store
  if (!taskStore.participants.length) {
    await taskStore.fetchParticipants(); // Fetch participants only if not already fetched
  }
});

// Use the participants directly from the store to ensure all participants are included
const uniqueParticipants = computed(() => {
  return taskStore.participants;  // This will give you all participants, not just those with tasks
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

