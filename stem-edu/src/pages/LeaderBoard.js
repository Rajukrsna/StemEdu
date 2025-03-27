import React, { useEffect, useState } from "react";
import { Box, Card, Stack, Grid, Typography, LinearProgress, Tooltip } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

const badges = [
  { name: "Bronze", points: 0, icon: "🥉" },
  { name: "Silver", points: 500, icon: "🥈" },
  { name: "Gold", points: 750, icon: "🥇" },
  { name: "Platinum", points: 1000, icon: "🏆" },
  { name: "Diamond", points: 1250, icon: "🎖️" },
  { name: "Sapphire", points: 1500, icon: "⭐" },
  { name: "Emerald", points: 1750, icon: "🎗️" },
  { name: "Ruby", points: 2000, icon: "🔴" },
  { name: "Amethyst", points: 2250, icon: "🟣" },
  { name: "Opal", points: 2500, icon: "🏆" },
];

const userId = localStorage.getItem("userId");

const Dashboard = () => {
  const [userData, setUserData] = useState(null); 
  const [allUserData, setAllUserData] = useState([]); 
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => { 
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getUsers`);
        setAllUserData(response.data);
      } catch (error) { 
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const retrieveProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        const user = response.data[0];
        setUserData(user);
        const userXp = user?.xp || {};
        const total = Object.values(userXp).reduce((sum, value) => sum + value, 0);
        setTotalXp(total);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    };
    retrieveProgress();
  }, [userId]);

  const leaderboard = allUserData
    .map(user => ({
      name: user.name,
      xp: Object.values(user.xp || {}).reduce((sum, value) => sum + value, 0)
    }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <Box sx={{ fontFamily: "Roboto", p: 3 }}>
      {/* Badges Section */}
      <Box sx={{ p: 3, bgcolor: "#0a0f1f", borderRadius: 2, textAlign: "center" }}>
        <Stack direction="row" spacing={4} justifyContent="center">
          {badges.map((badge, index) => (
            <Stack key={index} alignItems="center" spacing={0.5}>
              <Typography fontSize={30}>{badge.icon}</Typography>
              <Typography color="white" fontWeight="bold">
                {badge.name}
              </Typography>
              <Typography color="gray" fontSize={14}>
                {badge.points} PTS
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ position: "relative", mt: 2, width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={(totalXp / 2500) * 100}
            sx={{ height: 10, borderRadius: 5, bgcolor: "#4a4a4a" }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: -1 }}>
            {badges.map((badge, index) => (
              <Tooltip 
                key={index} 
                title={`XP Needed: ${badge.points}`} 
                arrow
                placement="top"
              >
                <CheckCircle
                  sx={{
                    color: totalXp >= badge.points ? "#d400ff" : "gray",
                    fontSize: 20,
                    cursor: "pointer"
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Top 3 Cards */}
      <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">My Points</Typography>
            <Typography variant="h4" color="success.main">{totalXp}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Class Rank</Typography>
            <Typography variant="h4" color="primary">{userData?.classRank || "N/A"}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Global Rank</Typography>
            <Typography variant="h4" color="secondary">{userData?.yearRank || "N/A"}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Leaderboard Section */}
      <Typography variant="h5" mt={4} mb={2}>Leaderboard</Typography>
      <Card sx={{ p: 2 }}>
        {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => (
            <Stack key={index} direction="row" justifyContent="space-between" py={1}>
              <Typography variant="body1">
                {index + 1}. {player.name}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {player.xp}
              </Typography>
            </Stack>
          ))
        ) : (
          <Typography variant="body1" textAlign="center">
            No leaderboard data available
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default Dashboard;
