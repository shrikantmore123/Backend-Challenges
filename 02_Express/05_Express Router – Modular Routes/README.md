# 05 Express Router – Modular Routes

### Objective

Learn how to use `express.Router()` to organize Express routes into separate files and understand how route prefixes connect modular routes to the main application.

---

### Concepts Covered

* `express.Router()`
* Modular routes
* Route files
* `app.use()`
* Route prefixes
* ES Module imports and exports
* Separation of concerns
* HTTP methods
* HTTP status codes

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Create a separate router for user-related routes
* Store user routes inside `routes/userRoute.js`
* Mount the user router at `/users`
* Implement:

  * `GET /users` → Return all users
  * `GET /users/:id` → Return a user by ID
  * `POST /users` → Create a user
  * `DELETE /users/:id` → Delete a user
* Return HTTP status `201` for successful user creation
* Return HTTP status `404` for unknown routes
* Use ES Module imports and exports
* Do not use a database

---

### Packages / Tools Used

| Package | Purpose                              |
| ------- | ------------------------------------ |
| express | Create the server and modular routes |
| dotenv  | Load environment variables           |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `routes` directory
3. Create `userRoute.js` inside the `routes` directory
4. Import Express inside `userRoute.js`
5. Create a router using `express.Router()`
6. Add user routes to the router:

   * `GET /`
   * `GET /:id`
   * `POST /`
   * `DELETE /:id`
7. Access user IDs using `req.params.id`
8. Export the router from `userRoute.js`
9. Import the router into `server.js`
10. Mount the router using `app.use("/users", userRouter)`
11. Add a final 404 middleware in `server.js`
12. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route        | Description          |
| ------ | ------------ | -------------------- |
| GET    | `/users`     | Returns all users    |
| GET    | `/users/:id` | Returns a user by ID |
| POST   | `/users`     | Creates a user       |
| DELETE | `/users/:id` | Deletes a user by ID |

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

Then test the routes using a browser or API client.

Get all users:

```text
http://localhost:3000/users
```

Get a specific user:

```text
http://localhost:3000/users/101
```

For POST:

```text
POST http://localhost:3000/users
```

For DELETE:

```text
DELETE http://localhost:3000/users/101
```

Test an unknown route:

```text
http://localhost:3000/random
```

---

### Expected Behavior

`GET /users`

Returns:

```json
{
    "message": "All users"
}
```

---

`GET /users/101`

Returns:

```json
{
    "message": "User found",
    "userId": "101"
}
```

---

`POST /users`

Returns:

```json
{
    "message": "User created"
}
```

with HTTP status code `201`.

---

`DELETE /users/101`

Returns:

```json
{
    "message": "User deleted",
    "userId": "101"
}
```

---

Any unknown route returns:

```text
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. The application starts and imports the user router.
2. The user router is mounted at `/users` using `app.use()`.
3. Express receives an incoming request and passes `/users` requests to the user router.
4. The router matches the remaining path against its registered routes.
5. `router.get("/")` becomes `GET /users`.
6. `router.get("/:id")` becomes `GET /users/:id`.
7. `router.post("/")` becomes `POST /users`.
8. `router.delete("/:id")` becomes `DELETE /users/:id`.
9. Dynamic IDs are accessed through `req.params.id`.
10. If no application route matches, the final 404 middleware returns a `404 Not Found` response.

---

### Learning Outcome

After completing this challenge, you should understand:

* Why `express.Router()` is used in Express applications.
* How to separate routes into different files.
* How `app.use()` mounts a router.
* How route prefixes combine with router paths.
* How modular routing improves project organization.
* How ES Module imports and exports connect different backend files.
* Why separating routes becomes important as an application grows.