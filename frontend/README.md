# Task Management System

A full-stack task management application built using the MERN stack.
Users can create, manage, and track their tasks with secure authentication.

## Features

* User registration and login
* JWT-based authentication
* Protected routes
* Create, view, update, and delete tasks
* Mark tasks as completed/incomplete
* Search and filter tasks
* User-specific task management
* Dashboard with task statistics
* Profile page
* Responsive layout

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Context API
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Project Structure

```
TASK_MANAGEMENT_SYSTEM/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    └── package.json
```

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm start
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

## Version

Current Release:

```
v0.0.1
```

## Future Improvements

* Better notification system
* Advanced dashboard analytics
* Improved authentication management
* More UI enhancements

---

Built as a MERN stack learning project focused on understanding full-stack development, authentication, and real-world application structure.


## Live Demo

Frontend:
https://task-management-system-htc3.vercel.app/

Backend:
https://task-management-system-71tp.onrender.com/