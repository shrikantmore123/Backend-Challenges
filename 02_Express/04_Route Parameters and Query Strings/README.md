# 04 Route Parameters & Query Strings (Express.js)

### Objective

Learn how Express handles dynamic route parameters and query strings, and understand the difference between `req.params` and `req.query`.

---

### Concepts Covered

* Route parameters
* `req.params`
* Query strings
* `req.query`
* Dynamic routes
* Multiple route parameters
* Multiple query parameters
* Query parameter validation
* HTTP status codes

---

### Requirements

* Create an Express server
* Use port `3000` from the environment configuration
* Create a route to retrieve a user using a dynamic user ID
* Create a route to retrieve a post using both user ID and post ID
* Create a search route using query parameters
* Support multiple query parameters
* Validate the required `name` query parameter
* Return HTTP status `400` when `name` is missing
* Return HTTP status `404` for unknown routes

Routes:

* `/users/:userId` → Return the user ID
* `/users/:userId/posts/:postId` → Return user ID and post ID
* `/search?name=<name>` → Return the search name
* `/search?name=<name>&age=<age>` → Return name and age
* Any other route → `404 Page Not Found`

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
2. Initialize an Express application
3. Load the port from the environment configuration
4. Create a dynamic route using `:userId`
5. Access the route parameter using `req.params.userId`
6. Create a route with multiple parameters:

   * `:userId`
   * `:postId`
7. Access both parameters using `req.params`
8. Create a `/search` route
9. Extract query parameters using `req.query`
10. Destructure `name` and `age` from the query
11. Check whether the required `name` parameter exists
12. Return status `400` when `name` is missing
13. Return only `name` when `age` is not provided
14. Return both `name` and `age` when both are provided
15. Add a final 404 middleware
16. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route                          | Description                             |
| ------ | ------------------------------ | --------------------------------------- |
| GET    | `/users/:userId`               | Retrieve a user using a dynamic ID      |
| GET    | `/users/:userId/posts/:postId` | Retrieve a post using user and post IDs |
| GET    | `/search?name=...`             | Search using a name query parameter     |
| GET    | `/search?name=...&age=...`     | Search using multiple query parameters  |

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
http://localhost:3000/users/101
```

```text
http://localhost:3000/users/101/posts/25
```

```text
http://localhost:3000/search?name=shrikant
```

```text
http://localhost:3000/search?name=shrikant&age=21
```

Test missing query parameter:

```text
http://localhost:3000/search
```

---

### Expected Behavior

`/users/101`

Returns:

```json
{
    "message": "User found",
    "userId": "101"
}
```

---

`/users/101/posts/25`

Returns:

```json
{
    "userId": "101",
    "postId": "25"
}
```

---

`/search?name=shrikant`

Returns:

```json
{
    "name": "shrikant"
}
```

---

`/search?name=shrikant&age=21`

Returns:

```json
{
    "name": "shrikant",
    "age": "21"
}
```

Query parameter values are received as strings.

---

`/search`

Returns:

```json
{
    "error": "Name query parameter is required"
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

1. The browser sends a request to the Express server.
2. Express matches the request against the registered routes.
3. For routes containing `:userId` or `:postId`, Express extracts the dynamic values into `req.params`.
4. For URLs containing query parameters, Express extracts the values into `req.query`.
5. The `/search` route checks whether the required `name` parameter exists.
6. If `name` is missing, the server returns a `400 Bad Request` response.
7. If `name` is present, the server returns the requested search information.
8. If no route matches, the final middleware returns a `404 Not Found` response.

---

### Learning Outcome

After completing this challenge, you should understand:

* The difference between route parameters and query parameters.
* How to access dynamic values using `req.params`.
* How to access query values using `req.query`.
* How to handle multiple route and query parameters.
* How to validate query parameters.
* The difference between an HTTP status code and the response body.