<template>
  <div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark shadow-md rounded-lg mx-8">
      <div class="py-8 px-4 sm:px-6 lg:px-8 bg-primary-dark rounded-lg mx-8">
        <h2 class="text-xl sm:text-2xl font-bold text-center text-bluegray-10 mb-4">
          Manage Participants
        </h2>
        
        <!-- Back Button and Toggle Form Button -->
        <div class="mb-4 flex justify-between items-center">
          <router-link to="/" class="text-primary-iron hover:text-blue ml-4">
            <i class="pi pi-arrow-left" style="font-size: 1.5rem"></i>
          </router-link>
          <button
            @click="showForm = !showForm"
            class="text-primary-iron hover:text-blue mr-3 md:mr-7 lg:mr-20"
          >
            <i :class="showForm ? 'pi pi-times' : 'pi pi-user-plus'" style="font-size: 1.7rem"></i>
          </button>
        </div>
        
        <!-- Participants Table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-700">
    <thead class="text-sm text-gray-700 uppercase bg-bluegray-15">
      <tr>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">ID</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">First Name</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Last Name</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Email</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(participant, index) in participants" :key="participant.id" :class="index % 2 === 0 ? 'bg-bluegray-10' : 'bg-white'"
        class="border-b border-gray-300 hover:bg-bluegray-50">
        <td scope="row" class="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-700 whitespace-nowrap">
          {{ participant.id }}
        </td>
        
        <!-- First Name Column -->
        <td class="px-4 sm:px-6 py-2 sm:py-4">
          <input v-if="participant.isEditing" v-model="participant.first_name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
          <span v-else>{{ participant.first_name }}</span>
        </td>

        <!-- Last Name Column -->
        <td class="px-4 sm:px-6 py-2 sm:py-4">
          <input v-if="participant.isEditing" v-model="participant.last_name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
          <span v-else>{{ participant.last_name }}</span>
        </td>

        <!-- Email Column -->
        <td class="px-4 sm:px-6 py-2 sm:py-4">
          <input v-if="participant.isEditing" v-model="participant.email" type="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
          <span v-else>{{ participant.email }}</span>
        </td>

        <!-- Actions Column -->
        <td class="px-4 sm:px-6 py-2 sm:py-4 flex justify-center space-x-2 ">
          <button v-if="participant.isEditing" @click="saveParticipant(participant)" class="text-primary hover:text-green-600">
            <i class="pi pi-check" style="font-size: 1.2rem"></i>
          </button>
          <button v-else @click="editParticipant(participant)" class="text-primary hover:text-blue ">
            <i class="pi pi-user-edit" style="font-size: 1.2rem"></i>
          </button>
          <button v-if="participant.isEditing" @click="cancelEdit(participant)" class="text-primary hover:text-orange-500">
            <i class="pi pi-times" style="font-size: 1.2rem"></i>
          </button>
          <button @click="deleteParticipant(participant.id)" class="text-primary hover:text-red-600">
            <i class="pi pi-trash" style="font-size: 1.2rem"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
        </div>

        <!-- Form to Add New Participant and Task -->
        
        <form v-if="showForm" @submit.prevent="addParticipant" class="space-y-4 mt-8">
          <div class="overflow-x-auto  py-8 px-4 sm:px-6 lg:px-8 bg-bluegray-10 rounded-lg mx-8 my-8">
          <h2 class="text-xl  text-center font-semibold text-primary mb-4">
            Add New Participant and Task
          </h2>
          <div class="mt-2 mb-1" >
            <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="newParticipant.first_name"
              type="text"
              id="first_name"
              placeholder="Enter first name"
              class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Last Name Input -->
          <div class="mt-2 mb-1">
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

          <!-- Email Input -->
          <div class="mt-2 mb-1">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="newParticipant.email"
              type="email"
              id="email"
              placeholder="Enter email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div class="mt-2 mb-1">

          <!-- Task Name Input -->
          <div class="mt-2 mb-1">
            <label for="task_name" class="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              v-model="newTask.name"
              type="text"
              id="task_name"
              placeholder="Enter task name"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- Due Date Input -->
          <div class="mt-2 mb-1">
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
            class="mt-3 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
          >
            Add Participant and Task
          </button>
        </div>
        </form>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const participants = computed(() => taskStore.participants);

const showForm = ref(false); // Controls visibility of the form

// Define an object to hold the new participant and task data
const newParticipant = ref({
  first_name: '',
  last_name: '',
  email: '',
});

const newTask = ref({
  name: '',
  due_date: '',
});

// Fetch participants when the component is mounted
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



// Function to enable editing
const editParticipant = (participant) => {
  participant.isEditing = true;
};

// Function to cancel editing and revert to the original values
const cancelEdit = (participant) => {
  if (participant.original) {
    participant.first_name = participant.original.first_name;
    participant.last_name = participant.original.last_name;
    participant.email = participant.original.email;
  } else {
    console.error('Original data not found');
  }
  participant.isEditing = false;
};

// Function to save the updated participant information
const saveParticipant = async (participant) => {
  try {
    await taskStore.updateParticipant(participant);
    participant.isEditing = false;
  } catch (error) {
    console.error('Failed to update participant:', error.message);
  }
};

// Function to delete a participant
const deleteParticipant = async (id) => {
  if (confirm('Are you sure you want to delete this participant?')) {
    try {
      await taskStore.deleteParticipant(id);
    } catch (error) {
      console.error('Failed to delete participant:', error.message);
    }
  }
};

</script>
