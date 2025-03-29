import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const Back = "/assets/Back.jpg";

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

const LandingPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Learner");

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
        padding: 4,
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          <SchoolIcon sx={{ fontSize: 50, verticalAlign: "middle" }} /> Welcome, {name}!
        </Typography>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Unlock the world of STEM with hands-on experiments, assessments, and real-time progress tracking.
        </Typography>

        <Box mt={3}>
          <Button variant="contained" onClick={() => navigate("/tracks")} color="primary" size="large" sx={{ mx: 1 }}>
            Get Started
          </Button>
          <Button variant="outlined" color="secondary" size="large" sx={{ mx: 1 }}>
            Learn More
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", padding: 3, boxShadow: 4, borderRadius: 4, bgcolor: "white" }}>
                <CardContent>
                  {feature.icon}
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
