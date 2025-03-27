import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, LinearProgress, Grid } from "@mui/material";
import { School, Assignment, Build, RocketLaunch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react"; 
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const labels = [
  { text: "Review", icon: <School fontSize="large" /> },
  { text: "Assess", icon: <Assignment fontSize="large" /> },
  { text: "Practice", icon: <Build fontSize="large" /> },
  { text: "Apply", icon: <RocketLaunch fontSize="large" /> }
];

// Simulated last completed lab data
const userId = localStorage.getItem("userId");
console.log(userId)

const name = localStorage.getItem("name");
const Dashboard = () => {
  const Navigate = useNavigate();
 const [completedLab, SetCompletedLab] = useState([]);
 const [latestLab, setLatestLab] = useState({});
  const [totalXp, setTotalXp] = useState(0);
  useEffect(() => { 
      const  Retrievelab = async () => {
        try{
          const response = await axios.get(`${backendUrl}/api/latest/${userId}`);
          //console.log(response.data);
          SetCompletedLab(response.data);
        }
        catch (error) {
          console.error("Error fetching latest experiment:", error);
          alert("Failed to fetch latest experiment. Please try again.");
        }
  }
  Retrievelab(); 
  
 

}, []);

useEffect(() => { 
  const LatestRetrieve = async () => {  
    try{
      const response = await axios.get(`${backendUrl}/api/glatest/${userId}`);
      console.log(response.data);
      setLatestLab(response.data[0])
    }
    catch (error) {
      console.error("Error fetching latest experiment:", error);
      alert("Failed to fetch latest experiment. Please try again.");
    } 

}
 LatestRetrieve();
}, []); 

useEffect(() => {
  
  const progress = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/progress/${userId}`);  
      console.log(response.data);
       
      const userXp = response.data[0]?.xp || {}; // Ensure xp exists
      // Calculate total XP
      const total = Object.values(userXp).reduce((sum, value) => sum + value, 0);
      setTotalXp(total);
    } catch (error) {
      console.error("Error fetching progress:", error);
      alert("Failed to fetch progress. Please try again.");
    }
  }
  progress();
},[] );

   
  const handleContinue = () => {
   Navigate(latestLab.route)
  };

  return (
    <Box sx={{ padding: "0px", flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
  <Card sx={{ padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
    <CardContent>
      <Typography variant="h6">STEM Learning Made Easy</Typography>

      {latestLab ? (
        <>
          <Typography variant="body1">
            You're currently learning {latestLab.name}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            Practicing the Labs again and again makes you an expert in the concept.
          </Typography>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ height: 10, borderRadius: 5, mt: 2 }}
          />
          <Typography variant="body2">⏳ Time Spent: {latestLab.duration} sec</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#00C853", "&:hover": { backgroundColor: "#009624" } }}
            onClick={handleContinue}
          >
            Keep Making Progress
          </Button>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          You haven't started any lab yet. Begin a new lab to start learning!
        </Typography>
      )}
    </CardContent>
  </Card>

  <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
    {labels.map((item, index) => (
      <Card key={index} sx={{ padding: "10px", borderRadius: "10px", textAlign: "center" }}>
        <CardContent>
          {item.icon}
          <Typography variant="h6" sx={{ mt: 1 }}>{item.text}</Typography>
          <Typography variant="body2">Description for {item.text}</Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
</Grid>


        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
            <Card sx={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "10px" }}>
              <Typography variant="h6">🔥 Daily Streak</Typography>
              <Typography variant="h5">0 Days</Typography>
            </Card>
            <Card sx={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "10px" }}>
              <Typography variant="h6">⭐ Total XP</Typography>
              <Typography variant="h5">{totalXp}</Typography>
            </Card>
          </Box>

          <Card sx={{ padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
  <CardContent>
    <Typography variant="h6">Leaderboard</Typography>
    <Typography variant="body2">Gain 250XP to enter this week's leaderboard</Typography>

    {/* Progress Bar */}
    <LinearProgress 
      variant="determinate" 
      value={(totalXp / 250) * 100}  // Calculate percentage based on 250 XP goal
      sx={{ height: 10, borderRadius: 5, mt: 2 }} 
    />
    
    {/* XP Status */}
    <Typography variant="body2" sx={{ mt: 1 }}>
      {totalXp} / 250 XP
    </Typography>

    {/* Navigate Button (Enabled only if totalXp > 250) */}
    <Button 
      variant="contained" 
      color="white" 
      fullWidth 
      sx={{ mt: 2 }} 
      disabled={totalXp < 250} 
      onClick={() => Navigate("/leaderboard")}
    >
      {totalXp >= 250 ? "View Leaderboard" : "Earn More XP"}
    </Button>
  </CardContent>
</Card>

        </Grid>

        {/* Last Completed Lab Section */}
        <Grid item xs={12}>
  {completedLab && completedLab.length > 0 ? (
    completedLab.map((item) => (
      <Card key={item._id} sx={{ padding: "15px", borderRadius: "10px", color: "#fff", backgroundColor: "#00C853", marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h6">Last Completed Lab</Typography>
          <Typography variant="body2">{item.name}</Typography>
          <Typography variant="body2">Time Spent: {item.duration} seconds</Typography>  
          <Typography variant="caption">{name} - {new Date(item.timestamp).toLocaleString()}</Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card sx={{ padding: "15px", borderRadius: "10px", color: "#000", backgroundColor: "#f5f5f5", marginBottom: "10px" }}>
      <CardContent>
        <Typography variant="h6">Last Completed Lab</Typography>
        <Typography variant="body2">No labs completed yet. Start a new lab to track progress!</Typography>
      </CardContent>
    </Card>
  )}
</Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
