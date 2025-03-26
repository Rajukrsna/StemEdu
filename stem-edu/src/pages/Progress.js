import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, LinearProgress, Grid } from "@mui/material";
import { School, Assignment, Build, RocketLaunch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react"; 
    
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
  
  useEffect(() => { 
      const  Retrievelab = async () => {
        try{
          const response = await axios.get(`http://localhost:5000/api/latest/${userId}`);
          //console.log(response.data);
          SetCompletedLab(response.data);
        }
        catch (error) {
          console.error("Error fetching latest experiment:", error);
          alert("Failed to fetch latest experiment. Please try again.");
        }
  }
  Retrievelab(); 
  
 

}, [userId]);

useEffect(() => { 
  const LatestRetrieve = async () => {  
    try{
      const response = await axios.get(`http://localhost:5000/api/glatest/${userId}`);
      console.log(response.data);
      setLatestLab(response.data[0])
    }
    catch (error) {
      console.error("Error fetching latest experiment:", error);
      alert("Failed to fetch latest experiment. Please try again.");
    } 

}
 LatestRetrieve();
}, [userId]); 

   
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
              <Typography variant="body1">You're currently learning {latestLab.name}</Typography>
              <Typography variant="h6" sx={{ marginTop: "10px" }}>Practicing the Labs again and Again makes you expert in the concept</Typography>
              <LinearProgress variant="determinate" value={20} sx={{ height: 10, borderRadius: 5, mt: 2 }} />
              <Typography variant="body2">⏳ Time Spent :{latestLab.duration} sec</Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2, backgroundColor: "#00C853", "&:hover": { backgroundColor: "#009624" } }}
                onClick={handleContinue}
              >
                Keep Making Progress
              </Button>
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
              <Typography variant="h5">36,321 XP</Typography>
            </Card>
          </Box>

          <Card sx={{ padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">Leaderboard</Typography>
              <Typography variant="body2">Gain 250XP to enter this week's leaderboard</Typography>
              <LinearProgress variant="determinate" value={0} sx={{ height: 10, borderRadius: 5, mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Last Completed Lab Section */}
        <Grid item xs={12}>
        {completedLab.map((item, index) => (
  <Card key={item._id} sx={{ padding: "15px", borderRadius: "10px", color: "#fff", backgroundColor: "#00C853", marginBottom: "10px" }}>
    <CardContent>
      <Typography variant="h6">Last Completed Lab</Typography>
      <Typography variant="body2">{item.name}</Typography>
      <Typography variant="body2">Time Spent: {item.duration} seconds</Typography>  
      <Typography variant="caption">{name} - {new Date(item.timestamp).toLocaleString()}</Typography>
    </CardContent>
  </Card>
))}

        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
