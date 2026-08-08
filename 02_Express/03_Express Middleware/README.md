# 03 Express Middleware

### Objective

Learn how Express middleware works in the request-response lifecycle by creating custom global and route-specific middleware.

---

### Concepts Covered

* Express middleware
* `app.use()`
* `req`, `res`, and `next`
* Request-response lifecycle
* Custom middleware
* Global middleware
* Route-specific middleware
* Middleware execution order
* Request logging
* Modifying the request object
* HTTP status codes

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Create a global request logger middleware
* Log the following information for every request:

  * Timestamp
  * HTTP method
  * Requested URL
* Create the following routes:

  * `/` → Welcome message
  * `/about` → Middleware demonstration message
  * `/admin` → Admin route using route-specific middleware
* The `/admin` middleware must add `isAdmin` to the request object
* Return `404 Page Not Found` for unknown routes
* Use `next()` to pass control to the next middleware or route handler

---

### Packages / Tools Used

| Package | Purpose                                            |
| ------- | -------------------------------------------------- |
| express | Create the server and manage middleware and routes |
| dotenv  | Load environment variables                         |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Initialize an Express application
3. Load the port from the environment configuration
4. Create a global logger middleware
5. Use `new Date().toISOString()` to generate a timestamp
6. Use `req.method` to get the HTTP method
7. Use `req.url` to get the requested URL
8. Log the request information using `console.log()`
9. Call `next()` so the request can continue
10. Create `/` and `/about` routes
11. Create route-specific middleware for `/admin`
12. Add `req.isAdmin = true`
13. Call `next()` from the admin middleware
14. Create the `/admin` route handler and return the `isAdmin` value
15. Add a final 404 middleware
16. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route  | Description                            |
| ------ | ------ | -------------------------------------- |
| GET    | /      | Returns the welcome message            |
| GET    | /about | Demonstrates global middleware         |
| GET    | /admin | Demonstrates route-specific middleware |

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

Then open in browser:

```text
http://localhost:3000/
```

```text
http://localhost:3000/about
```

```text
http://localhost:3000/admin
```

Test an unknown route:

```text
http://localhost:3000/random
```

---

### Expected Behavior

`/`

Returns:

```text
Welcome to Middleware Challenge
```

---

`/about`

Returns:

```text
This request passed through middleware.
```

---

`/admin`

Returns:

```json
{
  "message": "Admin route accessed",
  "isAdmin": true
}
```

---

Every request should also produce a log in the server terminal similar to:

```text
[2026-08-08T12:35:21.421Z] GET /
[2026-08-08T12:36:05.817Z] GET /about
[2026-08-08T12:36:42.219Z] GET /admin
```

---

An unknown route returns:

```text
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. A request arrives at the Express server.
2. The global logger middleware executes first.
3. The middleware records the timestamp, HTTP method, and requested URL.
4. `next()` passes control to the next middleware or route.
5. Express checks the registered routes.
6. For `/admin`, the route-specific middleware executes before the route handler.
7. The admin middleware adds `isAdmin` to the request object.
8. `next()` passes the modified request to the `/admin` handler.
9. The route handler sends the response.
10. If no route matches, the final 404 middleware sends a `404` response.

---

### Learning Outcome

After completing this challenge, you should understand:

* What Express middleware is.
* How `app.use()` registers global middleware.
* How `next()` controls request flow.
* Why middleware order matters.
* How middleware can modify the request object.
* The difference between global and route-specific middleware.
* How server-side request logging works.