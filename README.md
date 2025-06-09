# 📝 TestSocial

A simple social media backend built with **Node.js**, **Express.js**, and **MongoDB**, allowing users to register, log in, create and manage posts, and view their profile.

---

## 🚀 Features

- 👤 **User Authentication**
  - Register with name, username, email, password, and age
  - Login with email and password
  - JWT-based session management with HTTP-only cookies

- 📝 **Post Management**
  - Create new posts
  - View posts on user profile
  - Edit existing posts
  

- 🔐 **Protected Routes**
  - Middleware restricts access to authenticated users only

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Templating:** EJS
- **Styling:** Tailwind CSS
- **Authentication:** JWT, Cookie-based sessions

---

## 📂 Folder Structure
```
TestSocial/
├── app.js # Main server setup
├── models/ # Mongoose schemas (User, Post)
├── routes/ # Express route handlers
├── views/ # EJS templates
├── middlewares/ # Auth middleware
├── public/ # Static assets
├── .env # Environment variables
├── .gitignore
└── README.md
```
