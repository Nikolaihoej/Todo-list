# 📝 Vue.js ToDo List App

A simple and functional ToDo application built with **Vue.js** (frontend) and **MongoDB** (backend).  
The app currently supports **Create**, **Read**, and **Delete** operations, while the **Update (PATCH)** feature is currently being implemented.  

For fun, it also includes a random font generator using the **Google Fonts Open API**, which changes the title’s font just for a bit of personality and experimentation.

---

## 🚀 Features

- **Create:** Add new tasks  
- **Read:** Display all existing tasks  
- **Delete:** Remove tasks from the list  
- **Update (in progress):** Edit existing tasks  
- **Random Font Feature:** Randomly changes the title font via Google Fonts API  

---

## 🧩 Tech Stack

**Frontend:**  
- Vue.js 3  
- fetch 

**Backend:**  
- Node.js  
- Express
- mongoose 
- MongoDB (with Mongoose)  

---

## ⚙️ Installation

1. **Clone the repository**
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   
Install frontend dependencies
cd frontend
npm install
npm run dev

Install backend dependencies

cd ../backend
npm install
npm start

Connect to MongoDB
Make sure MongoDB is running locally, or connect to an external database using a .env file:

MONGO_URI=<your-mongodb-connection-string>
