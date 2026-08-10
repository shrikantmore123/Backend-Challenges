# 08 Async Routes & Error Handling (Express.js)

### Objective

Learn how asynchronous operations work inside Express routes using `Promise`, `async/await`, and `try/catch`, and understand how asynchronous errors are passed to centralized error-handling middleware.

---

### Concepts Covered

* Asynchronous JavaScript
* `Promise`
* `async/await`
* `setTimeout()`
* `try/catch`
* Async Express routes
* `next(error)`
* Centralized error handling
* Simulated asynchronous operations
* Error propagation
* HTTP status codes

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Create a modular user router
* Create a simulated asynchronous `getUser()` function
* Use `Promise` and `setTimeout()` to simulate delayed backend work
* Implement:

  * `GET /users/101` → Successfully fetch a user
  * `GET /users/500` → Simulate a user service failure
  * `GET /users/999` → Simulate a user-not-found error
* Use `async/await` inside the route
* Use `try/catch` to handle rejected Promises
* Pass errors to centralized error handling using `next(error)`
* Return HTTP status `200` for a successful request
* Return HTTP status `404` when the user is not found
* Return HTTP status `500` when the simulated user service fails
* Do not use MongoDB, Mongoose, or an external API

---

### Packages / Tools Used

| Package | Purpose                             |
| ------- | ----------------------------------- |
| express | Create the server and handle routes |
| dotenv  | Load environment variables          |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js`
4. Create a `middleware` directory
5. Create `errorHandler.js`
6. Initialize an Express application
7. Load the port from the environment configuration
8. Mount the user router at `/users`
9. Create a `getUser()` function that returns a Promise
10. Use `setTimeout()` to simulate asynchronous work
11. Resolve the Promise when the requested user exists
12. Reject the Promise when the user service fails
13. Add `status = 500` to the service failure error
14. Reject with a `404` error when the user does not exist
15. Create an `async` route handler
16. Get the user ID using `req.params.id`
17. Use `await getUser(userId)` to wait for the asynchronous operation
18. Wrap the asynchronous operation inside `try/catch`
19. Return the user data when the Promise resolves
20. Pass errors to `next(error)` when the Promise rejects
21. Use the centralized error handler to generate the final error response
22. Add a final 404 middleware
23. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route        | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/users/101` | Successfully fetches the user    |
| GET    | `/users/500` | Simulates a user service failure |
| GET    | `/users/999` | Simulates a user-not-found error |
| GET    | `/users/:id` | Handles other user IDs           |

---

## How to Run

Install dependencies:

```bash id="wzv8yd"
npm install
```

Run the server:

```bash id="a7f5p3"
node server.js
```

Then open in browser:

```text id="jgl8u4"
http://localhost:3000/users/101
```

```text id="e3w2iz"
http://localhost:3000/users/500
```

```text id="y3o6k9"
http://localhost:3000/users/999
```

---

### Expected Behavior

`GET /users/101`

The server waits for the simulated asynchronous operation and then returns:

```json id="e0trr8"
{
    "message": "User fetched successfully",
    "user": {
        "id": "101",
        "name": "shrikant"
    }
}
```

with HTTP status code `200`.

---

`GET /users/500`

The simulated user service rejects the Promise with a `500` error.

Returns:

```json id="4p8v0j"
{
    "error": "User service failed"
}
```

with HTTP status code `500`.

---

`GET /users/999`

The simulated service rejects with a `404` error.

Returns:

```json id="k2a1ps"
{
    "error": "User not found"
}
```

with HTTP status code `404`.

---

Any other unknown application route returns:

```text id="y9j8q2"
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. The client sends a request to `/users/:id`.
2. Express passes the request to the user router.
3. The route extracts the ID using `req.params.id`.
4. The route calls the asynchronous `getUser()` function.
5. `getUser()` returns a Promise.
6. `setTimeout()` simulates a delayed asynchronous operation.
7. `await` pauses the async route until the Promise settles.
8. If the Promise resolves, the user data is returned with a `200` response.
9. If the Promise rejects, `await` throws the error.
10. The `catch` block receives the error.
11. `next(error)` passes the error to the centralized error handler.
12. The error handler reads the error status using `err.status || 500`.
13. The error message is returned as a JSON response.
14. Unknown routes are handled by the application's normal 404 middleware.

---

### Internal Working

Successful request:

```text id="h4jz0k"
Client
  ↓
GET /users/101
  ↓
Express Router
  ↓
async route
  ↓
getUser("101")
  ↓
Promise
  ↓
setTimeout()
  ↓
resolve(user)
  ↓
await receives user
  ↓
res.json()
  ↓
Client
```

Failed request:

```text id="2akqz7"
Client
  ↓
GET /users/500
  ↓
async route
  ↓
getUser("500")
  ↓
Promise rejects
  ↓
await throws error
  ↓
catch(error)
  ↓
next(error)
  ↓
Central Error Handler
  ↓
500 JSON response
  ↓
Client
```

---

### Learning Outcome

After completing this challenge, you should understand:

* How Promises represent asynchronous operations.
* How `async/await` simplifies asynchronous code.
* How `try/catch` handles rejected Promises.
* How asynchronous errors can be passed using `next(error)`.
* How async routes connect to centralized error handling.
* Why asynchronous error handling is important for database and API operations.
* How the same pattern will later apply to MongoDB and Mongoose operations.