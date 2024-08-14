// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskList from './components/TaskList.vue';
import AddTask from './components/AddTask.vue';
import TaskDetail from './components/TaskDetail.vue';
// import EditTask from './components/EditTask.vue';
import ParticipantList from './components/ParticipantList.vue';




const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },

  {
    path: '/add-task',
    name: 'AddTask',
    component: AddTask,
  },

  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    props: true, // Pass route params as props
  },

  // {
  //   path: '/task/:id/edit',
  //   name: 'EditTask',
  //   component: EditTask,
  // },

  {
    path: '/participants',
    name: 'ParticipantList',
    component: ParticipantList,
  },
  
  // {
  //   path: '/participants/:id/edit',
  //   name: 'EditParticipant',
  //   component: EditParticipant,
  //   props: true, // Pass route params as props
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

