![image](https://github.com/user-attachments/assets/1c84bd1b-6425-453d-a46e-325730eb3190)**📚 BrightMindsSTEM**
----------------------

🚀 **An interactive virtual STEM learning platform with hands-on labs, flashcards, and gamification.**

# BrightMindsSTEM 🌟

![BrightMindsSTEM Website](https://raw.githubusercontent.com/rajukrsna/stemedu/main/stempic1.png)


### **🔗 Live Demo**

🔹 URL: [BrightMindsSTEM on Vercel](https://stem-edu.vercel.app)

## 📝 Features  
✅ **Virtual STEM Labs** – Hands-on simulations for Math, Physics, Chemistry, Biology, and CS using Matter.js  
✅ **Gamification System** – Earn XP, rank up (Bronze → Silver → Gold->>>>>), and compete on a leaderboard  
✅ **Flashcards & Assessments** – Reinforce learning and track progress  
✅ **Progress Tracking** – Saves student performance for educators to assess  
✅ **Intuitive UI** – Built with React.js for seamless navigation  

## 🛠 Tech Stack  

| **Component**      | **Technology**                     |
|--------------------|-----------------------------------|
| **Frontend**      | React.js, Vercel                  |
| **Backend**       | Node.js, Express.js, Render       |
| **Database**      | MongoDB (or any other used)       |
| **Simulations**   | Matter.js                         |

**🚀 Getting Started**
----------------------

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Rajukrsna/StemEdu.git
cd BrightMindsSTEM
```

### **2️⃣ Install Dependencies**

#### **Frontend:**

```bash
cd frontend  
npm install  
npm start 
```
#### **Backend:**

```bash
cd backend
npm install
npm start
```
### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the backend directory with:

```bash
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000`
```

**📌 API Endpoints**
--------------------

### **🔐 Authentication Routes**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/authRoute/register` | Register a new user |
| **POST** | `/authRoute/login` | Log in a user |
| **GET**  | `/authRoute/me` | Get logged-in user details |

### **🧪 Experiment Routes**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET**  | `/api/experiments` | Fetch all experiments from the database |
| **GET**  | `/api/glatest/:id` | Get the latest experiment a user has performed |
| **GET**  | `/api/latest/:id` | Fetch all experiments a user has performed |
| **POST** | `/api/save-progress` | Save the latest experiment performed by the user |

### **📊 Progress & Leaderboard Routes**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET**  | `/api/progress/:id` | Fetch user progress data |
| **GET**  | `/api/getUsers` | Get all users on the platform (for leaderboard) |
| **POST** | `/api/saveAssesment` | Save XP gained from assessments |

**💡 Contribution Guide**
-------------------------

We welcome contributions! To contribute:

1.  Fork the repository
    
2.  Create a new branch (git checkout -b feature-name)
    
3.  Commit your changes (git commit -m "Added new feature")
    
4.  Push to your branch (git push origin feature-name)
    
5.  Open a **Pull Request**
    

**📜 License**
--------------

This project is licensed under the **MIT License**.

**📞 Contact**
--------------

For any queries open an issue on GitHub.
