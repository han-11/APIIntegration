<template>
  <nav class="border-primary dark:bg-primary w-full">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://www.qed.software/assets/logo-7d911206.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-bluegray dark:text-bluegray-light mt-3">TaskTracker</span>
      </a>
      
         <!-- Hamburger Button: Visible when navbar is collapsed -->
         <button v-if="isCollapsed" @click="toggleNavbar" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" :aria-expanded="!isCollapsed">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>

      <!-- Close Button: Visible when the navbar is expanded -->
      <button v-if="!isCollapsed" @click="toggleNavbar" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default">
        <span class="sr-only">Close main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div :class="{'hidden': isCollapsed, 'block': !isCollapsed, 'md:block': true}" class="w-full md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-primary dark:border-gray-700">
          <li @click="collapseNavbar">
            <router-link 
            to="/" 
            class="block py-2 px-3 text-gray-900 rounded opacity-70 hover:opacity-100 hover:underline md:border-0 md:p-0 dark:text-white ">
            Home
            </router-link>
          </li>
          <li @click="collapseNavbar">
            <router-link to="/add-task" class="block py-2 px-3 text-gray-900 rounded opacity-70 hover:opacity-100 hover:underline md:border-0 md:p-0 dark:text-white ">Add New Task</router-link>
          </li>
          <li @click="collapseNavbar">
            <router-link to="/participants" class="block py-2 px-3 text-gray-900 rounded opacity-70 hover:opacity-100 hover:underline md:border-0 md:p-0 dark:text-white ">Manage Participants</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// Track whether the navbar is collapsed or expanded
const isCollapsed = ref(true);

// Function to toggle the navbar's collapsed state
const toggleNavbar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Function to collapse the navbar (used when clicking a link)
const collapseNavbar = () => {
  isCollapsed.value = true;
};
</script>
