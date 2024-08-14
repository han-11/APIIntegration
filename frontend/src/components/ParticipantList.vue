<template>
  <div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark shadow-md rounded-lg mx-8">
      <div class="py-8 px-4 sm:px-6 lg:px-8 bg-primary-dark rounded-lg mx-8">
        <h2 class="text-xl sm:text-2xl font-bold text-center text-primary-iron mb-4">
          Manage Participants
        </h2>
        
        <!-- Back Button and Toggle Form Button -->
        <div class="mb-4 flex justify-between items-center">
          <router-link to="/" class="text-primary-iron hover:text-blue ml-4">
            <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
          </router-link>
          <button
            @click="showForm = !showForm"
            class="text-primary-iron hover:text-blue mr-4 md:mr-8 lg:mr-20"
          >
            <i :class="showForm ? 'pi pi-times' : 'pi pi-user-plus'" style="font-size: 1.5rem"></i>
          </button>
        </div>
        
        <!-- Participants Table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">ID</th>
                <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">First Name</th>
                <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Last Name</th>
                <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Email</th>
                <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(participant, index) in participants" :key="participant.id" :class="index % 2 === 0 ? 'bg-white border-b' : 'bg-primary-50 border-b'"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
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
                <td class="px-4 sm:px-6 py-2 sm:py-4 flex  justify-center space-x-2">
                  <button v-if="participant.isEditing" @click="saveParticipant(participant)" class="text-primary-iron hover:text-green-600 ">
                    <i class="pi pi-check" style="font-size: 1rem"></i>
                  </button>
                  <button v-else @click="editParticipant(participant)" class="text-primary-iron hover:text-green-500 mr-5">
                    <i class="pi pi-user-edit" style="font-size: 1rem"></i>
                  </button>
                  <button v-if="participant.isEditing" @click="cancelEdit(participant)" class="text-primary-iron hover:text-orange-500 ml-2">
                    <i class="pi pi-times" style="font-size: 1rem"></i>
                  </button>
                  <button @click="deleteParticipant(participant.id)" class="text-primary-iron hover:text-red-700 ml-2">
                    <i class="pi pi-trash" style=" font-size: 1rem"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Form to Add New Participant and Task -->
        <form v-if="showForm" @submit.prevent="addParticipant" class="space-y-4 mt-8">
          <div>
            <label for="first_name" class="block text-sm font-medium text-primary-iron">First Name</label>
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
            <label for="last_name" class="block text-sm font-medium text-primary-iron">Last Name</label>
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
            <label for="email" class="block text-sm font-medium text-primary-iron">Email</label>
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
            <label for="task_name" class="block text-sm font-medium text-primary-iron">Task Name</label>
            <input
              v-model="newTask.name"
              type="text"
              id="task_name"
              placeholder="Enter task name"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="due_date" class="block text-sm font-medium text-primary-iron">Due Date</label>
            <input
              v-model="newTask.due_date"
              type="date"
              id="due_date"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:text-primary hover:bg-bluegray-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
          >
            Add Participant and Task
          </button>
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
