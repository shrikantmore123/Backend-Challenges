# 09 Custom Validation Middleware (Express.js)

### Objective

Learn how to validate incoming request data using custom Express middleware before allowing the request to reach the route handler.

---

### Concepts Covered

* Custom validation middleware
* `req.body`
* Middleware chaining
* `next()`
* Request validation
* Required fields
* Data type validation
* Input validation
* Separation of concerns
* Middleware execution order
* HTTP status codes
* Centralized error handling

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Enable JSON request body parsing using `express.json()`
* Create a modular user router
* Create a separate `validateUser` middleware
* Validate the following fields:

  * `name`
  * `age`
  * `email`
* `name` must:

  * exist
  * be a string
  * not be empty
* `age` must:

  * exist
  * be a number
  * be at least `18`
* `email` must:

  * exist
  * be a string
  * contain `@`
* Return HTTP status `400` for invalid input
* Call `next()` when validation succeeds
* Create `POST /users` to process validated user data
* Return HTTP status `201` for successful user creation
* Keep validation logic separate from the route handler
* Keep the centralized error handler in the application
* Do not use a database or validation library

---

### Packages / Tools Used

| Package | Purpose                               |
| ------- | ------------------------------------- |
| express | Create server, routes, and middleware |
| dotenv  | Load environment variables            |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js`
4. Create a `middlewares` directory
5. Create `validateUser.js`
6. Create or reuse `errorHandler.js`
7. Initialize the Express application
8. Enable JSON parsing using `express.json()`
9. Mount the user router at `/users`
10. Create the `validateUser` middleware
11. Extract `name`, `age`, and `email` from `req.body`
12. Check whether all required fields exist
13. Validate that `name` is a non-empty string
14. Validate that `age` is a number and at least `18`
15. Validate that `email` is a string containing `@`
16. Return `400` immediately when validation fails
17. Call `next()` when all validation checks pass
18. Attach `validateUser` before the `POST /users` route handler
19. Return the validated user data with status `201`
20. Add a normal 404 middleware
21. Register the centralized error handler after the normal middleware
22. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route    | Description                  |
| ------ | -------- | ---------------------------- |
| POST   | `/users` | Validates and creates a user |

---

## How to Run

Install dependencies:

```bash id="5n4b5q"
npm install
```

Run the server:

```bash id="m0j8yb"
node server.js
```

Use Postman or another API client to test the endpoint.

### Valid Request

```text id="2n8o7p"
POST http://localhost:3000/users
```

Body → `raw` → `JSON`:

```json id="0j9k3w"
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

---

### Expected Behavior

A valid request:

```json id="9t3h7m"
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

returns:

```json id="7z2r6p"
{
    "message": "User created successfully",
    "user": {
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com"
    }
}
```

with HTTP status code `201`.

---

### Missing Required Field

Request:

```json id="v7q3x1"
{
    "name": "Shrikant",
    "age": 21
}
```

Returns:

```json id="w4p9c2"
{
    "error": "Name, age and email are required"
}
```

with HTTP status code `400`.

---

### Invalid Name

Request:

```json id="q1n8m4"
{
    "name": 123,
    "age": 21,
    "email": "shrikant@example.com"
}
```

Returns:

```json id="x6r2k8"
{
    "error": "Name must be valid"
}
```

with HTTP status code `400`.

An empty or whitespace-only name is also rejected.

---

### Invalid Age

Request:

```json id="m5c7y2"
{
    "name": "Shrikant",
    "age": 15,
    "email": "shrikant@example.com"
}
```

Returns:

```json id="j3v8p1"
{
    "error": "Age must be valid"
}
```

with HTTP status code `400`.

A string value such as:

```json id="h9s4w6"
{
    "age": "21"
}
```

is also rejected because the expected type is a number.

---

### Invalid Email

Request:

```json id="r2k6t8"
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikantexample.com"
}
```

Returns:

```json id="n7x3q5"
{
    "error": "Email must be valid"
}
```

with HTTP status code `400`.

---

### Unknown Route

Any unknown route returns:

```json id="b4m8y2"
{
    "error": "Route not found"
}
```

with HTTP status code `404`.

---

### How it works:

1. The client sends a `POST /users` request containing JSON data.
2. `express.json()` parses the JSON body and makes it available through `req.body`.
3. The request reaches the `/users` router.
4. `validateUser` middleware executes before the route handler.
5. The middleware extracts `name`, `age`, and `email` from `req.body`.
6. Required fields are checked first.
7. The middleware validates the data types and values.
8. If validation fails, it immediately returns a `400 Bad Request` response.
9. If validation succeeds, the middleware calls `next()`.
10. The request continues to the `POST /users` route handler.
11. The route handler returns the validated user data with `201 Created`.
12. If an unexpected application error occurs, `next(error)` can pass it to the centralized error handler.
13. If no route matches, the normal 404 middleware returns `404 Route not found`.

---

### Internal Working

Valid request:

```text id="z5k8p2"
Client
  ↓
POST /users
  ↓
express.json()
  ↓
validateUser
  ↓
All data valid
  ↓
next()
  ↓
POST /users handler
  ↓
201 Created
  ↓
Client
```

Invalid request:

```text id="q7m2x9"
Client
  ↓
POST /users
  ↓
express.json()
  ↓
validateUser
  ↓
Invalid data
  ↓
400 Bad Request
  ↓
Request ends
```

Notice that the route handler is **never executed** when validation fails.

---

### Learning Outcome

After completing this challenge, you should understand:

* How to create custom validation middleware.
* How middleware can inspect `req.body`.
* How middleware can stop an invalid request.
* How `next()` allows a valid request to continue.
* Why validation should be separated from route logic.
* How middleware can be reused across multiple routes.
* The difference between expected client errors and unexpected server errors.
* How validation middleware fits into a real Express request pipeline.