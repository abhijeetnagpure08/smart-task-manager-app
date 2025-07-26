# Smart Task Manager

A real-time collaborative task management web application built with Next.js and Node.js. This application allows multiple users to create, assign, and track tasks with dependencies and priority levels.

## 🚀 Features

### User Management
- ✅ Create new users
- ✅ Mock authentication system (no password hashing)
- ✅ View all registered users
- ✅ User session management

### Task Management
- ✅ Create tasks with title, description, priority, and status
- ✅ Assign tasks to users
- ✅ Set task dependencies (Task B depends on Task A)
- ✅ Update and delete tasks
- ✅ Mark tasks as complete (with dependency validation)
- ✅ View personal tasks ("My Tasks")
- ✅ View blocked tasks (tasks waiting for dependencies)

### Task Properties
- *Priority Levels*: Low, Medium, High
- *Status Types*: To Do, In Progress, Done
- *Dependencies*: Tasks can depend on other tasks being completed first
- *Real-time Updates*: In-memory state management for instant updates


## 🛠 Tech Stack

### Frontend
- *Framework*: React with Vite
- *Styling*: CSS3 with modern features
- *HTTP Client*: Fetch API
- *Routing*: React Router DOM

### Backend
- *Runtime*: Node.js
- *Framework*: Express.js
- *Database*: In-memory storage using JavaScript Map
- *CORS*: Enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
bash
git clone <repository-url>
cd smart-task-manager


### 2. Backend Setup
bash
cd backend
npm install
npm start

The backend server will run on http://localhost:5000

### 3. Frontend Setup
bash
cd frontend
npm install
npm run dev

The frontend application will run on http://localhost:5173

## 📡 API Endpoints

### User Endpoints

```http
POST   /api/users/create      # Create new user
POST   /api/users/login       # Login user
GET    /api/users             # Get all users
```

### Task Endpoints

```http
GET /api/tasks # Get all tasks
POST /api/tasks/create # Create new task
PUT /api/tasks/update/:id # Update task
DELETE /api/tasks/delete/:id # Delete task
PUT /api/tasks/assign/:id # Assign task to user
PUT /api/tasks/dependencies/:id # Add dependencies to task
PUT /api/tasks/complete/:id # Mark task as complete
GET /api/tasks/user/:userId # Get tasks for specific user
GET /api/tasks/blocked # Get blocked tasks
```

## 🏗 Project Structure

```bash
smart-task-manager/
├── frontend/
│ ├── public/
│ │ └── favicon.ico
│ ├── src/
│ │ ├── assets/ # Static assets
│ │ ├── components/ # Reusable UI components
│ │ │ ├── FilterBar.jsx
│ │ │ ├── TaskCard.jsx
│ │ │ └── TaskForm.jsx
│ │ ├── pages/ # Page components
│ │ │ ├── BlockedTasksPage.jsx
│ │ │ ├── HomePage.jsx
│ │ │ ├── LoginPage.jsx
│ │ │ └── MyTasksPage.jsx
│ │ ├── services/ # API services
│ │ │ └── api.jsx
│ │ ├── App.jsx # Main application
│ │ ├── App.css
│ │ ├── index.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── backend/
├── controllers/
│ ├── taskController.js
│ └── userController.js
├── models/
│ ├── taskModel.js
├── routes/
│ ├── taskRoutes.js
│ └── userRoutes.js
├── db.js # In-memory database
├── index.js # Express server
├── store.js 
└── package.json
```




## 🎯 Usage Guide

### Getting Started
1. *Create a User*: Navigate to the registration page and create a new user account
2. *Login*: Use your credentials to log into the system
3. *Create Tasks*: Start creating tasks with titles, descriptions, and priorities
4. *Assign Tasks*: Assign tasks to yourself or other users
5. *Set Dependencies*: Create task dependencies to manage workflow
6. *Track Progress*: Monitor task status and completion

### Task Dependencies
- Tasks can depend on other tasks being completed first
- Dependent tasks cannot be marked as "Done" until their dependencies are complete
- View blocked tasks to see which tasks are waiting for dependencies
- The system automatically validates dependency chains

### Task Management
- *My Tasks*: View all tasks assigned to you
- *All Tasks*: See the complete task list (admin view)
- *Blocked Tasks*: View tasks that cannot be completed due to pending dependencies
- *Filtering*: Filter tasks by status, priority, or assigned user

## 🔧 Configuration

### Backend Configuration
The backend uses an in-memory database that resets on server restart. Configuration options:

javascript
// server.js
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';


### Frontend Configuration
javascript
// src/services/api.jsx
const API_BASE_URL = 'http://localhost:5000/api';


## 🧪 Development

### Running in Development Mode
bash
# Backend (with nodemon for auto-restart)
cd backend
npm run start

# Frontend (with hot reload)
cd frontend
npm run dev


### Code Structure Guidelines
- *Components*: Reusable UI components in /src/components/
- *Pages*: Route-level components in /src/pages/
- *Services*: API calls and external services in /src/services/
- *Controllers*: Business logic in /backend/controllers/
- *Models*: Data models in /backend/models/

## 🚨 Important Notes

- *In-Memory Storage*: All data is stored in memory and will be lost when the server restarts
- *Mock Authentication*: No password hashing or secure authentication implemented
- *No Persistence*: This is designed for demonstration purposes only
- *Real-time Updates*: Changes are reflected immediately due to in-memory storage

For production use, implement proper security measures including authentication, authorization, input validation, and persistent storage.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂ Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

*Happy Task Managing! 🎉*
