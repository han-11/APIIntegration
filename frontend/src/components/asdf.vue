

 <!-- Task Table -->
 <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Task ID</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Task Name</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Due Date</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Completed</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="taskStore.tasks.length === 0" class="bg-gray-100 border-b">
              <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                No tasks available.
              </td>
            </tr>
            <tr
              v-for="task in taskStore.tasks"
              :key="task.id"
              :class="index % 2 === 0 ? 'bg-white border-b' : 'bg-gray-100 border-b'"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <TaskItem
                            v-for="task in taskStore.tasks"
                            :key="task.id"
                            :task="task"
                            @toggle-task="toggleTaskCompletion"
                        />
                        </td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>