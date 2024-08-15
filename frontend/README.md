

# Frontend Project - Vue.js Application

This README provides instructions on how to set up and run the frontend of this project, which is built using Vue.js, Pinia for state management, Tailwind CSS for styling, Vue Router for client-side routing, Axios for HTTP requests, and PrimeIcons for icons.

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14.x or later)
- npm (Node package manager, comes with Node.js)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/han-11/APIIntegration.git
   cd frontend
   ```

2. **Install Dependencies**

   Install all required npm packages listed in the `requirements.txt`:

   ```bash
   npm install vue@^3.2.0 vue-router@^4.1.0 pinia@^2.0.0 tailwindcss@^3.2.0 postcss@^8.4.0 autoprefixer@^10.4.0 axios@^1.3.0 primeicons@^6.0.0
   ```

3. **Configure Environment Variables (Optional)**

   If your project requires environment-specific variables, create a `.env` file in the root of your project and add the necessary variables. For example:

   ```bash
   VUE_APP_API_BASE_URL=http://127.0.0.1:8000/api
   ```

   This can be used to set the base URL for your API endpoints.

4. **Run the Development Server**

   Start the Vue.js development server:

   ```bash
   npm run serve
   ```

   This will start the development server and open the application in your default web browser. By default, the application will be accessible at:

   ```
   http://localhost:8080
   ```

5. **Build for Production**

   To build the application for production, run:

   ```bash
   npm run build
   ```

   The built files will be output to the `dist` directory, which can be served by any static file server.

## Project Structure

The frontend folder contains the following key files and directories:

- **`src/`**: Contains the source code for the project, including components, views, store, and styles.
- **`src/main.js`**: The main entry point for the application.
- **`src/App.vue`**: The root component.
- **`src/components/`**: Directory for reusable Vue components.
- **`src/views/`**: Directory for view components (pages).
- **`src/stores/`**: Directory containing Pinia store modules for state management.
- **`src/router/`**: Contains the Vue Router configuration.
- **`src/assets/`**: Static assets such as images and fonts.
- **`src/styles/`**: Directory for global styles, including Tailwind CSS configuration.
- **`public/`**: Static files that will be served directly.
- **`dist/`**: Output directory for production builds.

## Key Technologies

### Vue.js

Vue.js is the progressive JavaScript framework used for building user interfaces. It offers a simple yet powerful API for building interactive web applications.

### Pinia (State Management)

Pinia is a state management library for Vue.js, providing a simple, intuitive API for managing global state across your application.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes for building custom designs without writing custom CSS. It allows you to rapidly build modern, responsive designs.

### Vue Router

Vue Router is the official router for Vue.js, enabling client-side routing and navigation between different views in your application.

### Axios

Axios is a promise-based HTTP client for making API requests. It is widely used for handling HTTP requests in a simple and efficient manner.

### PrimeIcons

PrimeIcons is an icon library that can be used with Vue components for consistent and scalable icons. It integrates seamlessly with Vue.js and is useful for adding icons to your application.

## Customization

### Tailwind CSS Configuration

Tailwind CSS can be customized by editing the `tailwind.config.js` file. This file allows you to extend the default theme, add custom colors, spacing, and more.

### Pinia Task Store

The task management logic is handled by Pinia. The store can be found in `src/stores/taskStore.js`. This store manages the state related to tasks, such as fetching tasks, adding new tasks, updating tasks, and deleting tasks.

### Vue Router

Vue Router is configured in `src/router/index.js`. This file defines the routes for the application and maps them to corresponding view components.

### Axios Configuration

Axios can be configured in `src/api.js` (or similar file) where you can set the base URL for API requests, define interceptors, and manage global settings for Axios requests.

## Deployment

To deploy the application, first build the project using:

```bash
npm run build
```

Then, serve the contents of the `dist` directory using a static file server or deploy it to a hosting service like Netlify, Vercel, or GitHub Pages.

## Troubleshooting

- **Styles Not Applying:** Ensure that Tailwind CSS is correctly configured in `src/main.js` and that `@tailwind` directives are included in your CSS.
- **State Not Persisting:** If you're experiencing issues with state management, check the Pinia store implementation and ensure that state changes are being properly committed.
- **Routing Issues:** If navigating between routes is not working as expected, verify the Vue Router configuration in `src/router/index.js`.
- **API Requests Failing:** If Axios requests are failing, ensure that the base URL is correctly set in your Axios configuration and that the backend server is running.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

