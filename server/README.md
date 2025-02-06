
# Investment Portfolio Backend

This is the backend for the **Investment Portfolio Tracker** application. It handles user authentication (signup, login, forgot password), portfolio management, and secure email notifications for password reset.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Signup](#signup)
  - [Login](#login)
  - [Forgot Password](#forgot-password)
  - [Reset Password](#reset-password)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)

## Installation

Move to the server folder and open terminal then run `npm install` command and after that run `npm run start`

### Prerequisites

- Node.js (>= v14.0)
- MongoDB instance (local or remote)
- Gmail account (if using Nodemailer for email functionality)

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/investment-portfolio-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd B42_WEB_066_The-Pixel-Wizards/server
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. Run the server:
   ```bash
   npm run start
   ```

   The server will run on `http://localhost:5000`.

## Usage

This backend allows users to register, log in, and reset their passwords. It also provides secure email notifications using **Nodemailer**.

### API Endpoints

1. **POST /signup**
   - **Description**: Register a new user.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **POST /login**
   - **Description**: Log in an existing user and receive a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Login successful",
       "token": "jwt-token-here"
     }
     ```

3. **POST /forgot-password**
   - **Description**: Request a password reset link. A link will be sent to the user's email.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Password reset email sent!"
     }
     ```

4. **POST /reset-password/:token**
   - **Description**: Reset the user's password using a valid reset token.
   - **Request Body**:
     ```json
     {
       "newPassword": "newpassword123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Password reset successfully!"
     }
     ```

## Environment Variables

You will need the following environment variables to run the app:

- **MONGO_URI**: Your MongoDB connection string.
- **JWT_SECRET**: A secret key to sign JWT tokens.
- **EMAIL_USER**: Your Gmail email address.
- **EMAIL_PASS**: Your Gmail App Password (create this in your Gmail account with 2FA enabled).

## Error Handling

The backend uses a global error handler for all API requests. If an error occurs (e.g., invalid input, authentication failure, etc.), the server will respond with a structured error message.

### Example of an Error Response:
```json
{
  "message": "Invalid credentials",
  "stack": null
}
```

If you're running the app in a development environment, you will also get a stack trace.
