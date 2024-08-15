<template>
  <div class="flex justify-center px-4 sm:px-6 lg:px-8">
    <div
      class="overflow-x-auto max-w-4xl mt-5 w-full bg-primary-dark shadow-md rounded-lg mx-8"
    >
      <div class="py-8 px-4 sm:px-6 lg:px-8 bg-primary-dark rounded-lg mx-8">
        <router-link to="/" class="text-primary-iron hover:text-sky-600 ml-10">
          <i class="pi pi-arrow-left" style="font-size: 1.5rem"></i>
        </router-link>

        <div class="ml-4 px-4 py-3 sm:px-6">
          <h2 class="text-lg leading-6 font-medium text-primary-iron">
            Task Detail
          </h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-400">
            Detailed information about the selected task.
          </p>
        </div>

        <!-- Showing Task Details fetched -->
        <div
          class="overflow-x-auto py-8 px-4 sm:px-6 lg:px-8 bg-bluegray-10 rounded-lg mx-8"
        >
          <div class="px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200" v-if="task">
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Task ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ task.id }}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Name</dt>
                <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <input
                    v-if="isEditing.name"
                    v-model="editedName"
                    type="text"
                    class="w-full p-2 border rounded"
                  />
                  <span v-else>{{ task.name }}</span>
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Due Date</dt>
                <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <input
                    v-if="isEditing.due_date"
                    v-model="editedDueDate"
                    type="date"
                    class="w-full p-2 border rounded"
                  />
                  <span v-else>{{ task.due_date }}</span>
                </dd>
              </div>

              <!-- Participant Selection -->
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Assigned to</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div v-if="isEditing.participant">
                    <select
                      v-model="selectedParticipantId"
                      id="participant"
                      class="w-full p-2 border rounded"
                    >
                      <option disabled value="">
                        Please select a participant
                      </option>
                      <option
                        v-for="participant in uniqueParticipants"
                        :key="participant.id"
                        :value="participant.id"
                      >
                        {{ participant.first_name }} {{ participant.last_name }}
                      </option>
                    </select>
                  </div>
                  <span v-else
                    >{{ task.participant.first_name }}
                    {{ task.participant.last_name }}</span
                  >
                </dd>
              </div>

              <!-- Task Completion Toggle Function-->
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Completed</dt>
                <dd class="mt-1 ml-2 text-sm sm:mt-0 sm:col-span-2">
                  <input
                    v-if="isEditing.completed"
                    v-model="editedCompleted"
                    type="checkbox"
                    class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-iron dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-iron focus:ring-2 accent-primary"
                  />
                  <span v-else>{{ task.completed ? "Yes" : "No" }}</span>
                </dd>
              </div>
              <div class="flex justify-between px-4 py-3 sm:px-6">
                <button
                  v-if="
                    isEditing.name ||
                    isEditing.due_date ||
                    isEditing.participant ||
                    isEditing.completed
                  "
                  @click="updateTask"
                  class="text-primary px-4 py-2 rounded hover:text-green-500"
                >
                  <i class="pi pi-check" style="font-size: 1.2rem"></i>
                </button>
                <button
                  v-else
                  @click="editTask"
                  class="text-primary hover:text-sky-600 ml-10"
                >
                  <i class="pi pi-user-edit" style="font-size: 1.3rem"></i>
                </button>
                <button
                  @click="deleteTask"
                  class="text-primary hover:text-red-600 ml-2 mr-10"
                >
                  <i class="pi pi-trash" style="font-size: 1.2rem"></i>
                </button>
              </div>
            </dl>
            <!-- Show this information if no task found -->
            <div v-else class="px-4 py-5 sm:px-6">
              <p class="text-center text-red-500">Task not found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/taskStore";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const task = ref(null);
const editedName = ref("");
const editedDueDate = ref("");
const editedCompleted = ref(false);
const selectedParticipantId = ref("");
const isEditing = ref({
  name: false,
  due_date: false,
  participant: false,
  completed: false,
});

const uniqueParticipants = computed(() => {
  return taskStore.participants; // Access participants directly via .value
});

onMounted(async () => {
  await taskStore.fetchTasks(); // Fetch tasks from the store

  task.value = taskStore.tasks.find((t) => t.id === parseInt(route.params.id));

  if (task.value) {
    editedName.value = task.value.name;
    editedDueDate.value = task.value.due_date;
    editedCompleted.value = task.value.completed;
    selectedParticipantId.value = task.value.participant?.id || "";
  } else {
    console.error(`Task with ID ${route.params.id} not found.`);
    router.push("/");
  }

  // Fetch participants from the store
  if (!taskStore.participants.length) {
    await taskStore.fetchParticipants(); // Fetch participants only if not already fetched
  }
});

const editTask = () => {
  isEditing.value = {
    name: true,
    due_date: true,
    participant: true,
    completed: true,
  };
};

const updateTask = async () => {
  if (!task.value) {
    console.error("Task is not defined");
    return;
  }

  const updatedTask = {
    name: editedName.value,
    due_date: editedDueDate.value,
    completed: editedCompleted.value,
    participant_id: selectedParticipantId.value,
  };

  try {
    await taskStore.updateTask(task.value.id, updatedTask);
    console.log("Task updated successfully");

    // Update the task object locally to reflect the changes
    task.value = { ...task.value, ...updatedTask };
    task.value.participant =
      uniqueParticipants.value.find(
        (p) => p.id === selectedParticipantId.value
      ) || task.value.participant;

    // Reset editing state to close inline editing
    isEditing.value = {
      name: false,
      due_date: false,
      participant: false,
      completed: false,
    };
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const deleteTask = async () => {
  if (
    confirm(`Are you sure you want to delete the task "${task.value.name}"?`)
  ) {
    try {
      await taskStore.deleteTask(task.value.id);
      router.push("/");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }
};
</script>
