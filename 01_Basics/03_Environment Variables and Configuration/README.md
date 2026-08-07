# 03 Environment Variables & Configuration (Node.js)

### Objective

Learn how to manage application configuration using environment variables instead of hardcoding values. Understand how `dotenv` loads variables from a `.env` file and makes them available throughout the application.

---

### Concepts Covered

* Environment Variables
* `process.env`
* `.env` file
* `dotenv` package
* Configuration Management
* Default (Fallback) Values

---

### Requirements

* Use `dotenv` to load environment variables
* Server must read the port from the `.env` file
* Use `3000` as the default port if no port is provided
* Routes:

  * `/` → Welcome message
  * `/config` → Display current application configuration
  * Any other route → `404 Not Found`
* Do not hardcode configuration values

---

### Packages / Tools Used

| Package | Purpose                                |
| ------- | -------------------------------------- |
| http    | Create HTTP server                     |
| dotenv  | Load environment variables from `.env` |

(Type: `http` is a built-in module, `dotenv` is an external package.)

---

### Implementation Steps (Hints)

1. Initialize a Node.js project using `npm init -y`
2. Install the `dotenv` package
3. Create a `.env` file
4. Add:

   * `PORT`
   * `APP_NAME`
   * `NODE_ENV`
5. Load environment variables using `dotenv`
6. Read values using `process.env`
7. Use a fallback value for the port
8. Create the HTTP server
9. Handle routes:

   * `/`
   * `/config`
   * Default → `404`
10. Start the server

---

### API Endpoints / Usage

| Method | Route   | Description                       |
| ------ | ------- | --------------------------------- |
| GET    | /       | Returns a welcome message         |
| GET    | /config | Returns application configuration |

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

```
http://localhost:5000/
```

```
http://localhost:5000/config
```

> **Note:** If `PORT` is not defined in the `.env` file, the server will automatically run on port `3000`.

---

### Expected Behavior

`/`

Returns:

```
Welcome to Backend Challenges
```

---

`/config`

Returns:

```json
{
  "appName": "Backend Challenges",
  "environment": "development",
  "port": "3000"
}
```

---

Any other route returns:

```
404 Not Found
```

---

### How it works:

1. The application starts.
2. `dotenv` loads variables from the `.env` file.
3. Environment variables become available through `process.env`.
4. The server reads configuration values such as the port and application name.
5. When a request is received, the requested route is matched.
6. The server responds using values loaded from the environment.
7. Changing the `.env` file updates the application's configuration without modifying the source code.

---

### Learning Outcome

After completing this challenge, you should understand:

* Why environment variables are used in backend development.
* How to use the `dotenv` package.
* How to access values using `process.env`.
* Why sensitive information should never be hardcoded.
* How configuration can be changed without modifying application code.
