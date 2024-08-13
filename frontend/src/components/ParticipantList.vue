<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Participants</h1>
  
      <ul class="space-y-4 mb-8">
        <li
          v-for="participant in participants"
          :key="participant.id"
          class="p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <div class="text-lg font-medium text-gray-700">
            <div><strong>ID:</strong> {{ participant.id }}</div>
            <div><strong>Name:</strong> {{ participant.first_name }} {{ participant.last_name }}</div>
            <div><strong>Email:</strong> {{ participant.email }}</div>
          </div>
        </li>
      </ul>
  
      <!-- Add New Participant Button -->
      <button
        @click="showForm = !showForm"
        class="mb-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {{ showForm ? 'Cancel' : 'Add New Participant' }}
      </button>
  
      <!-- Form to Add New Participant and Task, shown only if showForm is true -->
      <form v-if="showForm" @submit.prevent="addParticipant" class="space-y-4">
        <div>
          <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="newParticipant.first_name"
            type="text"
            id="first_name"
            placeholder="Enter first name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
  
        <div>
          <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            v-model="newParticipant.last_name"
            type="text"
            id="last_name"
            placeholder="Enter last name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
  
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="newParticipant.email"
            type="email"
            id="email"
            placeholder="Enter email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
  
        <div>
          <label for="task_name" class="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            v-model="newTask.name"
            type="text"
            id="task_name"
            placeholder="Enter task name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div>
          <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            v-model="newTask.due_date"
            type="date"
            id="due_date"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Participant and Task
        </button>
      </form>
  
      <!-- Back to Task List Button -->
      <router-link
        to="/"
        class="mt-8 inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Back to Task List
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useTaskStore } from '@/stores/taskStore';
  
  const taskStore = useTaskStore();
  
  const participants = computed(() => taskStore.participants);
  
  const showForm = ref(false); // Controls visibility of the form
  
  const newParticipant = ref({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const newTask = ref({
    name: '',
    due_date: '',
  });
  
  onMounted(async () => {
    await taskStore.fetchParticipants();
  });
  
  const addParticipant = async () => {
    try {
      // Add the participant first
      const addedParticipant = await taskStore.addParticipant(newParticipant.value);
  
      // If a task name is provided, add the task and assign it to the participant
      if (newTask.value.name) {
        const taskWithParticipant = {
          ...newTask.value,
          participant_id: addedParticipant.id, // Assign the new participant to the task
        };
        await taskStore.addTask(taskWithParticipant);
      }
  
      // Reset form fields and hide the form
      newParticipant.value.first_name = '';
      newParticipant.value.last_name = '';
      newParticipant.value.email = '';
      newTask.value.name = '';
      newTask.value.due_date = '';
      showForm.value = false; // Hide the form after submission
    } catch (error) {
      console.error('Error adding participant or task:', error.message);
    }
  };
  </script>
  