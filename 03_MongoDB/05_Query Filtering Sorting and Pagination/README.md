# 05 Query Filtering, Sorting & Pagination

### Objective

Learn how to use Express query parameters with Mongoose to filter, sort, and paginate MongoDB documents instead of retrieving and processing all users in JavaScript.

---

### Concepts Covered

- Express Query Parameters
- `req.query`
- MongoDB Query Objects
- Mongoose `.find()`
- MongoDB comparison operators
- `$gte`
- `$lte`
- `.sort()`
- `.skip()`
- `.limit()`
- `countDocuments()`
- Filtering
- Sorting
- Pagination
- Combining multiple query parameters
- `async/await`
- `try/catch`
- HTTP status codes
- Error handling

---

### Requirements

- Reuse the MongoDB connection from the previous challenge
- Reuse the `User` model from Challenge 04
- Reuse the existing error handler
- Create or update `userRouter.js`
- Mount the router at `/users`
- Implement:
  - `GET /users` → Get users
- Support filtering by:
  - `role`
  - `minAge`
  - `maxAge`
  - `isActive`
- Support sorting by:
  - `name`
  - `-name`
  - `age`
  - `-age`
- Support pagination using:
  - `page`
  - `limit`
- Allow multiple filters to be used together
- Use MongoDB/Mongoose for filtering instead of JavaScript `.filter()`
- Use Mongoose `.sort()`
- Use Mongoose `.skip()`
- Use Mongoose `.limit()`
- Use `countDocuments()` for the filtered user count
- Return `400` for invalid query parameters
- Return `200` for successful requests
- Return `500` for unexpected server/database errors
- Do not create controllers or services yet

---

### Packages / Tools Used

| Package | Purpose |
|---------|---------|
| express | Create the HTTP server and read query parameters |
| mongoose | Query, filter, sort, and paginate MongoDB documents |
| dotenv | Load environment variables |

(Type: External packages)

---

### Implementation Steps (Hints)

1. Reuse the MongoDB connection from the previous challenge
2. Reuse the `User` model from Challenge 04
3. Reuse the existing `userRouter.js`
4. Create or update `GET /users`
5. Read query parameters using `req.query`
6. Extract `role`, `minAge`, `maxAge`, `isActive`, `sort`, `page`, and `limit`
7. Create an empty MongoDB query object
8. If `role` is provided, add it to the query
9. Allow only `user` and `admin` for the `role` filter
10. Convert `minAge` from a query string to a number
11. Use `$gte` for `minAge`
12. Convert `maxAge` from a query string to a number
13. Use `$lte` for `maxAge`
14. Combine `$gte` and `$lte` when both age filters are provided
15. Convert `isActive` from a query string to a Boolean
16. Allow only `true` or `false` for `isActive`
17. Set default `page` to `1`
18. Set default `limit` to `10`
19. Convert `page` and `limit` to numbers
20. Validate that `page` is a positive integer
21. Validate that `limit` is a positive integer
22. Calculate the number of documents to skip
23. Use `skip = (page - 1) * limit`
24. Build a sort object
25. Use ascending order for `name` or `age`
26. Use descending order for `-name` or `-age`
27. Reject unsupported sort values
28. Use `User.countDocuments(query)` to count matching users
29. Use `User.find(query)` to retrieve matching users
30. Apply `.sort()`
31. Apply `.skip()`
32. Apply `.limit()`
33. Calculate total pages using `Math.ceil(totalUsers / limit)`
34. Return the users and pagination information
35. Use `try/catch` around database operations
36. Pass errors to the error handler using `next(error)`
37. Do not retrieve all users and then use JavaScript `.filter()`
38. Do not retrieve all users and then use JavaScript `.sort()`
39. Do not implement search, aggregation, field selection, or advanced queries yet

---

### API Endpoints / Usage

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | Returns users with optional filtering, sorting, and pagination |

Supported query parameters:

| Parameter | Example | Description |
|-----------|---------|-------------|
| `role` | `role=admin` | Filter by role |
| `minAge` | `minAge=20` | Minimum age |
| `maxAge` | `maxAge=30` | Maximum age |
| `isActive` | `isActive=true` | Filter by active status |
| `sort` | `sort=age` | Sort ascending |
| `sort` | `sort=-age` | Sort descending |
| `page` | `page=1` | Page number |
| `limit` | `limit=5` | Number of users per page |

---

## How to Run

Install dependencies:

```bash
npm install
```

Make sure your `.env` contains:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash
node server.js
```

The terminal should show:

```text
MongoDB connected successfully
Server is running on port 3000
```

---

### Get All Users

Send:

```text
GET http://localhost:3000/users
```

Expected response:

```json
{
    "success": true,
    "message": "Users fetched successfully",
    "count": 10,
    "page": 1,
    "limit": 10,
    "totalUsers": 10,
    "totalPages": 1,
    "data": []
}
```

Status:

```text
200 OK
```

---

### Filter by Role

Send:

```text
GET http://localhost:3000/users?role=admin
```

Only users with `role = admin` should be returned.

Status:

```text
200 OK
```

Invalid role:

```text
GET http://localhost:3000/users?role=manager
```

Expected:

```json
{
    "success": false,
    "message": "Role must be either user or admin"
}
```

Status:

```text
400 Bad Request
```

---

### Filter by Age

Minimum age:

```text
GET http://localhost:3000/users?minAge=20
```

This represents:

```text
age >= 20
```

Maximum age:

```text
GET http://localhost:3000/users?maxAge=30
```

This represents:

```text
age <= 30
```

Both together:

```text
GET http://localhost:3000/users?minAge=20&maxAge=30
```

This represents:

```text
20 <= age <= 30
```

Invalid value:

```text
GET http://localhost:3000/users?minAge=abc
```

Expected:

```json
{
    "success": false,
    "message": "minAge must be a valid number"
}
```

Status:

```text
400 Bad Request
```

---

### Filter by Active Status

Send:

```text
GET http://localhost:3000/users?isActive=true
```

Only active users should be returned.

Send:

```text
GET http://localhost:3000/users?isActive=false
```

Only inactive users should be returned.

Invalid value:

```text
GET http://localhost:3000/users?isActive=yes
```

Expected:

```json
{
    "success": false,
    "message": "isActive must be true or false"
}
```

Status:

```text
400 Bad Request
```

---

### Sorting

Sort by age ascending:

```text
GET http://localhost:3000/users?sort=age
```

Sort by age descending:

```text
GET http://localhost:3000/users?sort=-age
```

Sort by name ascending:

```text
GET http://localhost:3000/users?sort=name
```

Sort by name descending:

```text
GET http://localhost:3000/users?sort=-name
```

Invalid sort:

```text
GET http://localhost:3000/users?sort=email
```

Expected:

```json
{
    "success": false,
    "message": "sort must be name, -name, age, or -age"
}
```

Status:

```text
400 Bad Request
```

---

### Pagination

Send:

```text
GET http://localhost:3000/users?page=1&limit=5
```

Expected response:

```json
{
    "success": true,
    "message": "Users fetched successfully",
    "count": 5,
    "page": 1,
    "limit": 5,
    "totalUsers": 23,
    "totalPages": 5,
    "data": []
}
```

Status:

```text
200 OK
```

Second page:

```text
GET http://localhost:3000/users?page=2&limit=5
```

The API should return the second group of users.

The skip calculation is:

```text
skip = (page - 1) × limit
```

---

### Combined Query

Send:

```text
GET http://localhost:3000/users?role=user&minAge=20&maxAge=30&isActive=true&sort=-age&page=1&limit=5
```

The request should:

```text
Filter by role
      ↓
Filter by minimum age
      ↓
Filter by maximum age
      ↓
Filter by active status
      ↓
Sort by age descending
      ↓
Apply pagination
      ↓
Return result
```

Expected response:

```json
{
    "success": true,
    "message": "Users fetched successfully",
    "count": 5,
    "page": 1,
    "limit": 5,
    "totalUsers": 12,
    "totalPages": 3,
    "data": []
}
```

Status:

```text
200 OK
```

---

### Expected Behavior

#### `GET /users`

Uses:

```text
User.find(query)
```

to retrieve users from MongoDB.

Filtering should happen in MongoDB rather than by retrieving all users and using JavaScript `.filter()`.

Sorting should happen through Mongoose `.sort()`.

Pagination should happen through Mongoose `.skip()` and `.limit()`.

---

### How it works:

1. The Express application starts.
2. The application connects to MongoDB using Mongoose.
3. The `User` model is loaded.
4. The user router is mounted at `/users`.
5. A client sends `GET /users`.
6. Express reads the query parameters through `req.query`.
7. The route creates a MongoDB query object.
8. The route adds role filtering when `role` is provided.
9. The route adds age conditions when `minAge` or `maxAge` is provided.
10. The route converts `isActive` from a query string to a Boolean.
11. The route validates `page` and `limit`.
12. The route calculates the number of documents to skip.
13. The route creates a sorting option.
14. `countDocuments()` counts the users matching the filters.
15. `User.find()` retrieves matching users from MongoDB.
16. `.sort()` applies the requested ordering.
17. `.skip()` skips documents for pagination.
18. `.limit()` restricts the number of returned documents.
19. The route calculates the total number of pages.
20. The API returns the result with HTTP status `200`.
21. Invalid query parameters return `400`.
22. Unexpected database errors are passed to the centralized error handler.

---

### Internal Working

#### FILTERING

```text
GET /users?role=admin
      ↓
req.query
      ↓
Build Query Object
      ↓
{ role: "admin" }
      ↓
User.find(query)
      ↓
MongoDB
      ↓
Filtered Documents
      ↓
200 OK
```

#### AGE FILTERING

```text
GET /users?minAge=20&maxAge=30
      ↓
req.query
      ↓
Convert values to Number
      ↓
$gte + $lte
      ↓
User.find(query)
      ↓
MongoDB
      ↓
Users with age 20–30
      ↓
200 OK
```

#### SORTING

```text
GET /users?sort=-age
      ↓
req.query.sort
      ↓
Create sort object
      ↓
{ age: -1 }
      ↓
.sort()
      ↓
MongoDB
      ↓
Sorted Documents
      ↓
200 OK
```

#### PAGINATION

```text
GET /users?page=2&limit=5
      ↓
page = 2
limit = 5
      ↓
skip = (2 - 1) × 5
      ↓
skip = 5
      ↓
.skip(5)
.limit(5)
      ↓
MongoDB
      ↓
Second Page
      ↓
200 OK
```

---

### Query Operations Mapping

| Feature | Query Parameter | Mongoose Operation | Purpose |
|---------|-----------------|--------------------|---------|
| Role Filter | `role` | `.find(query)` | Filters by role |
| Minimum Age | `minAge` | `$gte` | Filters minimum age |
| Maximum Age | `maxAge` | `$lte` | Filters maximum age |
| Active Status | `isActive` | `.find(query)` | Filters active/inactive users |
| Sorting | `sort` | `.sort()` | Sorts documents |
| Pagination | `page` | `.skip()` | Skips documents |
| Pagination | `limit` | `.limit()` | Limits documents |
| Total Count | — | `countDocuments()` | Counts matching documents |

---

### Important MongoDB Operators

#### `$gte`

Means **greater than or equal to**.

```js
{
    age: {
        $gte: 20
    }
}
```

Equivalent to:

```text
age >= 20
```

---

#### `$lte`

Means **less than or equal to**.

```js
{
    age: {
        $lte: 30
    }
}
```

Equivalent to:

```text
age <= 30
```

---

### Important Pagination Formula

```text
skip = (page - 1) × limit
```

For example:

```text
page = 3
limit = 5
```

then:

```text
skip = (3 - 1) × 5
skip = 10
```

---

### Error Handling

Query parameters arrive as strings through `req.query`.

For example:

```text
?page=2
```

produces:

```js
{
    page: "2"
}
```

Therefore numeric values must be converted before validation and use.

Similarly:

```text
?isActive=true
```

produces:

```js
{
    isActive: "true"
}
```

which must be converted to the Boolean:

```js
true
```

Invalid query parameters should return:

```text
400 Bad Request
```

Unexpected database errors should be passed to:

```js
next(error)
```

and handled by the centralized error handler.

---

### Learning Outcome

After completing this challenge, you should understand:

- How Express reads query parameters using `req.query`.
- How query parameters arrive as strings.
- How to convert query parameters into numbers and Booleans.
- How to build dynamic MongoDB query objects.
- How `$gte` and `$lte` work.
- How to filter MongoDB documents using Mongoose.
- How to sort MongoDB results using `.sort()`.
- How ascending and descending sorting works.
- How `.skip()` works.
- How `.limit()` works.
- How pagination works.
- How to calculate the number of documents to skip.
- How to calculate total pages.
- How `countDocuments()` counts matching documents.
- How to combine multiple filters.
- Why filtering and sorting in MongoDB is preferable to retrieving every document and processing it in JavaScript.
- How query parameters can make a single API endpoint flexible and reusable.