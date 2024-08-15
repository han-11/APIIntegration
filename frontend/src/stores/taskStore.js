// src/store/taskStore.js
import { defineStore } from 'pinia';
import apiClient from '@/api';
import axios from 'axios';

// Create a new store instance.
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    participants: [],

  }),

  actions: {

    // Fetch all tasks from the API
    async fetchTasks() {
      try {
        const response = await apiClient.get('/tasks/');  // Correct URL
        this.tasks = response.data;
        console.log(this.tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    },

    // Add a new task to the API
    async addTask(task) {
      try {
        // Extracting only the relevant fields to send to the API
        const taskData = {
          name: task.name,
          due_date: task.due_date,
          completed: task.completed,
          participant_id: task.participant_id  // Send only the participant ID
        };
        
        // Sending the task data to the API
        const response = await apiClient.post('/tasks/', taskData);
        this.tasks.push(response.data);  // Updating the store with the new task

      } catch (error) {
        console.error('Failed to add task:', error.response ? error.response.data : error.message);
      }
    },

    // Delete task from the API
    async deleteTask(id) {
      try {
        console.log('Received task ID in store:', id);  // Log the ID received in the store
    
        if (!id) {
          throw new Error('Task ID is undefined');
        }
    
        const response = await apiClient.delete(`/tasks/${id}/`);
        console.log('DELETE request sent to:', `/tasks/${id}/`);  // Log the exact URL being called
    
        this.tasks = this.tasks.filter(task => task.id !== id);
        console.log('Deleted task with id:', id);
    
      } catch (error) {
        console.error('Failed to delete task:', error.response ? error.response.data : error.message);
      }
    },

// Update task details in the API
    async updateTask(id, updatedTask) {
      try {
        const taskData = {
          name: updatedTask.name,
          due_date: updatedTask.due_date,
          completed: updatedTask.completed,
          participant_id: updatedTask.participant_id // Ensure this field is included
        };
    
        const response = await apiClient.put(`/tasks/${id}/`, taskData);
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;  // Update the task in the store
        }
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
    
    // Toggle task completion status
    async toggleTaskCompletion(taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        try {
          // Toggle the completion status
          const updatedTask = {
            ...task,
            completed: !task.completed,
            participant_id: "1" // Ensure participant_id is included
          };
          const response = await apiClient.put(`/tasks/${taskId}/`, updatedTask);

          // Update the task in the store with the latest data from the server
          const index = this.tasks.findIndex(t => t.id === taskId);
          if (index !== -1) {
            this.tasks[index] = response.data;
          }
          console.log('Task completion toggled:', response.data);

        } catch (error) {
          console.error('Failed to toggle task completion:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error(`Task with ID ${taskId} not found.`);
      }
    },
  
    // Fetch all participants from the API
    async fetchParticipants() {
      console.log('fetchParticipants function called');
      try {
        const response = await apiClient.get('/participants/');
        console.log('Full Response:', response);
        this.participants = response.data;
        console.log('Participants:', this.participants);
    
      } catch (error) {
        console.error('Error fetching participants:', error.message);
        console.error('Error Details:', error);
      }
    },
    
    // Assign new participant to a task
    async assignParticipantToTask(taskId, participantId) {
      try {
        await apiClient.post(`/tasks/${taskId}/assign/`, { participantId }); // Use apiClient for consistency
        // Refresh tasks to show updated assignment
        await this.fetchTasks(); // Assuming fetchTasks is the correct method to refresh the task list
      } catch (error) {
        console.error('Error assigning participant:', error.message);
      }
    },
    
    // Add new participant function
    async addParticipant(participant) {
      try {
        const response = await apiClient.post('/participants/', participant);
        this.participants.push(response.data);
        return response.data; // Return the added participant for further use
      } catch (error) {
        console.error('Error adding participant:', error.message);
        throw error;
      }
    },

    // Update participant details 
    async updateParticipant(updatedParticipant) {
      try {
        const response = await apiClient.put(`/participants/${updatedParticipant.id}/`, updatedParticipant);
        const index = this.participants.findIndex(p => p.id === updatedParticipant.id);
        if (index !== -1) {
          this.participants[index] = response.data; // Update the participant in the store
          console.log('Participant updated:', response.data);
        }
      } catch (error) {
        console.error('Failed to update participant:', error.message);
        throw error;
      }
    },

    // Delete participant 
    async deleteParticipant(id) {
      try {
        await apiClient.delete(`/participants/${id}/`);
        this.participants = this.participants.filter(participant => participant.id !== id);
      } catch (error) {
        console.error('Failed to delete participant:', error.message);
      }
    },

  }
});
