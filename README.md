# Task Management REST API

A RESTful API for managing users and tasks, built with Node.js, Express, and MongoDB. The project follows a layered architecture with manual dependency injection, a shared base repository for generic CRUD, and singleton utilities for logging and response formatting.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express 4 |
| Database | MongoDB via Mongoose 8 |
| Config | dotenv |
| Dev server | nodemon |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or Atlas)

### Installation

```bash
git clone <repo-url>
cd TaskManagement-
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
PORT=3000
MONGO_PATH=mongodb://localhost:27017/taskmanagement
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGO_PATH` | Full MongoDB connection string |

### Running Locally

```bash
npm run dev
```

The server starts on the configured `PORT` and connects to MongoDB immediately on boot.

---

## API Reference

All routes are prefixed with `/api`.

### Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users` | Create a new user |
| `GET` | `/api/users` | List all users |
| `GET` | `/api/users/:id` | Get a user by ID |
| `PUT` | `/api/users/:id` | Update a user by ID |
| `DELETE` | `/api/users/:id` | Delete a user by ID |

#### User Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `username` | String | Yes | Unique |
| `email` | String | Yes | Unique |
| `password` | String | Yes | |
| `role` | String | No | `"user"` (default) or `"admin"` |

#### Example Request — Create User

```bash
POST /api/users
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

---

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/tasks/:id` | Get a task by ID |
| `PUT` | `/api/tasks/:id` | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

#### Task Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | String | Yes | |
| `description` | String | No | Defaults to `""` |
| `status` | String | No | `"todo"` (default), `"in-progress"`, `"done"` |
| `priority` | String | No | `"low"`, `"medium"` (default), `"high"` |
| `userId` | ObjectId | Yes | Reference to a User document |
| `dueDate` | Date | No | |

#### Example Request — Create Task

```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Write unit tests",
  "description": "Cover service and repository layers",
  "priority": "high",
  "userId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "dueDate": "2026-07-15"
}
```

---

### Standard Response Shape

Every endpoint returns the same JSON envelope:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Users fetched",
  "dataLength": 2,
  "data": [ ... ]
}
```

Errors also use this shape with the appropriate `statusCode` (e.g., `500`) and an empty `data` array.

---

## Architecture

The project uses a four-layer architecture wired together with manual dependency injection.

```
Controller  →  Service  →  Repository  →  Mongoose Model
```

Each resource (`users`, `tasks`) has its own directory containing all four layers. A dedicated DI file (`*-di.js`) instantiates each class and injects its dependency, so no IoC container is required.

### Dependency Injection

```js
// src/api/users/user-di.js
const userRepository = new UserRepository()
const userService    = new UserService(userRepository)
export const userController = new UserController(userService)
```

The router imports the fully wired controller instance directly.

### Base Repository

`src/core/base-repository.js` provides generic Mongoose wrappers (`create`, `find`, `findById`, `update`, `delete`) that every resource repository inherits. Resource-specific repositories extend `BaseRepository` and pass their model in the constructor.

### Response Handler

`src/response/response.js` exports a singleton (`responseHandler`) with a single `success(res, { statusCode, message, data })` method. All controllers call this method, keeping the JSON response shape consistent across every endpoint.

### Logger

`src/Logger/logger.js` exports a singleton (`logger`) with two methods:

| Method | Output file | Use |
|---|---|---|
| `logger.infoLog(message)` | `infoLog.txt` | Successful operations |
| `logger.errorLog(message)` | `errorLog.txt` | Caught errors |

Log files are written to the project root via `fs.appendFile`.

---

## Project Structure

```
TaskManagement-/
├── src/
│   ├── app.js                   # Express setup and server bootstrap
│   ├── core/
│   │   ├── db.js                # Mongoose connection
│   │   ├── env.js               # Environment variable config
│   │   ├── routes.js            # Central router — all API routes
│   │   └── base-repository.js   # Generic CRUD base class
│   ├── api/
│   │   ├── users/
│   │   │   ├── model/
│   │   │   │   └── user-model.js
│   │   │   ├── dto/
│   │   │   │   └── user-dto.js
│   │   │   ├── user-repository.js
│   │   │   ├── user-service.js
│   │   │   ├── user-controller.js
│   │   │   └── user-di.js       # Wires repository → service → controller
│   │   └── tasks/
│   │       ├── task-model.js
│   │       ├── task-repository.js
│   │       ├── task-services.js
│   │       ├── task-controller.js
│   │       └── task-di.js
│   ├── Logger/
│   │   └── logger.js            # Singleton file logger
│   └── response/
│       └── response.js          # Singleton response formatter
├── infoLog.txt                  # Runtime info logs (auto-generated)
├── errorLog.txt                 # Runtime error logs (auto-generated)
├── package.json
└── .env                         # Not committed — see Environment Variables
```

---

## Adding a New Resource

1. Create `src/api/<resource>/` with `<resource>-model.js`, `<resource>-repository.js`, `<resource>-services.js`, `<resource>-controller.js`, and `<resource>-di.js`.
2. In the repository file, extend `BaseRepository` and pass the Mongoose model to `super()`.
3. In the DI file, instantiate and wire the three layers (repository → service → controller).
4. Register the routes in `src/core/routes.js` by importing the controller from the DI file.

---

## License

ISC
