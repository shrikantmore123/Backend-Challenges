# 01 Express Server & Basic Routing

### Objective

Learn how to build a web server using Express.js and understand how Express simplifies routing compared to Node.js's native `http` module.

---

### Concepts Covered

* Express.js
* Express Application
* Route Handling
* `app.get()`
* `app.use()`
* HTTP Status Codes
* Environment Variables
* `dotenv`

---

### Requirements

* Create an Express server
* Use `PORT` from the `.env` file (fallback to `3000`)
* Routes:

  * `/` → `Welcome to Backend Challenges..!`
  * `/about` → `About Backend Challenges`
  * `/contact` → `Contact us at backend@example.com`
  * Any other route → `404 Page Not Found`
* Use Express only (do not use the native `http` module)

---

### Packages / Tools Used

| Package | Purpose                                 |
| ------- | --------------------------------------- |
| express | Create the web server and manage routes |
| dotenv  | Load environment variables from `.env`  |

(Type: `express` and `dotenv` are external packages.)

---

### Implementation Steps (Hints)

1. Initialize a Node.js project using `npm init -y`
2. Install `express` and `dotenv`
3. Create a `.env` file and define the `PORT`
4. Import and configure `dotenv`
5. Import Express and create an Express application
6. Read the port using `process.env.PORT || 3000`
7. Register the following routes:

   * `/`
   * `/about`
   * `/contact`
8. Add a catch-all route using `app.use()` to handle unknown routes
9. Start the server using `app.listen()`

---

### API Endpoints / Usage

| Method | Route    | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | /        | Returns the welcome message     |
| GET    | /about   | Returns the about message       |
| GET    | /contact | Returns the contact information |

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
http://localhost:3000/contact
```

---

### Expected Behavior

`/`

Returns:

```text
Welcome to Backend Challenges..!
```

---

`/about`

Returns:

```text
About Backend Challenges
```

---

`/contact`

Returns:

```text
Contact us at backend@example.com
```

---

Any other route returns:

```text
404 Page Not Found
```

with HTTP status code **404**.

---

### How it works:

1. The application starts and loads environment variables.
2. Express creates an application instance.
3. Incoming requests are matched against registered routes in the order they are defined.
4. If a matching route is found, Express executes its callback and sends the response.
5. If no route matches, the request reaches the catch-all `app.use()` middleware, which returns a `404 Not Found` response.
6. The server listens for incoming requests on the configured port.

---

### Learning Outcome

After completing this challenge, you should understand:

* How to create an Express application.
* How Express simplifies routing compared to Node.js's native `http` module.
* How to register routes using `app.get()`.
* How to handle unknown routes using `app.use()`.
* Why Express is the most widely used backend framework for Node.js.