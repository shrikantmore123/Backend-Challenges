# 02 File System Logger (Node.js)

### Objective

Learn how to use Node.js File System (fs) module to store and retrieve data from files by building a simple logging API.

---

### Concepts Covered

- Node.js `fs` module
- Asynchronous file operations
- Appending data to files
- Reading file contents
- Query parameters
- Basic API development using Node.js

---

### Requirements

- Use only Node.js core modules
- Server must run on port `3000`
- Create and maintain a `logs.txt` file
- Routes:
    - `/log?msg=<message>` → Add log entry
    - `/logs` → Retrieve all logs
    - Any other route → `404 Not Found`
- No Express or external libraries

---

### Packages / Tools Used

| Package | Purpose |
|--------|---------|
| http   | Create HTTP server |
| fs   | Read and write files |
| url   | Parse URL and query parameters |

(Type: Built-in module)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Import:
    - `http`
    - `fs`
    - `url`
3. Create HTTP server
4. Parse URL using `url.parse()`
5. Extract pathname and query parameters
6. Handle `/log` route:
    - Validate message
    - Generate timestamp
    - Append data to `logs.txt`
7. Handle `/logs` route:
    - Read file contents
    - Return stored logs
8. Handle invalid routes with 404 response
9. Start server on port `3000`

---

### API Endpoints / Usage

| Method | Route | Description |
|--------|-------|-------------|
| GET | /log?msg=Hello | Add a log entry |
| GET | /logs | Retrieve all logs |

---

## How to Run

```bash
node server.js
```
Then open in browser:

```
http://localhost:3000/log?msg=Hello
```
```
http://localhost:3000/logs
```

---

### Expected Behavior

`/log?msg=Hello`

Creates a log entry:

`[2026-06-24T12:00:00.000Z]` Hello

inside `logs.txt`.

`/logs`

Returns all stored log entries.

Missing message:

{
  "error": "Message is required"
}

Any other route returns:

404 Not Found

---

### How it works:

1. Browser sends HTTP request
2. Node server receives request
3. URL is parsed using `url.parse()`
4. Route pathname is checked
5. For `/log`:
    - Message is extracted
    - Timestamp is generated
    - Data is appended to `logs.txt`
6. For `/logs`:
    - File contents are read
    - Logs are returned
7. Unknown routes return 404
8. Data persists even after server restart because it is stored in a file