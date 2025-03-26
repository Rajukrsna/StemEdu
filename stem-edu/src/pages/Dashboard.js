import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to STEM Education Platform 🚀
      </Typography>

      {/* User Progress Overview */}
      <Card style={{ marginBottom: "20px", background: "#E0F7FA" }}>
        <CardContent>
          <Typography variant="h6">Your Progress</Typography>
          <Typography>Courses Completed: 2 / 5</Typography>
          <Typography>Current Course: Intro to Chemistry</Typography>
        </CardContent>
      </Card>

      {/* Quick Links to Sections */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📚 Labs</Typography>
              <Typography>Explore hands-on STEM experiments.</Typography>
              <Button variant="contained" color="primary" component={Link} to="/labs">
                Go to Labs
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📖 Tracks</Typography>
              <Typography>Follow structured STEM learning paths.</Typography>
              <Button variant="contained" color="primary" component={Link} to="/tracks">
                View Tracks
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📊 Progress</Typography>
              <Typography>Track your learning journey.</Typography>
              <Button variant="contained" color="primary" component={Link} to="/progress">
                View Progress
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
