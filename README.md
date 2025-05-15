# MERN Role-Based Authentication System

A full-featured role-based authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (Admin/User)
- 📱 Responsive design with Tailwind CSS
- 🖼️ Image upload with Cloudinary
- 🔄 State management with Redux Toolkit
- 🛣️ Protected routes
- 📦 Code splitting and lazy loading
- 🎨 Modern UI with Heroicons
- 🔒 Secure password hashing with bcrypt

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Heroicons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Bcrypt
- Cloudinary

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Feature-based modules
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
│
└── server/                # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    └── utils/           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/logout - Logout user
- GET /api/auth/me - Get current user

### User Management
- GET /api/users - Get all users (Admin only)
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user (Admin only)

## License

MIT 