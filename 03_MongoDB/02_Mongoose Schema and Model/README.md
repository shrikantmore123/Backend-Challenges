# 02 Mongoose Schema & Model

### Objective

Learn how to define the structure and validation rules of MongoDB documents using a Mongoose Schema, create a Mongoose Model from that schema, and use the model to create a document in MongoDB.

---

### Concepts Covered

* Mongoose Schema
* Mongoose Model
* Schema fields
* Field data types
* Required fields
* Minimum value validation
* Minimum string length validation
* Default values
* Unique fields
* MongoDB documents
* `mongoose.model()`
* `Model.create()`
* Mongoose validation
* MongoDB `_id`
* `async/await`

---

### Requirements

* Connect the Express application to MongoDB using Mongoose
* Create a `models` directory
* Create a `User.js` model
* Create a Mongoose Schema for users
* Define the following fields:

  * `name`
  * `age`
  * `email`
  * `createdAt`
* `name` must:

  * be a `String`
  * be required
  * contain at least 2 characters
* `age` must:

  * be a `Number`
  * be required
  * be at least `18`
* `email` must:

  * be a `String`
  * be required
  * be unique
* `createdAt` must:

  * be a `Date`
  * automatically receive the current date when a document is created
* Create a `User` model using the schema
* Create a `POST /users` endpoint
* Use `User.create()` to save a user to MongoDB
* Return the created document in the response
* Do not implement full CRUD yet
* Do not create controllers or services

---

### Packages / Tools Used

| Package  | Purpose                                            |
| -------- | -------------------------------------------------- |
| express  | Create the HTTP server and API route               |
| mongoose | Define schemas/models and communicate with MongoDB |
| dotenv   | Load environment variables                         |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Reuse the MongoDB connection from Challenge 01
2. Create a `models` directory
3. Create `models/User.js`
4. Import Mongoose
5. Create a `userSchema` using `new mongoose.Schema()`
6. Define the `name` field as a required `String`
7. Add `minlength: 2` to the `name` field
8. Define the `age` field as a required `Number`
9. Add `min: 18` to the `age` field
10. Define the `email` field as a required `String`
11. Add `unique: true` to the `email` field
12. Define `createdAt` as a `Date`
13. Use `default: Date.now` for `createdAt`
14. Create a Mongoose model using `mongoose.model()`
15. Export the `User` model
16. Create or reuse a user router
17. Create `POST /users`
18. Read `name`, `age`, and `email` from `req.body`
19. Use `User.create()` to create the MongoDB document
20. Return the created user with status `201`
21. Test Mongoose's schema validation
22. Test duplicate email behavior
23. Verify the created document in MongoDB

---

### API Endpoints / Usage

| Method | Route    | Description                        |
| ------ | -------- | ---------------------------------- |
| POST   | `/users` | Creates a user document in MongoDB |

---

## How to Run

Install dependencies:

```bash id="j3t6p9"
npm install
```

Make sure your `.env` contains:

```env id="2k4x8m"
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash id="w8q1v6"
node server.js
```

The terminal should show:

```text id="r5x7c2"
MongoDB connection successful
Server is running on port 3000
```

---

### Create User

Send:

```text id="7c4m2p"
POST http://localhost:3000/users
```

with JSON body:

```json id="g8v3q1"
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

Expected status:

```text id="h2m7x5"
201 Created
```

Expected response:

```json id="n4c9z6"
{
    "message": "User created successfully",
    "user": {
        "_id": "...",
        "name": "Shrikant",
        "age": 21,
        "email": "shrikant@example.com",
        "createdAt": "..."
    }
}
```

The exact `_id` and `createdAt` values are generated automatically.

---

### Expected Behavior

A valid user is passed to:

```text id="e8w3k1"
User.create()
```

Mongoose validates the data according to the schema.

If validation succeeds:

```text id="f4v7q2"
Mongoose
   ↓
MongoDB
   ↓
Document created
```

The newly created document is returned with HTTP status `201`.

---

### Name Validation

Request:

```json id="m5q2r8"
{
    "name": "S",
    "age": 21,
    "email": "s@example.com"
}
```

The request should fail because:

```text id="p7x1n4"
name.length < 2
```

Mongoose should generate a validation error.

---

### Age Validation

Request:

```json id="y3k8w6"
{
    "name": "Shrikant",
    "age": 15,
    "email": "test@example.com"
}
```

The request should fail because:

```text id="a6q2m9"
age < 18
```

Mongoose should generate a validation error.

---

### Required Field Validation

Request:

```json id="v8n4c1"
{
    "name": "Shrikant",
    "age": 21
}
```

The request should fail because `email` is required.

---

### Duplicate Email

Create a user:

```json id="j6p3x8"
{
    "name": "Shrikant",
    "age": 21,
    "email": "shrikant@example.com"
}
```

Then attempt to create another user using the same email.

MongoDB should reject the duplicate value because the email field is configured with:

```text id="q4w7m2"
unique: true
```

This produces a MongoDB duplicate-key error.

At this stage, the error response does not need to be customized. We will learn proper centralized Mongoose error handling in a later challenge.

---

### How it works:

1. The Express application starts.
2. The application connects to MongoDB using Mongoose.
3. The `User` model is imported.
4. The `User` model is based on the `userSchema`.
5. A client sends `POST /users`.
6. `express.json()` parses the request body.
7. The route extracts `name`, `age`, and `email`.
8. `User.create()` receives the user data.
9. Mongoose applies the schema rules.
10. Mongoose validates required fields and value constraints.
11. If validation succeeds, Mongoose creates a MongoDB document.
12. MongoDB automatically generates the document `_id`.
13. `createdAt` receives the current date through `Date.now`.
14. The created document is returned by `User.create()`.
15. The route sends the created document with HTTP status `201`.
16. If validation fails, Mongoose throws a validation error.
17. If a duplicate email is inserted, MongoDB generates a duplicate-key error.

---

### Internal Working

```text id="p9w4x2"
POST /users
      ↓
express.json()
      ↓
req.body
      ↓
User.create()
      ↓
Mongoose Model
      ↓
User Schema
      ↓
Validation
      ↓
MongoDB
      ↓
Document Created
      ↓
Created Document
      ↓
201 Response
```

---

### Schema vs Model

| Concept  | Purpose                                                      |
| -------- | ------------------------------------------------------------ |
| Schema   | Defines document structure and validation rules              |
| Model    | Provides an interface for interacting with MongoDB documents |
| Document | Actual data stored in MongoDB                                |

The relationship is:

```text id="x3m8v5"
Schema
   ↓
Model
   ↓
Document
   ↓
MongoDB Collection
```

---

### Challenge 10 vs Challenge 02

| Challenge 10                 | Challenge 02               |
| ---------------------------- | -------------------------- |
| JavaScript array             | MongoDB collection         |
| `users.push()`               | `User.create()`            |
| Manual object structure      | Mongoose Schema            |
| Manual ID                    | MongoDB `_id`              |
| Data lost when server stops  | Data persists in MongoDB   |
| Manual validation middleware | Mongoose schema validation |

The important transition is:

```text id="j7c2q9"
In-Memory Array
      ↓
MongoDB + Mongoose
```

---

### Important Schema Structure

A Mongoose Schema is created using:

```js id="b6r3x1"
new mongoose.Schema(
    {
        // document fields
    },
    {
        // schema options
    }
);
```

Fields such as:

```text id="k8m2v4"
name
age
email
createdAt
```

belong inside the **first object**.

The second object is used for schema options.

---

### Important `Date.now` Detail

For a default date:

```js id="q5x9n2"
default: Date.now
```

is used instead of:

```js id="r7m3c8"
default: Date.now()
```

`Date.now` allows Mongoose to call the function when a document is created, ensuring that the creation time is generated at the correct moment.

---

### Learning Outcome

After completing this challenge, you should understand:

* What a Mongoose Schema is.
* What a Mongoose Model is.
* How a Schema and Model are related.
* How Mongoose defines document structure.
* How Mongoose performs basic schema validation.
* How `required`, `min`, and `minlength` work.
* What `unique` is intended to accomplish.
* How default values work.
* How MongoDB automatically generates `_id`.
* How `User.create()` creates a document.
* How Mongoose sits between the Express application and MongoDB.
* The difference between an in-memory JavaScript object and a persistent MongoDB document.