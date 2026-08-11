# 10 CRUD API — In-Memory Users (Express.js)

### Objective

Learn how to build a complete REST-style CRUD API using Express and an in-memory JavaScript array before introducing a real database.

The challenge focuses on understanding how Create, Read, Update, and Delete operations work using HTTP methods, route parameters, request bodies, JavaScript array methods, validation, and error handling.

---

### Concepts Covered

* REST API
* CRUD operations
* HTTP methods
* In-memory data storage
* JavaScript arrays and objects
* `GET`
* `POST`
* `PUT`
* `DELETE`
* `req.params`
* `req.body`
* `find()`
* `findIndex()`
* `push()`
* `splice()`
* Request validation
* HTTP status codes
* Error handling
* Resource not found handling

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Store users in a JavaScript array
* Keep the user data in a separate `data/users.js` file
* Create a modular user router
* Reuse the custom `validateUser` middleware
* Implement:

  * `GET /users` → Get all users
  * `GET /users/:id` → Get a specific user
  * `POST /users` → Create a new user
  * `PUT /users/:id` → Update an existing user
  * `DELETE /users/:id` → Delete an existing user
* Generate a new ID for every created user
* Return `404` when the requested user does not exist
* Return `201` when a user is successfully created
* Return `200` for successful read, update, and delete operations
* Use the centralized error handler for user-not-found errors
* Do not use MongoDB or Mongoose

---

### Packages / Tools Used

| Package | Purpose                    |
| ------- | -------------------------- |
| express | Create server and REST API |
| dotenv  | Load environment variables |

(Type: External packages)

No database or additional package is required.

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js`
4. Create a `data` directory
5. Create `users.js` inside the `data` directory
6. Add two initial users to the `users` array
7. Export the users array from `users.js`
8. Import the shared users array into `userRoute.js`
9. Mount the user router at `/users`
10. Create `GET /` to return all users
11. Create `GET /:id` to find a specific user
12. Convert the route ID from a string to a number when necessary
13. Use `find()` to locate a user
14. Return `404` when the user doesn't exist
15. Create `POST /` and attach `validateUser`
16. Extract `name`, `age`, and `email` from `req.body`
17. Generate the next user ID
18. Create a new user object
19. Add the new user using `users.push()`
20. Return the created user with status `201`
21. Create `PUT /:id` and attach `validateUser`
22. Find the user using its ID
23. Check whether the user exists before modifying it
24. Update the existing user's properties
25. Return the updated user with status `200`
26. Create `DELETE /:id`
27. Use `findIndex()` to locate the user
28. Return `404` if the index is `-1`
29. Remove the user using `splice()`
30. Return the deleted user with status `200`
31. Use the centralized error handler for user-not-found errors
32. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route        | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/users`     | Returns all users        |
| GET    | `/users/:id` | Returns a specific user  |
| POST   | `/users`     | Creates a new user       |
| PUT    | `/users/:id` | Updates an existing user |
| DELETE | `/users/:id` | Deletes an existing user |

---

## How to Run

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

---

### Get All Users

```text
GET http://localhost:3000/users
```

Expected initial response contains the two users:

```json
{
    "users": [
        {
            "id": 1,
            "name": "Shrikant",
            "age": 21,
            "email": "shrikant@example.com"
        },
        {
            "id": 2,
            "name": "mark",
            "age": 22,
            "email": "mark@example.com"
        }
    ]
}
```

---

### Get One User

```text
GET http://localhost:3000/users/1
```

Expected:

```json
{
    "message": "User found successfully",
    "user": {
        "id": 1,
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com"
    }
}
```

---

### Create User

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
        "id": 3,
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com"
    }
}
```

The new user must also be added to the shared `users` array.

---

### Update User

```text
PUT http://localhost:3000/users/1
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
        "id": 1,
        "name": "Shrikant More",
        "age": 22,
        "email": "shrikantmore@example.com"
    }
}
```

---

### Delete User

```text
DELETE http://localhost:3000/users/2
```

Expected:

```json
{
    "message": "User deleted successfully",
    "user": {
        "id": 2,
        "name": "mark",
        "age": 22,
        "email": "mark@example.com"
    }
}
```

The user must be removed from the shared array.

---

### Expected Behavior

#### `GET /users`

Returns all users currently stored in the in-memory array with status `200`.

Initially, the array contains:

* Shrikant — ID `1`
* mark — ID `2`

After creating another user, that user should also appear in the response.

---

#### `GET /users/1`

Returns:

```json
{
    "message": "User found successfully",
    "user": {
        "id": 1,
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com"
    }
}
```

with HTTP status `200`.

---

#### `GET /users/999`

If the user doesn't exist:

```json
{
    "error": "User not found"
}
```

with HTTP status `404`.

---

#### `POST /users`

A valid request creates a new user.

For example:

```json
{
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}
```

The generated ID should be `3` when the initial array contains IDs `1` and `2`.

The user should be added to the array using `users.push()`.

The response should have status `201`.

---

#### `PUT /users/1`

A valid request updates the existing Shrikant user.

The ID must remain `1`; only the supplied user information should be changed.

The response should have status `200`.

---

#### `DELETE /users/2`

The user with ID `2` should be removed from the array.

After deletion:

```text
GET /users/2
```

should return:

```json
{
    "error": "User not found"
}
```

with status `404`.

---

### How it works:

1. The server starts and imports the shared users array from `data/users.js`.
2. The user router is mounted at `/users`.
3. `GET /users` returns the complete users array.
4. `GET /users/:id` extracts the ID using `req.params.id`.
5. The route ID is converted from a string to a number.
6. `find()` searches the array for the requested user.
7. If the user is found, it is returned with status `200`.
8. If the user is not found, an error with status `404` is passed to the error handler.
9. `POST /users` first passes through `validateUser`.
10. Valid data is extracted from `req.body`.
11. The highest existing ID is found.
12. A new ID is generated by adding `1`.
13. A new user object is created.
14. `users.push()` adds the new user to the shared array.
15. The created user is returned with status `201`.
16. `PUT /users/:id` validates the incoming user data.
17. `find()` locates the existing user.
18. If the user doesn't exist, a `404` error is passed to the error handler.
19. If the user exists, its properties are updated.
20. The updated user is returned with status `200`.
21. `DELETE /users/:id` uses `findIndex()` to locate the user.
22. If the index is `-1`, a `404` error is passed to the error handler.
23. Otherwise, `splice()` removes the user from the array.
24. The deleted user is returned with status `200`.

---

### Internal Working

#### CREATE

```text
POST /users
      ↓
express.json()
      ↓
validateUser
      ↓
req.body
      ↓
Find highest ID
      ↓
Generate next ID
      ↓
Create user object
      ↓
users.push()
      ↓
201 Created
```

#### READ ALL

```text
GET /users
      ↓
userRouter
      ↓
users array
      ↓
200 OK
      ↓
All users returned
```

#### READ ONE

```text
GET /users/1
      ↓
req.params.id
      ↓
Convert "1" → 1
      ↓
users.find()
      ↓
User found?
   ┌────┴────┐
  YES        NO
   ↓          ↓
  200        404
```

#### UPDATE

```text
PUT /users/1
      ↓
validateUser
      ↓
req.params.id + req.body
      ↓
users.find()
      ↓
User exists?
   ┌────┴────┐
  YES        NO
   ↓          ↓
Update       404
   ↓
  200
```

#### DELETE

```text
DELETE /users/2
      ↓
req.params.id
      ↓
users.findIndex()
      ↓
User exists?
   ┌────┴────┐
  YES        NO
   ↓          ↓
splice()     404
   ↓
  200
```

---

### CRUD Mapping

| Operation | HTTP Method | Route        | JavaScript Operation       |
| --------- | ----------- | ------------ | -------------------------- |
| Create    | POST        | `/users`     | `push()`                   |
| Read All  | GET         | `/users`     | Array access               |
| Read One  | GET         | `/users/:id` | `find()`                   |
| Update    | PUT         | `/users/:id` | Object property update     |
| Delete    | DELETE      | `/users/:id` | `findIndex()` + `splice()` |

---

### Learning Outcome

After completing this challenge, you should understand:

* What CRUD means in a REST API.
* How HTTP methods map to CRUD operations.
* How an in-memory array can temporarily act as a data store.
* How `find()` retrieves a resource.
* How `findIndex()` locates a resource for modification or deletion.
* How `push()` creates a new resource.
* How `splice()` deletes a resource.
* How `req.params` identifies a resource.
* How `req.body` provides new or updated data.
* How validation middleware fits into CRUD operations.
* How centralized error handling handles missing resources.
* How data changes persist within the running Node.js process.
* Why this array-based CRUD implementation is a useful stepping stone toward MongoDB and Mongoose.