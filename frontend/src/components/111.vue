<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Task ID</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Task Name</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Due Date</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Completed</th>
        <th scope="col" class="px-4 sm:px-6 py-3 sm:py-5">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="taskStore.tasks.length === 0">
        <td colspan="5" class="p-3 px-4 sm:px-6 py-4 text-sm font-medium text-center">
          No tasks available.
        </td>
      </tr>
      <template v-for="(task, index) in taskStore.tasks" :key="task.id">
        <TaskItem
          :task="task"
          :index="index"
          @toggle-task="toggleTaskCompletion"
          @delete-task="deleteTask"
        />
      </template>
    </tbody>
  </table>



<!-- taskItem -->

<template>
    <tr
      :class="index % 2 === 0 ? 'bg-bluegray' : 'bg-primary'"
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th scope="row" class="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <router-link :to="'/task/' + task.id" class="text-primary-iron">
          #{{ task.id }}
        </router-link>
      </th>
      <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
        <router-link :to="'/task/' + task.id" :class="{ 'line-through text-primary-dark': task.completed, 'text-primary-iron': !task.completed }">
          {{ task.name }}
        </router-link>
      </td>
      <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-primary-iron">
        {{ task.due_date }}
      </td>
      <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTaskCompletion"
          class="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded "
        />
      </td>
      <td class="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap flex items-center space-x-2">
        <router-link :to="'/task/' + task.id" class="text-bluegray-haze hover:text-blue ml-2 mr-4">
          <i class="pi pi-eye"></i>
        </router-link>
  
        <button @click="deleteTask" class="text-bluegray-haze hover:text-red-700 ml-2">
          <i class="pi pi-trash"></i>
        </button>
      </td>
    </tr>
  </template>