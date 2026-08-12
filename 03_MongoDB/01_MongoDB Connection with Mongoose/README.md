# 01 MongoDB Connection with Mongoose

### Objective

Learn how to connect a Node.js/Express application to MongoDB using Mongoose and understand how database connection configuration and application startup should be handled.

---

### Concepts Covered

* MongoDB
* Mongoose
* Database connection
* `mongoose.connect()`
* MongoDB connection URI
* Environment variables
* `.env`
* `process.env`
* `async/await`
* `try/catch`
* Database connection error handling
* Application startup flow
* Separation of configuration from application logic

---

### Requirements

* Create an Express server
* Use port `3000`
* Install and use Mongoose
* Store the MongoDB connection URI in `.env`
* Create a separate `config/db.js` file for the database connection
* Create a `connectDB()` function
* Connect to MongoDB using `mongoose.connect()`
* Use `async/await` for the database connection
* Handle connection errors using `try/catch`
* Stop the application if the database connection fails
* Start the Express server only after MongoDB connects successfully
* Create a simple `/` route to verify that the server is running
* Do not create any Mongoose schema or model yet
* Do not implement CRUD operations
* Do not create unnecessary route or middleware directories

---

### Packages / Tools Used

| Package  | Purpose                                |
| -------- | -------------------------------------- |
| express  | Create the HTTP server                 |
| mongoose | Connect and communicate with MongoDB   |
| dotenv   | Load environment variables from `.env` |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create a new challenge directory inside `03-mongodb-mongoose`
2. Initialize the Node.js project if required
3. Install Express, Mongoose, and dotenv
4. Create `server.js`
5. Create a `config` directory
6. Create `config/db.js`
7. Import `mongoose` inside `db.js`
8. Create an asynchronous `connectDB()` function
9. Read the MongoDB URI using `process.env.MONGO_URI`
10. Use `mongoose.connect()` to connect to MongoDB
11. Use `try/catch` to handle connection errors
12. Print a success message after MongoDB connects
13. Stop the application using `process.exit(1)` if the connection fails
14. Export `connectDB()` from `db.js`
15. Import `connectDB()` into `server.js`
16. Create an asynchronous `startServer()` function
17. Call `await connectDB()` inside `startServer()`
18. Start Express using `app.listen()` only after the database connection succeeds
19. Create a simple `GET /` route
20. Add a normal 404 response for unknown routes
21. Store `MONGO_URI` inside `.env`
22. Add `.env` to `.gitignore`

---

### API Endpoints / Usage

| Method | Route | Description                                 |
| ------ | ----- | ------------------------------------------- |
| GET    | `/`   | Verifies that the Express server is running |

---

## How to Run

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash
node server.js
```

If the MongoDB connection is successful, the terminal should show:

```text
MongoDB connected successfully
Server is running on port 3000
```

Then open:

```text
http://localhost:3000/
```

---

### Expected Behavior

When MongoDB is available:

```text
MongoDB connected successfully
Server is running on port 3000
```

Request:

```text
GET /
```

returns:

```text
MongoDB connection with Mongoose
```

with HTTP status code `200`.

---

### MongoDB Connection Failure

If the MongoDB URI is incorrect or MongoDB cannot be reached:

```text
MongoDB connection failed
```

should be displayed.

The application should terminate instead of starting the Express server without a working database connection.

---

### Unknown Route

For example:

```text
GET /unknown
```

returns:

```text
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. Node.js starts the application.
2. `dotenv` loads variables from `.env`.
3. `server.js` creates the Express application.
4. The `connectDB()` function is imported from `config/db.js`.
5. The application calls `startServer()`.
6. `startServer()` waits for `connectDB()` using `await`.
7. `connectDB()` reads `MONGO_URI` from `process.env`.
8. `mongoose.connect()` attempts to establish a connection with MongoDB.
9. If the connection succeeds, a success message is displayed.
10. `connectDB()` completes successfully.
11. `startServer()` continues execution.
12. `app.listen()` starts the Express server on port `3000`.
13. If the MongoDB connection fails, the `catch` block handles the error.
14. `process.exit(1)` stops the application.
15. The Express server does not start when the required database connection fails.

---

### Internal Working

Successful startup:

```text
Node.js starts
      ↓
Load .env
      ↓
Create Express app
      ↓
startServer()
      ↓
await connectDB()
      ↓
mongoose.connect()
      ↓
MongoDB
      ↓
Connection successful
      ↓
app.listen(3000)
      ↓
Express server starts
```

Failed startup:

```text
Node.js starts
      ↓
Load .env
      ↓
startServer()
      ↓
await connectDB()
      ↓
mongoose.connect()
      ↓
MongoDB connection fails
      ↓
catch(error)
      ↓
process.exit(1)
      ↓
Application stops
```

---

### Important Design Decision

The Express server is intentionally started **after** the MongoDB connection succeeds.

Instead of:

```text
connectDB()
   ↓
app.listen()
```

where both operations can begin independently, the challenge uses:

```text
startServer()
   ↓
await connectDB()
   ↓
app.listen()
```

This ensures that the application does not start accepting requests before its required database connection is ready.

---

### Learning Outcome

After completing this challenge, you should understand:

* What Mongoose is and why it is used with MongoDB.
* How an Express application connects to MongoDB.
* How to store database credentials securely using environment variables.
* How `mongoose.connect()` works at a basic level.
* Why database connection code should be separated into its own configuration file.
* How `async/await` handles the asynchronous database connection.
* How `try/catch` handles connection failures.
* Why the application should wait for the database before starting the server.
* The difference between an Express server and a MongoDB connection.
* Why schemas and models are not required just to establish a database connection.