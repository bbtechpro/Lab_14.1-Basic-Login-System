Scenario
The user portal for “Innovate Inc.” needs its core authentication feature. Before you can build out more complex functionality, you need to create the fundamental endpoints for user registration and login. Your task is to build a simple Express API that can:

Accept a new user’s credentials and create a user record with a hashed password.
Accept a returning user’s credentials, validate them against the stored hash, and issue a JWT upon success.
Instructions
Task 1: Project Setup
Create a new project directory and initialize it with npm.
Install the necessary packages: express, mongoose, bcrypt, jsonwebtoken, and dotenv.
Set up your server.js file, an Express router for your user-related endpoints, and a User model based on the schema from Lesson 1.
Establish a connection to your MongoDB database. Use a .env file to store your MONGO_URI, a JWT_SECRET, and a PORT.
Task 2: Build the Registration Endpoint
Create a POST route (e.g., /api/users/register).
In this route, take the username, email, and password from the req.body.
Check if a user with the given email already exists. If so, return a 400 status with an appropriate message.
If the user does not exist, create a new User document with the provided data. The pre-save hook you wrote in Lesson 1 should automatically hash the password.
Save the new user to the database.
Respond with a 201 status and the newly created user object (excluding the password).
Task 3: Build the Login Endpoint
Create a POST route (e.g., /api/users/login).
In this route, take the email and password from the req.body.
Find a user in the database with the matching email. If no user is found, return a 400 status with a generic error message (e.g., “Incorrect email or password.”).
If a user is found, use the isCorrectPassword instance method (or bcrypt.compare) to compare the incoming password with the user’s stored hashed password.
If the passwords do not match, return a 400 status with the same generic error message.
If the passwords match, create a JWT for the user using the jsonwebtoken library. The payload should contain non-sensitive user data like their _id and username.
Respond with a JSON object containing the signed token and the user’s data.
Acceptance Criteria
Your Express server runs without errors.
The POST /api/users/register endpoint successfully creates a new user with a hashed password and returns the user’s data.
The POST /api/users/login endpoint successfully validates a user’s credentials and returns a signed JWT.
The login endpoint correctly rejects incorrect passwords or non-existent users.

Endpoint Test Results
✅ POST /api/users/register with missing password

Response: 400
Body: {"message":"Username, email and password are required."}
✅ POST /api/users/register with duplicate email

Response: 400
Body: {"message":"A user with that email already exists."}
✅ POST /api/users/register with a fresh email

Response: 201
Body includes:
username
email
_id
__v
Password is excluded from the returned JSON

Testing users GET and a lookup for a missing user ID to confirm the users route works.

users Route Test Results
GET /api/users

Response: {"success":true,"data":[]}
This confirms the route is reachable and currently returns the mock user list.
GET /api/users/123

Response: {"success":false,"message":"User not found"}
This confirms the route handles missing IDs properly.

users Route Test Completed
POST /api/users

Status: 201
Response:
success: true
data: { id, name, email }
GET /api/users

Response now includes the newly created mock user:
{"id":"1779310135411","name":"mockuser","email":"mock@example.com"}
That confirms the mock users route works for both POST and GET.