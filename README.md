# 🛍 Linkon - MERN Stack eCommerce Website

*Linkon* is a full-featured eCommerce web application built using the *MERN stack* (MongoDB, Express.js, React.js, Node.js), powered by *Vite ⚡* for a fast frontend experience, and uses *Cloudinary ☁* to manage and store product images. It provides users with a smooth online shopping experience and includes features like user authentication, cart management, and order placement. It also includes an admin panel for product and user management.

---

## 📁 Project Structure

```plaintext
linkon/
├── frontend/                     # React app for user interface
├── backend/                      # Express API server
```

---

## ✨ Features

### 👤 User Features
- 🛍 Browse and view product listings
- 🔍 View detailed product pages
- 🛒 Add products to cart
- ✅ Place orders securely
- 🔐 User registration and login

### 🛠 Admin Features
- 🔑 Secure admin login
- 📊 Dashboard for managing content
- ➕ Add, ✏ edit, ❌ delete products
- ☁ Upload product images (stored via Cloudinary)
- 📬 View and manage customer orders


## 🧰 Tech Stack

- *Frontend:* Vite React, Tailwind
- *Backend:* Node.js, Express.js
- *Database:* MongoDB with Mongoose
- *Authentication:* JWT (JSON Web Tokens)
- *API:* RESTful API with Express
- *State Management:* Redux

---

## ⚙ Getting Started

### ✅ Prerequisites

- Node.js installed
- MongoDB (local or MongoDB Atlas)
- Git

### 📦 Installation Steps

# Step 1: Clone the repo
```bash
git clone https://github.com/Shettysahil16/linkon.git
cd linkon
```
# Step 2: create a .env file in /backend and add the following:
```bash
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
FRONTEND_URL= your_frontend_port
```
# Step 3: Start backend server
```bash
cd backend
nodemon
```
# Step 4: Install frontend dependencies
```bash
cd frontend
npm install moment react-icons react-redux react-router-dom react-toastify
```

 # Step 5: Create a `.env` file in `/frontend` and add the following:

```env
# Create a free Cloudinary account at https://cloudinary.com/
# You'll find your Cloud Name in the Cloudinary Dashboard → Account Details
VITE_APP_CLOUD_NAME=your_cloudinary_id
```


# Step 6: Start frontend server
```bash
npm run dev
```

### ✅ All Set!

Your development environment is ready, and your project should now be up and running 🚀.
