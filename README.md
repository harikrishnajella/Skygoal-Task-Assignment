🚀 Skygoal Innova Backend Assignment
Backend application built with Node.js, Express.js, MongoDB, and JWT Authentication.
Designed with secure, modular, and scalable architecture following backend best practices.

🛠️ Tech Stack
⚡ Node.js

⚙️ Express.js

🛢️ MongoDB Atlas (with Mongoose)

🔐 JWT Authentication

🔒 bcryptjs (password hashing)

🛡️ dotenv (environment variables)

🧹 lodash (input validation & sanitization)

📂 Project Structure
pgsql
Copy
Edit
├── controllers/
│    ├── authController.js
│    ├── userController.js
│    └── postController.js
│
├── middleware/
│    ├── authMiddleware.js
│    └── roleMiddleware.js
│
├── models/
│    ├── User.js
│    └── Post.js
│
├── routes/
│    ├── authRoutes.js
│    ├── userRoutes.js
│    └── postRoutes.js
│
├── utils/
│    └── generateToken.js
│
├── config/
│    └── db.js
│
├── .env
├── server.js
├── package.json
✨ Features
🔑 User Authentication (JWT Tokens)

🔒 Password Encryption using bcryptjs

🧹 Input Validation & Sanitization using lodash

🛡️ Role-based Authorization (Admin/User)

🔥 CRUD Operations for Users and Posts

🚫 Admin-only permissions to delete users

🧑 Users can manage only their own posts

🛠️ Secure .env management for sensitive data

🌍 Deployed on Render/Railway/Vercel

🚀 Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/skygoal-backend-assignment.git
cd skygoal-backend-assignment
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
bash
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
4. Start the Server (Dev Mode)
bash
Copy
Edit
npm run dev
🔐 API Overview

Route	Description	Access
POST /api/auth/register	Register a new user	Public
POST /api/auth/login	Login and get JWT	Public
GET /api/users	Get all users (Admin only)	Private
DELETE /api/users/:id	Delete a user (Admin only)	Private
GET /api/posts	Get user's posts	Private
POST /api/posts	Create a new post	Private
PUT /api/posts/:id	Update own post	Private
DELETE /api/posts/:id	Delete own post	Private
📦 Deployment
🛠️ Backend hosted on: Render / Railway / Vercel

🗂 Repository Link: GitHub Repository

📋 Important Notes
Ensure MongoDB Atlas database IP access and credentials are correctly set.

Tokens should be sent in the Authorization header as Bearer <token>.

Use Postman or Thunder Client to test APIs easily.

👨‍💻 Author
✨ [Your Name]

🐙 GitHub: your-github

🔗 LinkedIn: your-linkedin

🌟 Thank you for reviewing the project! 🌟