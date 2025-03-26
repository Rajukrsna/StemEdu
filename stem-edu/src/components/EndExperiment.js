import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
const userId = localStorage.getItem("userId");  
const EndExperimentButton = ({ experimentName, timeSpent, route, onEnd }) => {
  const handleEndExperiment = async () => {
    try {
      await axios.post("http://localhost:5000/api/save-progress", {
        experimentName,
        duration: timeSpent,
        route: route,
        userId
      });

      onEnd(); // Callback to update UI (like marking the lab as completed)
      alert(`Experiment "${experimentName}" ended. Duration: ${timeSpent} seconds`);
    } catch (error) {
      console.error("Error saving experiment progress:", error);
      alert("Failed to save progress. Please try again.");
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      fullWidth
      onClick={handleEndExperiment}
    >
      End Experiment
    </Button>
  );
};

export default EndExperimentButton;
