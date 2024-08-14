<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Edit Participant</h1>
  
      <form @submit.prevent="updateParticipant" class="space-y-4">
        <div>
          <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="participant.first_name"
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
            v-model="participant.last_name"
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
            v-model="participant.email"
            type="email"
            id="email"
            placeholder="Enter email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Participant
        </button>
      </form>
  
      <!-- Back to Manage Participants Button -->
      <router-link
        to="/participants"
        class="mt-8 inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Back to Manage Participants
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTaskStore } from '@/stores/taskStore';
  
  const route = useRoute();
  const router = useRouter();
  const taskStore = useTaskStore();
  
  const participant = ref({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  });

 

  
  onMounted(async () => {
    const participantId = route.params.id;
    const foundParticipant = taskStore.participants.find(p => p.id === participantId);
  
    if (foundParticipant) {
      participant.value = { ...foundParticipant };
    } else {
      router.push('/participants');
    }
  });
  
  const updateParticipant = async () => {
    try {
      await taskStore.updateParticipant(participant.value);
      router.push('/participants');
    } catch (error) {
      console.error('Error updating participant:', error.message);
    }
  };
  </script>
  