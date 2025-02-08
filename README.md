# Event Management Web App  
A full-stack event management application with user authentication, event creation, and real-time attendee tracking.  

## 🚀 Live Demo  
🔗 **Frontend:** [[Deployed Frontend URL](https://event-one-rho.vercel.app/login)]  
🔗 **Backend:** [[Deployed Backend URL](https://event-n0mx.onrender.com)]  

## 📌 Features  
- ✅ User/Admin authentication (Signup, Login)  
- ✅ Role-based access (Admin can create, edit, delete events)  
- ✅ Event dashboard with filtering options  
- ✅ Real-time attendee list for each event  
- ✅ Responsive UI with Tailwind/MUI  

## 🛠️ Tech Stack  
- **Frontend:** React, Tailwind CSS, Material UI  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT & Bcrypt  
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas  

## ⚡ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone [https://github.com/yourusername/event-management-app.git](https://github.com/kartikey210900/event.git)
cd event-management-app
```

### 2️⃣ Backend Setup  
```bash
cd backend
npm install
npm start  # Runs on http://localhost:5000](https://event-n0mx.onrender.com
```

#### Environment Variables (`.env` file)  
```plaintext
MONGO_URI=mongodb+srv://endxkartikey:kartikey%408055@event.a7g7p.mongodb.net/eventManagement?retryWrites=true&w=majority&appName=event
JWT_SECRET=your_secret_key
```

### 3️⃣ Frontend Setup  
```bash
cd frontend
npm install
npm run dev  # Runs on [http://localhost:5173](https://event-one-rho.vercel.app/login)
```

## 🔑 Test Credentials  

### User Login  
```plaintext
Email: testuser@example.com  
Password: Test@123  
```

### Admin Login  
```plaintext
Email: admin@example.com  
Password: Admin@123  
```

## 📡 API Endpoints (Backend)  

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/auth/login`  | User login          |
| POST   | `/api/auth/signup` | User registration   |
| GET    | `/api/events`      | Fetch all events    |
| POST   | `/api/events`      | Create a new event  |

 
