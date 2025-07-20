import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Card, CardContent, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import React from "react";

const Back = "/assets/Back.jpg";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [name, setName] = useState("Learner");

  const features = [
    {
      title: "Explore Labs",
      description: "Hands-on STEM experiments to enhance your learning.",
      icon: <ScienceIcon sx={{ fontSize: 50, color: "primary.main" }} />,
    },
    {
      title: "Complete Assessments",
      description: "Test your knowledge with interactive quizzes.",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
    },
    {
      title: "Compete on Leaderboard",
      description: "Challenge peers and rank on the leaderboard.",
      icon: <LeaderboardIcon sx={{ fontSize: 50, color: "error.main" }} />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your learning journey and achievements.",
      icon: <TrackChangesIcon sx={{ fontSize: 50, color: "success.main" }} />,
    },
  ];

  // Fetch name from localStorage when component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: isMobile ? 2 : 4,
        color: "white",
        textAlign: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isMobile ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
          zIndex: 1
        },
        "& > *": {
          position: "relative",
          zIndex: 2
        }
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "h4" : "h2"} 
          fontWeight="bold" 
          gutterBottom
          sx={{ 
            fontSize: isMobile ? '2rem' : '3.75rem',
            lineHeight: 1.2
          }}
        >
          <SchoolIcon sx={{ 
            fontSize: isMobile ? 30 : 50, 
            verticalAlign: "middle" 
          }} /> 
          Welcome, {name}!
        </Typography>
        
        <Typography 
          variant={isMobile ? "body1" : "h5"} 
          fontWeight="medium" 
          gutterBottom
          sx={{ 
            fontSize: isMobile ? '1rem' : '1.5rem',
            px: isMobile ? 1 : 0,
            lineHeight: 1.4
          }}
        >
          Unlock the world of STEM with hands-on experiments, assessments, and real-time progress tracking.
        </Typography>

        <Box mt={3}>
          <Button 
            variant="contained" 
            onClick={() => navigate("/tracks")} 
            color="primary" 
            size={isMobile ? "medium" : "large"} 
            sx={{ 
              mx: isMobile ? 0.5 : 1,
              mb: isMobile ? 1 : 0,
              fontSize: isMobile ? '0.875rem' : '1rem',
              px: isMobile ? 2 : 3
            }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            size={isMobile ? "medium" : "large"} 
            sx={{ 
              mx: isMobile ? 0.5 : 1,
              fontSize: isMobile ? '0.875rem' : '1rem',
              px: isMobile ? 2 : 3
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: isMobile ? 4 : 6 }}>
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: "center", 
                padding: isMobile ? 2 : 3, 
                boxShadow: 4, 
                borderRadius: 4, 
                bgcolor: "white",
                height: '100%'
              }}>
                <CardContent>
                  {React.cloneElement(feature.icon, {
                    sx: { 
                      fontSize: isMobile ? 40 : 50, 
                      color: feature.icon.props.sx.color 
                    }
                  })}
                  <Typography 
                    variant="h6" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;