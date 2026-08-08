# 02 Static Files & HTML Responses (Express.js)

### Objective

Learn how to serve static files such as HTML, CSS, and JavaScript from an Express server using `express.static()`.

---

### Concepts Covered

* Express static files
* `express.static()`
* Public directory
* Serving HTML files
* Serving CSS files
* Serving JavaScript files
* Middleware
* Browser asset requests

---

### Requirements

* Create an Express server
* Use port `3000` from the `.env` file
* Serve files from a `public` directory
* The `public` directory must contain:

  * `index.html`
  * `style.css`
  * `script.js`
* `/` → Serve `index.html`
* `/style.css` → Serve CSS file
* `/script.js` → Serve JavaScript file
* Any unavailable route or file → `404 Page Not Found`
* Use `express.static()`
* Do not use `res.sendFile()` for serving the files

---

### Packages / Tools Used

| Package | Purpose                                      |
| ------- | -------------------------------------------- |
| express | Create the web server and serve static files |
| dotenv  | Load environment variables from `.env`       |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Create `server.js`
2. Create a `public` directory
3. Add:

   * `index.html`
   * `style.css`
   * `script.js`
4. Initialize an Express application
5. Load the port from `.env`
6. Configure the `public` directory using `express.static()`
7. Link `style.css` and `script.js` from `index.html`
8. Add a fallback middleware for unavailable routes
9. Start the server on port `3000`

---

### API Endpoints / Usage

| Method | Route      | Description            |
| ------ | ---------- | ---------------------- |
| GET    | /          | Serves `index.html`    |
| GET    | /style.css | Serves CSS file        |
| GET    | /script.js | Serves JavaScript file |
| GET    | /unknown   | Returns 404 response   |

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

To test the static files directly:

```text
http://localhost:3000/style.css
```

```text
http://localhost:3000/script.js
```

To test the 404 response:

```text
http://localhost:3000/unknown
```

---

### Expected Behavior

`/`

Serves the `index.html` page containing:

* Backend Challenges heading
* Description
* Test button

---

`/style.css`

Loads the CSS and applies styling to the HTML page.

---

`/script.js`

Loads the JavaScript functionality.

Clicking the test button displays:

```text
Express static files are working!
```

---

Any unavailable route returns:

```text
404 Page Not Found
```

with HTTP status code `404`.

---

### How it works:

1. Browser sends a request to the Express server.
2. `express.static("public")` checks whether the requested resource exists inside the `public` directory.
3. For `/`, Express finds and serves `public/index.html`.
4. The browser reads the HTML and requests `/style.css` and `/script.js`.
5. Express static middleware finds those files inside `public` and sends them to the browser.
6. The browser applies the CSS and executes the JavaScript.
7. If the requested resource does not exist, the request continues to the next middleware.
8. The final middleware returns a `404 Page Not Found` response.

---

### Learning Outcome

After completing this challenge, you should understand:

* What static files are.
* How `express.static()` works.
* How Express maps URLs to files inside a public directory.
* How HTML, CSS, and JavaScript are served by a backend server.
* Why middleware order matters.
* The difference between serving static files and creating API routes.
