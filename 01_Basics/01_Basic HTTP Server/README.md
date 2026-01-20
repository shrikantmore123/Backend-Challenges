# 01 Basic HTTP Server (Node.js)

### Objective

Learn how to create a basic HTTP server using Node.js core modules and understand how request-response routing works internally without using Express.

---

### Concepts Covered

- Node.js `http` module
- Request & response lifecycle
- Manual routing using `req.url`
- HTTP status codes
- Sending JSON and text responses

---

### Requirements

- Use only Node.js core modules
- Server must run on port `3000`
- Routes:
  - `/` → `Backend Challenges Started`
  - `/health` → `{ "status": "OK" }`
  - Any other route → `404 Not Found`
- No Express or external libraries

---

### Packages / Tools Used

| Package | Purpose |
|--------|---------|
| http   | Create HTTP server |

(Type: Built-in module)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Import Node’s `http` module
3. Create server using `http.createServer()`
4. Extract route using `req.url`
5. Handle routes:
   - `/`
   - `/health`
   - default → 404
6. Set proper headers using `res.writeHead()`
7. Send response using `res.end()`
8. Start server using `server.listen(3000)`

---

### API Endpoints / Usage

| Method | Route | Description |
|--------|-------|-------------|
| GET | / | Returns startup message |
| GET | /health | Returns server health JSON |

---

## How to Run

```bash
node server.js
```
Then open in browser:

```
http://localhost:3000/
```
```
http://localhost:3000/health
```

---

### Expected Behavior

`/` returns: `Backend Challenges Started`

`/health` returns JSON: `{ "status": "OK" }`

Any other route returns: `404 Not Found`

---

### How it works:

1. Browser sends HTTP request
2. Node server receives it in req
3. Route is checked using req.url
4. Matching response is prepared
5. Headers and status code are set
6. Response is sent using res.end()
7. Connection closes