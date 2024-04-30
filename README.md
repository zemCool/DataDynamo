
# DataDynamo

Management and analysis of users' data by their query parameters.

## Installation

1. Clone repo:

```bash
git clone https://github.com/zemCool/DataDynamo.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure .env variables if needed.

4. Launch:

```bash
npm run dev
```

## Endpoints

### User registration

```
POST /registration
```

Accepts user data values.

**Requests data:**

- `email` (string, required): User email. (requires email specific values/symbols; and also needs to be unique value for each user).
- `password` (string, required): User pass (max length - 32, min length - 3).

### User login

```
POST /login
```

Accepts user data.

**Requests data:**

- `email` (string, required): email.
- `password` (string, required): pass.

### Logout

```
POST /logout
```

Logouts the active user.

### Token refresh

```
GET /refresh
```

Refreshes the old token for the new one.


### Getting users with request

```
GET /users
```

Returns all the users data.

**Example:**

```
GET /users?gender=male&age=30
```

Returns users that match with your exact query parameters.

## DTO (Data Transfer Objects)

### User registration data values.

```javascript
{
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}, 
  gender: {type: String, enum: ['male', 'female']},
  age: {type: Number},
  isMarried: {type: Boolean, default: false},
  job: {type: String},
  hobby: {type: String},
  salary: {type: String, enum: ['+1000', '+3000', '+5000']}
}
```


### User login data values.

```javascript
{
  email: s1mple@gmail.com,
  password: 123123
}
```
### User logout data values.
```
Required user refresh token
```



## Technologies
```
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- Nodemon
- Cookie parser
```
