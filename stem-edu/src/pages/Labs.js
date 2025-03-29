import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from "@mui/material";
import axios from "axios";  
import { useEffect, useState } from "react";  
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Labs = () => {
  const navigate = useNavigate();
const [experiments, setExperiments] = useState([])  

useEffect(() => {
  const fetchExperiments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/experiments`);
      setExperiments(response.data);
    } catch (error) {
      console.error("Error fetching experiments:", error);
    }
  };

  fetchExperiments();
}, []);
 const handleDisabledClick = () => {
    toast.warn("This experiment is under construction!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };


return (
  <Container sx={{ padding: "40px", borderRadius: "16px" }}>
    <Typography variant="h4" textAlign="center" gutterBottom>
   ALL Virtual Labs in one Place
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {experiments.map((exp, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, textAlign: "center" }}>
            <CardMedia component="img" height="140" image={exp.image} alt={exp.title} />
            <CardContent>
              <Typography variant="h6">{exp.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {exp.description}
              </Typography>
                <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: exp.route.includes("experiment") ? "gray" : "#1976d2",
                  "&:hover": { background: exp.route.includes("experiment") ? "gray" : "#1565c0" },
                  cursor: exp.route.includes("experiment") ? "not-allowed" : "pointer",
                }}
                onClick={exp.route.includes("experiment") ? handleDisabledClick : () => navigate(exp.route)}
                >
                {exp.route.includes("experiment") ? "Under Construction" : "Start Experiment"}
              </Button>
            
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
          <ToastContainer />
    
  </Container>
);
};

export default Labs;
