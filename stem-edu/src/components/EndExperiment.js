import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userId = localStorage.getItem("userId"); 
const EndExperimentButton = ({ experimentName, timeSpent, route,track, onEnd }) => {
  const handleEndExperiment = async () => {
    try {
      
      let xp = timeSpent > 30 ? 45 : 0; // Define xp properly
        
      await axios.post("http://localhost:5000/api/save-progress", {
        experimentName,
        duration: timeSpent,
        route: route,
        userId,
        track,
        xp
      });

      onEnd(); // Callback to update UI (like marking the lab as completed)
toast.success(`✅ Lab marked as completed! You spent ${timeSpent} seconds.`, {
      position: "top-right",
      autoClose: 3000,
    });    } catch (error) {
      console.error("Error saving experiment progress:", error);
      alert("Failed to save progress. Please try again.");
    }

   
  };

  return (
    <>      <ToastContainer />
    <Button
      variant="contained"
      color="error"
      fullWidth
      onClick={handleEndExperiment}
    >
      End Experiment
    </Button>
    </>
  );
};

export default EndExperimentButton;
