# 07 Centralized Error Handling (Express.js)

### Objective

Learn how Express handles application errors using `next(error)` and how to create centralized error-handling middleware for consistent error responses.

---

### Concepts Covered

* Express error handling
* `next(error)`
* Error-handling middleware
* `err`, `req`, `res`, and `next`
* Custom errors
* Error status codes
* Centralized error responses
* Middleware execution order
* Route ordering
* Normal 404 handling
* Application-level errors

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Create a modular user router
* Create a separate error-handling middleware
* Implement:

  * `GET /users/:id` → Return user information
  * `GET /users/error` → Intentionally trigger an application error
  * `GET /users/404` → Trigger a user-not-found error
* Pass application errors using `next(error)`
* Handle all application errors in a centralized error handler
* Use `err.status || 500` to determine the response status
* Return errors as JSON
* Return `404` for unknown application routes
* Keep specific routes before dynamic routes
* Do not use a database

---

### Packages / Tools Used

| Package | Purpose                                              |
| ------- | ---------------------------------------------------- |
| express | Create server, routes, and error-handling middleware |
| dotenv  | Load environment variables                           |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js`
4. Create a `middleware` directory
5. Create `errorHandler.js`
6. Initialize the Express application
7. Load the port from the environment configuration
8. Mount the user router at `/users`
9. Create `GET /:id` inside the user router
10. Create `/error` to intentionally generate an error
11. Create `/404` to generate a user-not-found error
12. Pass errors using `next(error)`
13. Add a `status` property to errors when required
14. Create error middleware using `(err, req, res, next)`
15. Use `err.status || 500` to determine the status code
16. Return `err.message` in the JSON response
17. Add normal 404 middleware for unknown routes
18. Register the error handler after the routes
19. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route          | Description                           |
| ------ | -------------- | ------------------------------------- |
| GET    | `/users/:id`   | Returns user information              |
| GET    | `/users/error` | Intentionally triggers a server error |
| GET    | `/users/404`   | Triggers a user-not-found error       |
| GET    | `/random`      | Returns route-not-found response      |

---

## How to Run

Install dependencies:

```bash id="4c3n2k"
npm install
```

Run the server:

```bash id="7cn3s8"
node server.js
```

Then open in browser:

Normal user:

```text id="2cslq9"
http://localhost:3000/users/101
```

Application error:

```text id="x2c3h9"
http://localhost:3000/users/error
```

User not found:

```text id="b7v8n5"
http://localhost:3000/users/404
```

Unknown route:

```text id="m7v6xz"
http://localhost:3000/random
```

---

### Expected Behavior

`GET /users/101`

Returns:

```json id="knp6ft"
{
    "message": "User found",
    "userId": "101"
}
```

with HTTP status code `200`.

---

`GET /users/error`

The route creates an error and passes it to the centralized error handler.

Returns:

```json id="0x0k1z"
{
    "error": "Something went wrong"
}
```

with HTTP status code `500`.

---

`GET /users/404`

The route creates an error with status `404` and passes it to the centralized error handler.

Returns:

```json id="1v5q9p"
{
    "error": "User not found"
}
```

with HTTP status code `404`.

---

`GET /random`

No route matches, so the normal 404 middleware responds with:

```json id="0q2q6j"
{
    "error": "Route not found"
}
```

with HTTP status code `404`.

---

### How it works:

1. The client sends a request to the Express server.
2. Express passes the request through the registered routes.
3. If a normal route matches, the route handler sends the response.
4. If an application error occurs, the route creates an error object.
5. The route calls `next(error)` instead of sending the response directly.
6. Express recognizes the error and searches for error-handling middleware.
7. The centralized `errorHandler` receives the error through the `err` parameter.
8. The error handler determines the status using `err.status || 500`.
9. The error message is returned as a consistent JSON response.
10. If no route matches at all, the normal 404 middleware returns `Route not found`.
11. Specific routes must be registered before dynamic routes such as `/:id` so that the dynamic route does not capture requests intended for specific paths.

---

### Learning Outcome

After completing this challenge, you should understand:

* How Express handles errors.
* The difference between `next()` and `next(error)`.
* How to create custom errors.
* How error-handling middleware works.
* Why error middleware uses `(err, req, res, next)`.
* How to centralize error responses.
* How default status `500` can be applied to unexpected errors.
* The difference between an application error and a route-not-found error.
* Why Express route ordering matters.