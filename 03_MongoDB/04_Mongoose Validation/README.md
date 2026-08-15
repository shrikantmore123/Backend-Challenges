# 04 Mongoose Validation

### Objective

Learn how to apply detailed validation rules to MongoDB documents using Mongoose, validate data during both create and update operations, and handle Mongoose and MongoDB errors using centralized Express error-handling middleware.

---

### Concepts Covered

- Mongoose Schema Validation
- `required`
- `minlength`
- `maxlength`
- `min`
- `max`
- `enum`
- `match`
- `trim`
- `lowercase`
- `default`
- `unique`
- Mongoose `ValidationError`
- Mongoose `CastError`
- MongoDB duplicate-key error
- Error code `11000`
- Centralized error handling
- Express error-handling middleware
- `next(error)`
- Mongoose CRUD
- `async/await`
- `try/catch`
- `new: true`
- `runValidators: true`
- HTTP status codes
- JSON API responses

---

### Requirements

- Connect the Express application to MongoDB using Mongoose
- Reuse the MongoDB connection from the previous challenge
- Create a `models` directory
- Create a `User.js` model
- Create a `routes` directory
- Create `userRouter.js`
- Create a `middleware` directory
- Create `errorHandler.js`
- Define the following user fields:
  - `name`
  - `email`
  - `age`
  - `role`
  - `password`
  - `isActive`
  - `createdAt`
- `name` must:
  - be a `String`
  - be required
  - contain at least 2 characters
  - contain at most 50 characters
  - remove surrounding whitespace
- `email` must:
  - be a `String`
  - be required
  - be unique
  - be trimmed
  - be converted to lowercase
  - match a valid email pattern
- `age` must:
  - be a `Number`
  - be required
  - be at least `18`
  - be at most `100`
- `role` must:
  - be a `String`
  - allow only `user` or `admin`
  - default to `user`
- `password` must:
  - be a `String`
  - be required
  - contain at least 6 characters
- `isActive` must:
  - be a `Boolean`
  - default to `true`
- `createdAt` must:
  - be a `Date`
  - automatically receive the current date when a document is created
- Implement:
  - `GET /users`
  - `GET /users/:id`
  - `POST /users`
  - `PUT /users/:id`
  - `DELETE /users/:id`
- Use Mongoose for all CRUD operations
- Use `async/await`
- Use `new: true` when updating a document
- Use `runValidators: true` when updating a document
- Return `404` when a requested user does not exist
- Return `400` for validation errors
- Return `400` for invalid MongoDB ObjectIds
- Return `409` for duplicate email conflicts
- Return `201` when a user is successfully created
- Return `200` for successful read, update, and delete operations
- Forward route errors to centralized error handling using `next(error)`
- Do not create controllers or services yet

---

### Packages / Tools Used

| Package | Purpose |
|---------|---------|
| express | Create the HTTP server and API routes |
| mongoose | Define schemas/models, validate data, and communicate with MongoDB |
| dotenv | Load environment variables |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Reuse the MongoDB connection from the previous challenge
2. Create or update `models/User.js`
3. Import Mongoose
4. Create a `userSchema` using `new mongoose.Schema()`
5. Define the `name` field as a required `String`
6. Add `minlength: 2` to the `name` field
7. Add `maxlength: 50` to the `name` field
8. Add `trim: true` to the `name` field
9. Define the `email` field as a required `String`
10. Add `unique: true` to the `email` field
11. Add `trim: true` to the `email` field
12. Add `lowercase: true` to the `email` field
13. Add a `match` rule for email validation
14. Define the `age` field as a required `Number`
15. Add `min: 18` to the `age` field
16. Add `max: 100` to the `age` field
17. Define the `role` field as a `String`
18. Add `enum: ["user", "admin"]` to the `role` field
19. Add `default: "user"` to the `role` field
20. Define the `password` field as a required `String`
21. Add `minlength: 6` to the `password` field
22. Define `isActive` as a `Boolean`
23. Add `default: true` to `isActive`
24. Define `createdAt` as a `Date`
25. Use `default: Date.now` for `createdAt`
26. Create the `User` model using `mongoose.model()`
27. Export the `User` model
28. Create or reuse the user router
29. Mount the router in `server.js` using `app.use("/users", userRouter)`
30. Create `GET /users`
31. Use `User.find()` to retrieve all users
32. Return the users with status `200`
33. Create `GET /users/:id`
34. Extract the ID using `req.params.id`
35. Use `User.findById()` to retrieve the requested user
36. Check whether the returned value is `null`
37. Return `404` if the user doesn't exist
38. Create `POST /users`
39. Extract user data from `req.body`
40. Use `User.create()` to create the document
41. Return the created user with status `201`
42. Create `PUT /users/:id`
43. Extract the ID using `req.params.id`
44. Extract the update data from `req.body`
45. Use `User.findByIdAndUpdate()`
46. Add `new: true` so the updated document is returned
47. Add `runValidators: true` so schema validation runs during updates
48. Check whether the returned document is `null`
49. Return `404` if the user doesn't exist
50. Create `DELETE /users/:id`
51. Use `User.findByIdAndDelete()`
52. Check whether the returned document is `null`
53. Return `404` if the user doesn't exist
54. Use `try/catch` around asynchronous database operations
55. Pass route errors to the error handler using `next(error)`
56. Create centralized `errorHandler.js`
57. Check for `ValidationError`
58. Convert Mongoose validation errors into field-level error responses
59. Check for `CastError`
60. Return `400` for an invalid MongoDB ObjectId
61. Check for MongoDB error code `11000`
62. Return `409` for a duplicate email
63. Return `500` for unexpected errors
64. Do not use `process.exit()` inside request handlers

---

### API Endpoints / Usage

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | Returns all users |
| GET | `/users/:id` | Returns a specific user |
| POST | `/users` | Creates a new validated user |
| PUT | `/users/:id` | Updates an existing user with validation |
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
MongoDB connected successfully
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
    "success": true,
    "message": "Users fetched successfully",
    "count": 1,
    "data": [
        {
            "_id": "...",
            "name": "Shrikant",
            "email": "shrikant@example.com",
            "age": 21,
            "role": "user",
            "password": "secret123",
            "isActive": true,
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
    "success": true,
    "message": "Users fetched successfully",
    "count": 0,
    "data": []
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
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "_id": "...",
        "name": "Shrikant",
        "email": "shrikant@example.com",
        "age": 21,
        "role": "user",
        "password": "secret123",
        "isActive": true,
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
    "success": false,
    "message": "User not found"
}
```

Status:

```text
404 Not Found
```

If the supplied ID is not a valid MongoDB ObjectId:

```json
{
    "success": false,
    "message": "Invalid user ID"
}
```

Status:

```text
400 Bad Request
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
    "email": "alice@example.com",
    "role": "user",
    "password": "secret123",
    "isActive": true
}
```

Expected:

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "_id": "...",
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com",
        "role": "user",
        "password": "secret123",
        "isActive": true,
        "createdAt": "..."
    }
}
```

Status:

```text
201 Created
```

MongoDB automatically generates the `_id`.

If validation fails:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "age",
            "message": "..."
        }
    ]
}
```

Status:

```text
400 Bad Request
```

If the email already exists:

```json
{
    "success": false,
    "message": "email already exists"
}
```

Status:

```text
409 Conflict
```

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
    "age": 22
}
```

Expected:

```json
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "_id": "...",
        "name": "Shrikant More",
        "email": "shrikant@example.com",
        "age": 22,
        "role": "user",
        "password": "secret123",
        "isActive": true,
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

If validation fails during an update:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "age",
            "message": "..."
        }
    ]
}
```

Status:

```text
400 Bad Request
```

If the user doesn't exist:

```json
{
    "success": false,
    "message": "User not found"
}
```

Status:

```text
404 Not Found
```

---

### Delete User

Send:

```text
DELETE http://localhost:3000/users/<user-id>
```

Expected:

```json
{
    "success": true,
    "message": "User deleted successfully",
    "data": {
        "_id": "...",
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com",
        "role": "user",
        "password": "secret123",
        "isActive": true,
        "createdAt": "..."
    }
}
```

Status:

```text
200 OK
```

The returned user represents the document that was deleted.

If the user doesn't exist:

```json
{
    "success": false,
    "message": "User not found"
}
```

Status:

```text
404 Not Found
```

---

### Validation Testing

#### Name Validation

Request:

```json
{
    "name": "S",
    "age": 21,
    "email": "s@example.com",
    "password": "secret123"
}
```

The request should fail because:

```text
name.length < 2
```

Status:

```text
400 Bad Request
```

Mongoose should generate a validation error.

---

### Age Validation

Request:

```json
{
    "name": "Shrikant",
    "age": 15,
    "email": "test@example.com",
    "password": "secret123"
}
```

The request should fail because:

```text
age < 18
```

Status:

```text
400 Bad Request
```

Mongoose should generate a validation error.

---

### Role Validation

Request:

```json
{
    "name": "Shrikant",
    "age": 21,
    "email": "test@example.com",
    "role": "manager",
    "password": "secret123"
}
```

The request should fail because:

```text
role is not "user" or "admin"
```

Status:

```text
400 Bad Request
```

---

### Password Validation

Request:

```json
{
    "name": "Shrikant",
    "age": 21,
    "email": "test@example.com",
    "password": "123"
}
```

The request should fail because:

```text
password.length < 6
```

Status:

```text
400 Bad Request
```

---

### Required Field Validation

Request:

```json
{
    "name": "Shrikant",
    "age": 21
}
```

The request should fail because `email` and `password` are required.

Status:

```text
400 Bad Request
```

---

### Duplicate Email

Create a user:

```json
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com",
    "password": "secret123"
}
```

Then attempt to create another user using the same email.

MongoDB should reject the duplicate value because the email field is configured with:

```text
unique: true
```

The centralized error handler should identify MongoDB error code `11000`.

Expected response:

```json
{
    "success": false,
    "message": "email already exists"
}
```

Status:

```text
409 Conflict
```

---

### How it works:

1. The Express application starts.
2. The application connects to MongoDB using Mongoose.
3. The `User` model is loaded.
4. The `User` model is based on the `userSchema`.
5. The user router is mounted at `/users`.
6. A client sends a CRUD request.
7. Express matches the request with the appropriate route.
8. The route extracts parameters or request body data.
9. The route calls the appropriate Mongoose method.
10. Mongoose applies schema validation where applicable.
11. Mongoose communicates with the MongoDB collection.
12. MongoDB performs the requested operation.
13. Mongoose returns the result to the Express route.
14. If a requested user doesn't exist, a `404` response is returned.
15. Otherwise, the appropriate success response is returned.
16. If a Mongoose validation error occurs, the error is passed to `errorHandler.js`.
17. If an invalid MongoDB ObjectId is supplied, Mongoose generates a `CastError`.
18. If a duplicate email is inserted, MongoDB generates error code `11000`.
19. The centralized error handler converts known errors into appropriate JSON responses.
20. Unexpected errors return `500 Internal Server Error`.

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
Mongoose Schema
      ↓
Validation
      ↓
   ┌──┴──┐
   ↓     ↓
 Valid  Invalid
   ↓     ↓
MongoDB  ValidationError
   ↓     ↓
Document errorHandler
   ↓
201 / 400
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
Document / null / CastError
      ↓
200 / 404 / 400
```

#### UPDATE

```text
PUT /users/:id
      ↓
req.params.id + req.body
      ↓
User.findByIdAndUpdate()
      ↓
runValidators: true
      ↓
MongoDB
      ↓
Updated Document / null / ValidationError
      ↓
200 / 404 / 400
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
Deleted Document / null / CastError
      ↓
200 / 404 / 400
```

---

### CRUD Mapping

| Operation | HTTP Method | Mongoose Method | Purpose |
|-----------|-------------|-----------------|---------|
| Create | POST | `User.create()` | Creates a validated document |
| Read All | GET | `User.find()` | Retrieves all documents |
| Read One | GET | `User.findById()` | Retrieves one document |
| Update | PUT | `User.findByIdAndUpdate()` | Updates a validated document |
| Delete | DELETE | `User.findByIdAndDelete()` | Deletes a document |

---

### Challenge 10 vs Challenge 04

| Challenge 10 — In-Memory | Challenge 04 — Mongoose Validation |
|--------------------------|-------------------------------------|
| JavaScript array | MongoDB collection |
| `users.push()` | `User.create()` |
| Manual object structure | Mongoose Schema |
| Manual validation | Mongoose Schema Validation |
| Manual ID | MongoDB `_id` |
| Data exists in memory | Data persists in MongoDB |
| Route-level error handling | Centralized error handling |

The progression is:

```text
In-Memory CRUD
      ↓
MongoDB + Mongoose CRUD
      ↓
Mongoose Schema Validation
      ↓
Centralized Error Handling
```

---

### Important Validation Rules

#### `required`

```js
required: true
```

Requires a value to be provided.

---

#### `minlength` and `maxlength`

```js
{
    type: String,
    minlength: 2,
    maxlength: 50
}
```

Validate the length of a string.

---

#### `min` and `max`

```js
{
    type: Number,
    min: 18,
    max: 100
}
```

Validate the numeric range.

---

#### `enum`

```js
{
    type: String,
    enum: ["user", "admin"]
}
```

Restricts the value to predefined options.

---

#### `match`

```js
{
    type: String,
    match: [...]
}
```

Validates a string against a regular expression.

---

#### `default`

```js
default: true
```

Automatically provides a value when one isn't supplied.

---

#### `unique`

```js
unique: true
```

Creates/enforces a unique MongoDB index.

`unique` is not a normal Mongoose validator. Duplicate values can result in MongoDB error code `11000`.

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

`runValidators: true` tells Mongoose to apply schema validation rules during the update.

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

Known errors should be handled by the centralized error handler.

Routes should pass errors using:

```js
next(error);
```

The error handler should identify:

```text
ValidationError → 400
CastError       → 400
11000           → 409
Unknown error   → 500
```

Request-level errors should **not** shut down the entire server.

Avoid:

```js
process.exit(1);
```

inside route handlers.

---

### Learning Outcome

After completing this challenge, you should understand:

- How Mongoose performs detailed schema validation.
- How `required`, `minlength`, `maxlength`, `min`, and `max` work.
- How `enum` restricts field values.
- How `match` validates strings using a regular expression.
- How `trim` and `lowercase` modify string values.
- How default values work.
- What `unique` is intended to accomplish.
- Why `unique` errors are handled separately from normal validation errors.
- What a Mongoose `ValidationError` is.
- What a Mongoose `CastError` is.
- What MongoDB error code `11000` represents.
- How centralized Express error handling works.
- How `next(error)` passes errors to error-handling middleware.
- How `runValidators: true` applies schema validation during updates.
- How `new: true` affects update results.
- How appropriate HTTP status codes communicate API results.
- How validation improves the reliability of MongoDB documents.