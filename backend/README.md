# Backend Folder - Django REST API

This README provides instructions on how to set up and run the backend of this Django REST API project. The backend serves API endpoints and the Django admin interface. This project does not directly serve the frontend at the root URL (`http://127.0.0.1:8000/`), but instead, it serves data through specific API endpoints and provides an admin interface.

## Prerequisites

Ensure you have the following installed on your local machine:

- Python 3.8+
- pip (Python package installer)
- virtualenv (optional, but recommended)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://han-11/apiintegration.git
   cd backend
   ```

2. **Create a Virtual Environment**

   It is recommended to create a virtual environment to manage dependencies.

   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies**

   Install all required Python packages using `pip`:

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**

   Apply the necessary database migrations:

   ```bash
   python3 manage.py migrate
   ```

5. **Create a Superuser**

   Create an admin user to access the Django admin interface:

   ```bash
   python3 manage.py createsuperuser
   ```

   Follow the prompts to set up your admin credentials.

6. **Run the Development Server**

   Start the Django development server:

   ```bash
   python3 manage.py runserver
   ```

7. **Accessing the Application**

   - **Django Admin Interface:**  
     To manage your data via the Django admin, navigate to:
     ```
     http://127.0.0.1:8000/admin
     ```

   - **API Endpoints:**
     - **Tasks API:**  
       Access the tasks endpoint to view, create, update, or delete tasks:
       ```
       http://127.0.0.1:8000/api/tasks
       ```
       
     - **Participants API:**  
       Access the participants endpoint to view, create, update, or delete participants:
       ```
       http://127.0.0.1:8000/api/participants
       ```

## Project Structure

The backend folder contains the following key files and directories:

- **`manage.py`**: Django's command-line utility.
- **`backend/settings.py`**: Django settings, including configurations for installed apps, middleware, database, templates, and static files.
- **`backend/urls.py`**: URL configurations for the project.
- **`api/`**: Contains the Django app where the API logic resides, including models, views, serializers, and URL routing.
- **`requirements.txt`**: List of Python packages required to run the project.

## API Endpoints

### Tasks

- **GET** `/api/tasks/`: List all tasks.
- **POST** `/api/tasks/`: Create a new task.
- **GET** `/api/tasks/<id>/`: Retrieve a specific task by ID.
- **PUT** `/api/tasks/<id>/`: Update a specific task by ID.
- **DELETE** `/api/tasks/<id>/`: Delete a specific task by ID.

### Participants

- **GET** `/api/participants/`: List all participants.
- **POST** `/api/participants/`: Create a new participant.
- **GET** `/api/participants/<id>/`: Retrieve a specific participant by ID.
- **PUT** `/api/participants/<id>/`: Update a specific participant by ID.
- **DELETE** `/api/participants/<id>/`: Delete a specific participant by ID.

## Notes

- Make sure your frontend is served separately if you're integrating with a Vue.js frontend.
- For security purposes, remember to turn off `DEBUG` in a production environment.

## Troubleshooting

- **TemplateDoesNotExist**: If you see this error, ensure that your Vue.js frontend is served separately, or ensure that the templates directory is correctly configured in `settings.py`.
- **Database Errors**: Ensure that migrations are applied (`python3 manage.py migrate`) and the database is correctly configured in `settings.py`.

