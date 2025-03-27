const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
dotenv.config();
connectDB();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
    origin:frontendUrl, // ✅ Allow the frontend to connect to this server
    credentials: true, // ✅ Allow cookies & authentication headers
    // Adjust if frontend is on a different port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

  
app.use("/authRoute", require("./routes/authRoute"));
app.use("/api", require("./routes/experiment")); 
   
app.listen(5000, () => console.log("Server running on port 5000"));
