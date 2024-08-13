<template>

<div class="overflow-x-auto max-w-4xl ml-10 mr-10 mt-5 bg-white shadow-md rounded-lg">
  <div class="max-w-lg mx-auto">
      
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
      Manage Participants
    </h2>
       <!-- Back Button -->
    <div class="mb-4 text-left">
      <router-link to="/" class="text-blue-500 hover:underline">&larr; Back to Task List</router-link>
      
       <!-- Back to Task List Button -->
     <router-link
        to="/"
        class="mt-3 ml-5 inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Back to Task List
      </router-link>
   
    </div>
    
 <!-- Participants Table -->
 <div class="overflow-hidden">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">First Name</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Last Name</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in participants" :key="participant.id" :class="index % 2 === 0 ? 'bg-white border-b' : 'bg-gray-100 border-b'">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ participant.id }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ participant.first_name }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ participant.last_name }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ participant.email }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <router-link 
                  :to="`/participants/${participant.id}/edit`" 
                  class="text-blue-600 hover:underline">
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  
      <!-- Add New Participant Button -->
      <button
        @click="showForm = !showForm"
        class="mb-4 mt-5 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
  
     
    </div>
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
  