# 🔒 Subscription Management Backend System

A secure and scalable backend-only Subscription Management System built with JavaScript, Node.js, and ExpressJS. The system supports user authentication, role-based access control, subscription CRUD operations, rate limiting, and bot protection.

## 🚀 Features

-  User registration and login
-  Password encryption using **bcrypt**
-  Secure API with JWT (JSON Web Tokens)
-  Role-based access: User vs Admin
-  Subscription creation and management
-  Admin-only subscription cancellation
-  Admin can view all subscriptions
-  Users can view only their own subscriptions and do Profile updates like: username, email, password
-  **Rate limiting** and **bot protection** using Arcjet

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- bcrypt
- jsonwebtoken (JWT)
- Arcjet (Rate limiting & Bot protection)
- Postman / HTTPie (for API testing)

## 🔐 Authentication & Authorization

| Role | Access |
|------|--------|
| **User** | Register, Login, Create subscription, View own subscription, Update profile |
| **Admin** | All user privileges + View all subscriptions, Cancel any subscription |

## 📦 Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/diptarkasarkar/Simple-NodeJS-Auth.git
```

2. Install dependencies:
```bash
npm install
npm install express bcryptjs jsonwebtoken mongoose dotenv
npm install @arcjet/node @arcjet/inspect
npm install nodemon --save-dev
```

3. Create a `.env.development` file in the root directory and add your environment variables:
```env
PORT=5500
NODE_ENV='development'
DB_URI= MongoDB atlas cloud connection link
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN= '1d'
ARCJET_KEY= Your Arcjet API key
```

4. Start the application:
```bash
npm run dev
```

The server will start running on `http://localhost:5500`

---

## 🔐 API Endpoints

### 🔐 Auth Routes

* `POST /api/v1/auth/signup` – Register new user
* `POST /api/v1/auth/signin` – Login and receive JWT token



### 👤 User Routes

* `GET /api/v1/users/` – (Admin Only) Get All Users
* `GET /api/v1/users/:id` – Get User detail
* `PUT /api/v1/users/update/:id` – Update username/email/password
* `DELETE /api/v1/users/delete/:id` – (Admin Only) Delete a User


### 📦 Subscription Routes

* `POST /api/v1/subscriptions/` – Create new subscription
* `GET /api/v1/subscriptions/user/:id` – View own subscriptions
* `GET /api/v1/subscriptions/SubDetails/:id` – (Admin only) View any subscription
* `GET /api/v1/subscriptions/all` – (Admin only) View all subscriptions
* `PATCH /api/v1/subscriptions/cancel/:id` – (Admin only) Cancel a subscription

---
## ⚠️ Important Notes

* **No frontend/UI is included.**
* Use API clients like [Postman](https://www.postman.com/) or [HTTPie](https://httpie.io/) to test the endpoints.
* Make sure to create admin users manually.

---




   


