# 06 Request Body & JSON Data (Express.js)

### Objective

Learn how Express receives JSON data from a client using `express.json()` and how to access request body data using `req.body`.

---

### Concepts Covered

* HTTP request body
* JSON data
* `express.json()`
* `req.body`
* POST requests
* PUT requests
* Request validation
* JSON responses
* HTTP status codes
* Middleware order
* Combining `req.params` and `req.body`

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Enable JSON request body parsing using `express.json()`
* Create a modular user router
* Implement:

  * `POST /users` → Create a user using JSON body data
  * `PUT /users/:id` → Update a user using route parameter and JSON body
* For `POST /users`, require:

  * `name`
  * `age`
  * `email`
* For `PUT /users/:id`, require:

  * `name`
  * `age`
* Return HTTP status `201` for successful user creation
* Return HTTP status `200` for successful user update
* Return HTTP status `400` when required data is missing
* Return HTTP status `404` for unknown routes
* Do not use a database

---

### Packages / Tools Used

| Package | Purpose                           |
| ------- | --------------------------------- |
| express | Create server and handle requests |
| dotenv  | Load environment variables        |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js`
4. Initialize an Express application
5. Load the port from the environment configuration
6. Enable JSON parsing using `express.json()`
7. Mount the user router at `/users`
8. Create `POST /` inside the user router
9. Extract `name`, `age`, and `email` from `req.body`
10. Validate the required fields
11. Return `201` when user data is valid
12. Create `PUT /:id` inside the user router
13. Get the user ID using `req.params.id`
14. Extract `name` and `age` using `req.body`
15. Validate the update data
16. Return `200` when the update data is valid
17. Add a final 404 middleware
18. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route        | Description                          |
| ------ | ------------ | ------------------------------------ |
| POST   | `/users`     | Create a user using JSON body        |
| PUT    | `/users/:id` | Update a user using ID and JSON body |

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

Use Postman or another API client to test the POST and PUT requests.

### Create User

```text
POST http://localhost:3000/users
```

Body → `raw` → `JSON`:

```json
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

### Update User

```text
PUT http://localhost:3000/users/101
```

Body:

```json
{
    "name": "Shrikant More",
    "age": 22
}
```

---

### Expected Behavior

`POST /users`

With:

```json
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

Returns:

```json
{
    "message": "User created",
    "user": {
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com"
    }
}
```

with HTTP status code `201`.

---

`PUT /users/101`

With:

```json
{
    "name": "Shrikant More",
    "age": 22
}
```

Returns:

```json
{
    "message": "User updated",
    "userId": "101",
    "data": {
        "name": "Shrikant More",
        "age": 22
    }
}
```

with HTTP status code `200`.

---

Missing required fields for `POST /users` returns:

```json
{
    "error": "Name, age and email are required"
}
```

with HTTP status code `400`.

---

Missing required fields for `PUT /users/:id` returns:

```json
{
    "error": "Name and age are required"
}
```

with HTTP status code `400`.

---

Any unknown route returns:

```text
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. The client sends an HTTP request containing JSON data.
2. `express.json()` middleware runs before the routes.
3. Express parses the JSON request body and makes it available through `req.body`.
4. The request reaches the user router mounted at `/users`.
5. For `POST /users`, the route extracts `name`, `age`, and `email` from `req.body`.
6. The required fields are validated.
7. A `201 Created` response is returned when the data is valid.
8. For `PUT /users/:id`, the user ID is extracted from `req.params.id`.
9. The updated user information is extracted from `req.body`.
10. The data is validated and a `200 OK` response is returned.
11. If required data is missing, the server returns `400 Bad Request`.
12. If no route matches, the final middleware returns `404 Not Found`.

---

### Learning Outcome

After completing this challenge, you should understand:

* How JSON request bodies work.
* Why `express.json()` is required.
* How to access client data using `req.body`.
* The difference between `req.params`, `req.query`, and `req.body`.
* How POST and PUT requests commonly use request bodies.
* How to validate incoming request data.
* Why `201` is used for creation and `200` for successful updates.
* How middleware order affects request processing.