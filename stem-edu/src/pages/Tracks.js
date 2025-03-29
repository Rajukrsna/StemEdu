import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Chip, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const tracks = [
  { name: "maths", title: "Mathematics Mastery", description: "Learn advanced mathematical concepts with problem-solving techniques.", progress: 0, status:"nil" },
  { name: "physics", title: "Physics Fundamentals", description: "Explore Newton's laws, quantum physics, and thermodynamics.", progress: 0,status:"nil" },
  { name: "chemistry", title: "Chemistry Essentials", description: "Dive into chemical reactions, periodic table, and lab techniques.", progress: 0 ,status:"nil"},
  { name: "biology", title: "Biology Insights", description: "Understand genetics, human anatomy, and ecology.", progress: 0,status:"nil" },
  { name: "computer-science", title: "CS & Programming", description: "Master algorithms, data structures, and software engineering.", progress: 0,status:"nil" },
  { name: "engineering", title: "Engineering Concepts", description: "Cover mechanics, electronics, and civil engineering basics.", progress: 0 ,status:"nil"},
];
const userId= localStorage.getItem("userId"); 
const categories = ["All", "Maths", "Physics", "Chemistry", "Biology", "Computer Science", "Engineering"];
const Tracks = () => {
  const [trackProgress, setTrackProgress] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    const  RetrieveProgress = async () => {
      try{
        const response = await axios.get(`${backendUrl}/api/progress/${userId}`);
        console.log(response.data);
        setTrackProgress(response.data[0]);
      }
      catch (error) {
        console.error("Error fetching latest experiment:", error);
        alert("Failed to fetch latest experiment. Please try again.");
      }
    }
    RetrieveProgress();
  },[]);

  const filteredTracks = selectedCategory === "All"
    ? tracks
    : tracks.filter((track) => track.name === selectedCategory.toLowerCase());

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      {/* Header Section */}
      <Box sx={{ backgroundColor: "#0b2545", color: "white", p: 3, borderRadius: 2 }}>
        <Typography variant="h4">STEM Tracks</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Our STEM tracks are designed to help you master various subjects with Hands on Innovative Virtual Labs.
        </Typography>
      </Box>

      {/* Category Filters */}
      <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Tracks List */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        {filteredTracks.length} Career Tracks
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredTracks.map((track, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="caption" color="textSecondary">
                  LABS
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {track.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                  {track.description}
                </Typography>

                {/* Tags */}
                <Box sx={{ mt: 2 }}>
                  <Chip label="Fundamentals" color="secondary" size="small" sx={{ mr: 1 }} />
                  <Chip label="📜 2500 Xps" color="warning" size="small" />
                </Box>

                {/* Progress Bar */}
                <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
  {/* Calculate progress percentage dynamically */}
  <LinearProgress
    variant="determinate"
    value={(trackProgress?.xp?.[track.name] / 2500) * 100} 
    sx={{ flexGrow: 1, height: 8, borderRadius: 2 }} 
  />
  <Typography variant="body2">
    {Math.min(((trackProgress?.xp?.[track.name] || 0) / 200) * 100, 100).toFixed(1)}%
  </Typography>
</Box>

                {/* Action Button */}
                <Button
                  variant="contained"
                  color={track.status === "Inprogress" ? "success" : "primary"} 
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/track/${track.name}`)}
                >
                  {track.status === "Inprogress"? "Continue": "View Details"}
            


                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tracks;
