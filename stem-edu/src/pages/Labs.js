import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from "@mui/material";
import axios from "axios";  
import { useEffect, useState } from "react";  

const Labs = () => {
  const navigate = useNavigate();
const [experiments, setExperiments] = useState([])  

useEffect(() => {
  const fetchExperiments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/experiments");
      setExperiments(response.data);
    } catch (error) {
      console.error("Error fetching experiments:", error);
    }
  };

  fetchExperiments();
}, []);


return (
  <Container sx={{ padding: "40px", borderRadius: "16px" }}>
    <Typography variant="h4" textAlign="center" gutterBottom>
      Virtual Labs
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
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(exp.route)}>
                Start Lab
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);
};

export default Labs;
