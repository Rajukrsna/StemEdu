import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, CardMedia, CircularProgress } from "@mui/material";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const TrackDetails = () => {
  const { trackName } = useParams();
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/experiments`);
        setExperiments(response.data);
      } catch (error) {
        console.error("Error fetching experiments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  const filteredExperiments = experiments.filter((exp) => exp.track === trackName);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 3, textAlign: "center" }}>
      <Typography variant="h3" fontWeight={600} gutterBottom>
        {trackName.toUpperCase()} Experiments
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : filteredExperiments.length === 0 ? (
        <Typography sx={{ mt: 3, fontSize: "1.2rem", color: "gray" }}>
          No experiments available for this track.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          {filteredExperiments.map((exp, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  boxShadow: 5,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={exp.image}
                  alt={exp.title}
                  sx={{ borderRadius: "12px" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {exp.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                    {exp.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "#1976d2",
                      "&:hover": { background: "#1565c0" },
                    }}
                    href={exp.route}
                  >
                    Start Experiment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrackDetails;
