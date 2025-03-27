import { Box, Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
const Back = "/assets/Back.jpg";

const name = localStorage.getItem("name");
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
    title: "Progress and Statistics",
    description: "Compete agains your fellow learners and view you progress.",
    icon: <ComputerIcon sx={{ fontSize: 50, color: "success.main" }} />,
  },
];

const Learn = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom color="black">
          <SchoolIcon sx={{ fontSize: 40, verticalAlign: "middle" }} /> Welcome {name} 
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", padding: 3, boxShadow: 3, borderRadius: 4 }}>
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
        
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" size="large">
            Start Learning
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Learn;