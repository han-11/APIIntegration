<div class="flex justify-center px-4 md:px-6 lg:px-8">
  <div class="overflow-x-auto w-2/3 max-w-4xl mx-5 my-5 shadow-md rounded-md">
    <div class="py-10 px-10 inline-block min-w-full sm:px-4 lg:px-8 bg-primary-dark">
      <h2 class="text-2xl font-bold text-center text-bluegray-haze dark:text-zinc-50 mb-4">
        Add New Task
      </h2>

      <!-- Back Button -->
      <div class="mb-4 text-left">
        <router-link to="/" class="text-primary-iron hover:text-primary-dark">
          <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
        </router-link>
      </div>

      <form @submit.prevent="addTask">
        <!-- Task Name Input -->
        <div class="mb-4">
          <label class="block text-primary-iron font-semibold mb-2" for="taskName">Name:</label>
          <input v-model="taskName" type="text" id="taskName" class="w-full p-2 border rounded" required />
        </div>

        <!-- Due Date Input -->
        <div class="mb-4">
          <label class="block text-primary-iron font-semibold mb-2" for="dueDate">Due Date:</label>
          <input v-model="dueDate" type="date" id="dueDate" class="w-full p-2 border rounded text-primary-iron" required />
        </div>

        <!-- Dropdown for Participant Selection -->
        <div class="mb-4">
          <label class="block text-primary-iron font-semibold mb-2" for="participant">Assign to Participant:</label>
          <select v-model="selectedParticipantId" id="participant" class="w-full p-2 border rounded text-primary" required>
            <option disabled value="">Please select a participant</option>
            <option v-for="participant in uniqueParticipants" :key="participant.id" :value="participant.id">
              {{ participant.first_name }} {{ participant.last_name }}
            </option>
          </select>
        </div>
        <button type="submit" class="bg-primary-50 text-white hover:text-primary px-4 py-2 rounded hover:bg-bluegray-10">Add Task</button>
      </form>
    </div>
  </div>
</div>