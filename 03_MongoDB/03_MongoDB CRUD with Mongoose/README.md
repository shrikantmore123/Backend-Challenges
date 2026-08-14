# 03 MongoDB CRUD with Mongoose

### Objective

Learn how to build a complete CRUD API using MongoDB and Mongoose, and understand how database-backed CRUD operations replace the in-memory array operations used in the previous challenge.

---

### Concepts Covered

- MongoDB CRUD
- Mongoose CRUD
- Mongoose Model
- Express Router
- `User.create()`
- `User.find()`
- `User.findById()`
- `User.findByIdAndUpdate()`
- `User.findByIdAndDelete()`
- MongoDB `_id`
- Route parameters
- Request body
- `async/await`
- `try/catch`
- Mongoose validation during updates
- `new: true`
- `runValidators: true`
- HTTP status codes
- Error handling

---

### Requirements

- Connect the Express application to MongoDB using Mongoose
- Reuse the `User` model from Challenge 02
- Create a separate `routes` directory
- Create `userRoutes.js`
- Mount the router at `/users`
- Implement:
  - `GET /users` → Get all users
  - `GET /users/:id` → Get one user
  - `POST /users` → Create a user
  - `PUT /users/:id` → Update a user
  - `DELETE /users/:id` → Delete a user
- Use MongoDB/Mongoose for all CRUD operations
- Use MongoDB-generated `_id` values
- Use `async/await`
- Handle database operation errors without shutting down the server
- Return `404` when a requested user does not exist
- Return `201` when a user is successfully created
- Return `200` for successful read, update, and delete operations
- Use `new: true` when updating a document
- Use `runValidators: true` when updating a document
- Do not use the previous in-memory users array
- Do not create controllers or services yet

---

### Packages / Tools Used

| Package | Purpose |
|---------|---------|
| express | Create the HTTP server and API routes |
| mongoose | Perform MongoDB operations |
| dotenv | Load environment variables |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Reuse the MongoDB connection from Challenge 01
2. Reuse the `User` model from Challenge 02
3. Create a `routes` directory
4. Create `userRoutes.js`
5. Import `express` and the `User` model
6. Create an Express router using `express.Router()`
7. Register the router in `server.js` using `app.use("/users", userRouter)`
8. Create `GET /users`
9. Use `User.find()` to retrieve all users
10. Return the users with status `200`
11. Create `GET /users/:id`
12. Extract the ID using `req.params.id`
13. Use `User.findById()` to retrieve the requested user
14. Check whether the returned value is `null`
15. Return `404` if the user doesn't exist
16. Create `POST /users`
17. Extract `name`, `age`, and `email` from `req.body`
18. Use `User.create()` to create the document
19. Return the created user with status `201`
20. Create `PUT /users/:id`
21. Extract the ID using `req.params.id`
22. Extract the update data from `req.body`
23. Use `User.findByIdAndUpdate()`
24. Add `new: true` so the updated document is returned
25. Add `runValidators: true` so schema validation runs during updates
26. Check whether the returned document is `null`
27. Return `404` if the user doesn't exist
28. Create `DELETE /users/:id`
29. Use `User.findByIdAndDelete()`
30. Check whether the returned document is `null`
31. Return `404` if the user doesn't exist
32. Use `try/catch` around asynchronous database operations
33. Log errors using `console.error()`
34. Return an appropriate error response without using `process.exit()` inside request handlers

---

### API Endpoints / Usage

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | Returns all users |
| GET | `/users/:id` | Returns a specific user |
| POST | `/users` | Creates a new user |
| PUT | `/users/:id` | Updates an existing user |
| DELETE | `/users/:id` | Deletes an existing user |

---

## How to Run

Install dependencies:

```bash
npm install
```

Make sure your `.env` contains:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash
node server.js
```

The terminal should show:

```text
MongoDB connection successful
Server is running on port 3000
```

---

### Get All Users

Send:

```text
GET http://localhost:3000/users
```

Expected response:

```json
{
    "message": "Users fetched successfully",
    "users": [
        {
            "_id": "...",
            "name": "Shrikant",
            "age": 21,
            "email": "shrikant@example.com",
            "createdAt": "..."
        }
    ]
}
```

Status:

```text
200 OK
```

If the collection is empty, the endpoint should still return `200` with an empty array:

```json
{
    "message": "Users fetched successfully",
    "users": []
}
```

---

### Get One User

Send:

```text
GET http://localhost:3000/users/<user-id>
```

Expected:

```json
{
    "message": "User fetched successfully",
    "user": {
        "_id": "...",
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com",
        "createdAt": "..."
    }
}
```

Status:

```text
200 OK
```

If the user doesn't exist:

```json
{
    "message": "User not found"
}
```

Status:

```text
404 Not Found
```

---

### Create User

Send:

```text
POST http://localhost:3000/users
```

Body:

```json
{
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}
```

Expected:

```json
{
    "message": "User created successfully",
    "user": {
        "_id": "...",
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com",
        "createdAt": "..."
    }
}
```

Status:

```text
201 Created
```

MongoDB automatically generates the `_id`.

---

### Update User

Send:

```text
PUT http://localhost:3000/users/<user-id>
```

Body:

```json
{
    "name": "Shrikant More",
    "age": 22,
    "email": "shrikantmore@example.com"
}
```

Expected:

```json
{
    "message": "User updated successfully",
    "user": {
        "_id": "...",
        "name": "Shrikant More",
        "age": 22,
        "email": "shrikantmore@example.com",
        "createdAt": "..."
    }
}
```

Status:

```text
200 OK
```

The response should contain the updated document, which is why:

```js
{
    new: true,
    runValidators: true
}
```

is used.

---

### Delete User

Send:

```text
DELETE http://localhost:3000/users/<user-id>
```

Expected:

```json
{
    "message": "User deleted successfully",
    "user": {
        "_id": "...",
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com",
        "createdAt": "..."
    }
}
```

Status:

```text
200 OK
```

The returned user represents the document that was deleted.

---

### Expected Behavior

#### `GET /users`

Uses:

```text
User.find()
```

to retrieve all user documents from MongoDB.

---

#### `GET /users/:id`

Uses:

```text
User.findById()
```

to retrieve one user using MongoDB's `_id`.

If the document doesn't exist, the API returns `404`.

---

#### `POST /users`

Uses:

```text
User.create()
```

to create and save a new user document in MongoDB.

The schema from Challenge 02 performs validation.

---

#### `PUT /users/:id`

Uses:

```text
User.findByIdAndUpdate()
```

with:

```js
{
    new: true,
    runValidators: true
}
```

The user is updated and the updated document is returned.

---

#### `DELETE /users/:id`

Uses:

```text
User.findByIdAndDelete()
```

The document is removed from MongoDB and the deleted document is returned.

---

### How it works:

1. The Express application starts.
2. The application connects to MongoDB using Mongoose.
3. The `User` model is loaded.
4. The user router is mounted at `/users`.
5. A client sends a CRUD request.
6. Express matches the request with the appropriate route.
7. The route extracts parameters or request body data.
8. The route calls the appropriate Mongoose method.
9. Mongoose communicates with the MongoDB collection.
10. MongoDB performs the requested operation.
11. Mongoose returns the result to the Express route.
12. The route checks the result.
13. If a requested user doesn't exist, a `404` response is returned.
14. Otherwise, the appropriate success response is returned.
15. Database errors are caught using `try/catch`.
16. Request-level errors do not terminate the entire server.

---

### Internal Working

#### CREATE

```text
POST /users
      ↓
req.body
      ↓
User.create()
      ↓
Mongoose
      ↓
MongoDB
      ↓
New Document
      ↓
201 Created
```

#### READ ALL

```text
GET /users
      ↓
User.find()
      ↓
MongoDB Collection
      ↓
Array of Documents
      ↓
200 OK
```

#### READ ONE

```text
GET /users/:id
      ↓
req.params.id
      ↓
User.findById()
      ↓
MongoDB
      ↓
Document / null
      ↓
200 / 404
```

#### UPDATE

```text
PUT /users/:id
      ↓
req.params.id + req.body
      ↓
User.findByIdAndUpdate()
      ↓
MongoDB
      ↓
Updated Document / null
      ↓
200 / 404
```

#### DELETE

```text
DELETE /users/:id
      ↓
req.params.id
      ↓
User.findByIdAndDelete()
      ↓
MongoDB
      ↓
Deleted Document / null
      ↓
200 / 404
```

---

### CRUD Mapping

| Operation | HTTP Method | Mongoose Method | Purpose |
|-----------|-------------|-----------------|---------|
| Create | POST | `User.create()` | Creates a document |
| Read All | GET | `User.find()` | Retrieves all documents |
| Read One | GET | `User.findById()` | Retrieves one document |
| Update | PUT | `User.findByIdAndUpdate()` | Updates a document |
| Delete | DELETE | `User.findByIdAndDelete()` | Deletes a document |

---

### Challenge 10 vs Challenge 03

| Challenge 10 — In-Memory | Challenge 03 — MongoDB |
|--------------------------|-------------------------|
| JavaScript array | MongoDB collection |
| `users.push()` | `User.create()` |
| `users.find()` | `User.find()` |
| `users.find()` | `User.findById()` |
| Manual object update | `User.findByIdAndUpdate()` |
| `findIndex()` + `splice()` | `User.findByIdAndDelete()` |
| Manual numeric ID | MongoDB `_id` |
| Data exists in memory | Data persists in MongoDB |

The fundamental CRUD logic remains the same:

```text
Create
Read
Update
Delete
```

Only the data-storage mechanism has changed:

```text
JavaScript Array
      ↓
MongoDB + Mongoose
```

---

### Important Mongoose Options

#### `new: true`

When using:

```js
User.findByIdAndUpdate(id, data, {
    new: true
});
```

Mongoose returns the **updated document**.

Without it, the returned document may represent the document before the update.

---

#### `runValidators: true`

When updating a document:

```js
User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
});
```

`runValidators: true` tells Mongoose to apply the schema validation rules during the update.

For example, the schema requires:

```text
age >= 18
```

so an update attempting to set:

```json
{
    "age": 15
}
```

should fail validation.

---

### Error Handling

Database operations can fail because of:

- Invalid MongoDB IDs
- Validation errors
- Duplicate email
- Database problems
- Network problems

Request-level database errors should **not** shut down the entire server.

Avoid:

```js
process.exit(1);
```

inside route handlers.

Instead, catch the error, log it using:

```js
console.error()
```

and return an appropriate HTTP response.

The database connection itself is different: if MongoDB is unavailable while the application is starting, terminating the application can be appropriate.

---

### Learning Outcome

After completing this challenge, you should understand:

- How to perform CRUD operations using Mongoose.
- How an Express Router communicates with a Mongoose Model.
- How `User.create()` creates MongoDB documents.
- How `User.find()` retrieves multiple documents.
- How `User.findById()` retrieves a specific document.
- How `User.findByIdAndUpdate()` updates a document.
- How `User.findByIdAndDelete()` deletes a document.
- Why MongoDB uses `_id` instead of the manually generated numeric IDs used earlier.
- Why MongoDB IDs should not be passed through `parseInt()`.
- How `new: true` affects update results.
- How `runValidators: true` applies schema validation during updates.
- Why request-level errors should not terminate the server.
- How the CRUD concepts learned with JavaScript arrays translate directly to MongoDB.