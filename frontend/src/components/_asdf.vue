<template>
  <div class="bg-white overflow-hidden shadow rounded-lg border max-w-lg mx-auto mt-10">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-lg leading-6 font-medium text-gray-900">
        Task Detail
      </h2>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Detailed information about the selected task.
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200" v-if="task">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Task ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ task.id }}</dd>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Name</dt>
          <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <input v-if="isEditing.name" v-model="editedName" type="text" class="w-full p-2 border rounded" />
            <span v-else>{{ task.name }}</span>
          </dd>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Due Date</dt>
          <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <input v-if="isEditing.due_date" v-model="editedDueDate" type="date" class="w-full p-2 border rounded" />
            <span v-else>{{ task.due_date }}</span>
          </dd>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Assigned to</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input v-if="isEditing.participant" v-model="selectedParticipantId" type="text" class="w-full p-2 border rounded" />
            <span v-else>{{ task.participant.first_name }} {{ task.participant.last_name }}</span>
          </dd>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Completed</dt>
          <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <input v-if="isEditing.completed" v-model="editedCompleted" type="checkbox" class="text-black border border-gray-300 rounded" />
            <span v-else>{{ task.completed ? 'Yes' : 'No' }}</span>
          </dd>
        </div>
        <div class="flex justify-between px-4 py-3 sm:px-6">
          <button v-if="isEditing.name || isEditing.due_date || isEditing.participant || isEditing.completed" @click="updateTask" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Save Changes
          </button>
          <button v-else @click="editTask" class="text-blue-600 hover:text-green-500"><i class="pi pi-user-edit" style="font-size: 1rem"></i></button>
          <button @click="deleteTask" class="text-red-500 hover:text-red-700 ml-2">
            <i class="pi pi-trash"></i> Delete Task
          </button>
        </div>
      </dl>

      <div v-else class="px-4 py-5 sm:px-6">
        <p class="text-center text-red-500">Task not found.</p>
      </div>
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

const task = ref(null);
const editedName = ref('');
const editedDueDate = ref('');
const editedCompleted = ref(false);
const selectedParticipantId = ref('');
const isEditing = ref({
  name: false,
  due_date: false,
  participant: false,
  completed: false,
});

onMounted(async () => {
  await taskStore.fetchTasks(); // Fetch tasks from the store

  task.value = taskStore.tasks.find(t => t.id === parseInt(route.params.id));

  if (task.value) {
    editedName.value = task.value.name;
    editedDueDate.value = task.value.due_date;
    editedCompleted.value = task.value.completed;
    selectedParticipantId.value = task.value.participant?.id || '';
  } else {
    console.error(`Task with ID ${route.params.id} not found.`);
    router.push('/');
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
    console.error('Task is not defined');
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
    console.log('Task updated successfully');
    router.push(`/task/${task.value.id}`); // Navigate back to task detail after saving
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};

const deleteTask = async () => {
  if (confirm(`Are you sure you want to delete the task "${task.value.name}"?`)) {
    try {
      await taskStore.deleteTask(task.value.id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }
};
</script>
