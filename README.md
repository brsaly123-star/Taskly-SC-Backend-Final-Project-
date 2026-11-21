# Taskly – Student Task Management API

Taskly is a RESTful API for managing student tasks and assignments. This application helps students organize their academic activities by creating, tracking, updating, and managing tasks based on deadlines, priorities, and completion statuses.

## Features

- **Create Task** – Add new tasks with a title, description, deadline, and priority.
- **Get All Tasks** – Retrieve all tasks stored in the database.
- **Get Task by ID** – Retrieve detailed information about a specific task.
- **Update Task** – Update existing task information.
- **Update Task Status** – Change task status independently.
- **Delete Task** – Remove a task from the database.
- **Search Tasks** – Search tasks by title.
- **Filter Tasks** – Filter tasks by priority and status.

## Tech Stack

| Technology | Description |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling tool |
| dotenv | Environment variable management |
| Nodemon | Development server monitoring |
| Postman | API testing |

## Project Structure

```text
taskly-api/
├── config/
│   └── db.js
├── controllers/
│   └── taskController.js
├── models/
│   └── Task.js
├── routes/
│   └── taskRoutes.js
├── .env
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/brsaly123-star/Taskly-SC-Backend-Final-Project-.git
```

### 2. Navigate to the Project Directory

```bash
cd Taskly-SC-Backend-Final-Project-
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskly
```

Make sure MongoDB is installed and running on your local machine.

### 5. Run the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

If the application starts successfully, you should see:

```text
MongoDB connected successfully!
Taskly API running on port 3000
```

The API is now accessible at:

```text
http://localhost:3000
```

## API Documentation

**Base URL:**

```text
http://localhost:3000/api/tasks
```

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task details |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### 1. Create a Task

**POST** `/api/tasks`

Request Body:

```json
{
  "title": "Complete Database Assignment",
  "description": "Finish the database design assignment",
  "deadline": "2026-12-01",
  "priority": "High"
}
```

The task status defaults to `Pending` if not specified.

### 2. Get All Tasks

**GET** `/api/tasks`

Retrieve all tasks from the database.

### 3. Search and Filter Tasks

Search by title:

```http
GET /api/tasks?search=database
```

Filter by priority:

```http
GET /api/tasks?priority=High
```

Filter by status:

```http
GET /api/tasks?status=Pending
```

Combine search and filters:

```http
GET /api/tasks?search=assignment&priority=High&status=Pending
```

### 4. Get Task by ID

**GET** `/api/tasks/:id`

Example:

```http
GET /api/tasks/674abc123456789012345678
```

### 5. Update Task

**PUT** `/api/tasks/:id`

Request Body:

```json
{
  "title": "Complete Database Assignment",
  "description": "Finish and review the database assignment",
  "deadline": "2026-12-05",
  "priority": "Medium",
  "status": "In Progress"
}
```

### 6. Update Task Status

**PATCH** `/api/tasks/:id/status`

Request Body:

```json
{
  "status": "Completed"
}
```

Available statuses:
- `Pending`
- `In Progress`
- `Completed`

### 7. Delete Task

**DELETE** `/api/tasks/:id`

Deletes a task based on its ID.

## Task Data Model

Each task contains the following fields:

| Field | Data Type | Description |
|---|---|---|
| title | String | Task title (required) |
| description | String | Task description (required) |
| deadline | Date | Task deadline (required) |
| priority | String | Task priority: High, Medium, or Low |
| status | String | Task status: Pending, In Progress, or Completed |
| createdAt | Date | Automatically generated creation date |
| updatedAt | Date | Automatically generated update date |

**Default values:**
- Priority: `Medium`
- Status: `Pending`

## HTTP Response Status Codes

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Bad request or validation error |
| 404 | Resource not found |
| 500 | Internal server error |

## Database

Taskly uses MongoDB as its database and Mongoose for data modeling.

The database name is `taskly`, and the task collection is `tasks`.

## API Testing

The API endpoints were tested using **Postman**, including:
- Creating tasks.
- Retrieving all tasks and individual tasks.
- Updating task details.
- Updating task status.
- Deleting tasks.
- Searching and filtering tasks.
- Testing invalid IDs, missing resources, and validation errors.

## Author

Developed as a final project for the Backend Development Study Club.

**Project Name:** Taskly – Student Task Management API  
**Repository:** [Taskly – SC Backend Final Project](https://github.com/brsaly123-star/Taskly-SC-Backend-Final-Project-)
