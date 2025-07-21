import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, LinearProgress, Grid, useTheme, useMediaQuery } from "@mui/material";
import { School, Assignment, Build, RocketLaunch } from "@mui/icons-material";
import { 
  Flame, 
  Star, 
  BookOpen, 
  AlarmPlusIcon, 
  Clock, 
  User, 
  Calendar,
  Target,
  Trophy,
  Zap
} from "lucide-react"; // Import Lucide icons
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
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const Navigate = useNavigate();
 const [completedLab, SetCompletedLab] = useState([]);
 const [latestLab, setLatestLab] = useState({});
  const [totalXp, setTotalXp] = useState(0);
  
  useEffect(() => { 
      const  Retrievelab = async () => {
        try{
          const response = await axios.get(`${backendUrl}/api/latest/${userId}`);
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
       
      const userXp = response.data[0]?.xp || {};
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
    <Box sx={{ 
       padding: isMobile ? "8px" : "0px",
        paddingTop: isMobile ? "80px" : "80px",
      flexGrow: 1 }}>
       <Grid container spacing={isMobile ? 1 : 2}>
      <Grid item xs={12} md={7}>
  <Card sx={{ 
   padding: isMobile ? "12px" : "20px",
  borderRadius: "10px", 
  marginBottom: isMobile ? "12px" : "20px"
}}>
    <CardContent>
    <Typography 
  variant={isMobile ? "body1" : "h6"}
>
  STEM Learning Made Easy
</Typography>

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Clock size={16} color="#666" />
            <Typography variant="body2">Time Spent: {latestLab.duration} sec</Typography>
          </Box>
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

  <Box sx={{ display: "flex",
    flexDirection: isMobile ? "column" : "row",
     gap: 2 }}>
    {labels.map((item, index) => (
      <Card key={index} sx={{ 
      padding: isMobile ? "8px" : "10px",
      borderRadius: "10px", 
      textAlign: "center",
      width: isMobile ? "100%" : "auto" }}>
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
          <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 1 : 2, marginBottom: isMobile ? "12px" : "20px" }}>
            <Card sx={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "10px" }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
                <Flame size={20} color="#FF5722" />
                <Typography variant="h6">Daily Streak</Typography>
              </Box>
              <Typography variant="h5">0 Days</Typography>
            </Card>
            <Card sx={{ flex: 1, textAlign: "center", 
               padding: isMobile ? "8px" : "10px", borderRadius: "10px" }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
                <Star size={20} color="#FFD700" />
                <Typography variant="h6">Total XP</Typography>
              </Box>
              <Typography variant={isMobile ? "h6" : "h5"}>{totalXp}</Typography>
            </Card>
          </Box>

          <Card sx={{ padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
  <CardContent>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <Trophy size={20} color="#2196F3" />
      <Typography variant="h6">Leaderboard</Typography>
    </Box>
    <Typography variant="body2">Gain 250XP to enter this week's leaderboard</Typography>

    <LinearProgress 
      variant="determinate" 
      value={(totalXp / 250) * 100}
      sx={{ height: 10, borderRadius: 5, mt: 2 }} 
    />
    
    <Typography variant="body2" sx={{ mt: 1 }}>
      {totalXp} / 250 XP
    </Typography>

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

        {/* Last Completed Lab Section */}
<Grid item xs={12}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    <BookOpen size={20} color="#2196F3" />
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 'bold',
        color: 'text.primary'
      }}
    >
      Recent Lab Activities
    </Typography>
  </Box>
  
  <Box
    sx={{
      maxHeight: isMobile ? '400px' : '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingRight: 1,
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.action.hover,
        borderRadius: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }
    }}
  >
    {completedLab && completedLab.length > 0 ? (
      completedLab.map((item, index) => (
        <Card 
          key={item._id} 
          sx={{ 
            padding: isMobile ? "12px" : "15px",
            borderRadius: "10px", 
            color: "#fff", 
            backgroundColor: "#00C853", 
            marginBottom: "10px",
            boxShadow: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)'
            }
          }}
        >
          <CardContent sx={{ 
            padding: isMobile ? "8px !important" : "12px !important",
            '&:last-child': { paddingBottom: '8px !important' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 1 : 2
            }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AlarmPlusIcon size={16} color="#fff" />
                  <Typography 
                    variant={isMobile ? "subtitle2" : "h6"}
                    sx={{ 
                      fontWeight: 'bold'
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Clock size={14} color="rgba(255,255,255,0.8)" />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      opacity: 0.9,
                      fontSize: isMobile ? '0.75rem' : '0.875rem'
                    }}
                  >
                    Duration: {Math.floor(item.duration / 60)}m {item.duration % 60}s
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <User size={12} color="rgba(255,255,255,0.8)" />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.8,
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }}
                  >
                    {name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Calendar size={12} color="rgba(255,255,255,0.8)" />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        opacity: 0.8,
                        fontSize: isMobile ? '0.7rem' : '0.75rem'
                      }}
                    >
                      {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '4px 8px',
                minWidth: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                <Target size={12} color="#fff" />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }}
                >
                  #{index + 1}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))
    ) : (
      <Card sx={{ 
        padding: isMobile ? "12px" : "15px",
        borderRadius: "10px", 
        color: "#666", 
        backgroundColor: "#f8f9fa", 
        border: "2px dashed #ddd",
        textAlign: 'center'
      }}>
        <CardContent>
          <Box sx={{ py: 2 }}>
            <AlarmPlusIcon size={48} color="#ccc" style={{ marginBottom: 16 }} />
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{ fontWeight: 'bold', mb: 1 }}
            >
              No Labs Completed Yet
            </Typography>
            <Typography 
              variant="body2"
              sx={{ color: 'text.secondary', mb: 2 }}
            >
              Start your first lab experiment to see your progress here!
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => Navigate("/labs")}
              startIcon={<Zap size={16} />}
              sx={{
                backgroundColor: "#00C853",
                "&:hover": { backgroundColor: "#009624" }
              }}
            >
              Start First Lab
            </Button>
          </Box>
        </CardContent>
      </Card>
    )}
  </Box>
  
  {completedLab && completedLab.length > 5 && (
    <Typography 
      variant="caption" 
      sx={{ 
        display: 'block',
        textAlign: 'center',
        mt: 1,
        color: 'text.secondary',
        fontStyle: 'italic'
      }}
    >
      Showing {completedLab.length} completed labs • Scroll to see more
    </Typography>
  )}
</Grid>
</Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;