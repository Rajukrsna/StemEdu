import React from "react";
import { Box, Card, Stack, Grid, Typography, LinearProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

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

const data = {
  points: 1800,
  classRank: 3,
  yearRank: 128,
  leaderboard: [
    { name: "Minou", score: 1000 },
    { name: "PERSON4", score: 950 },
    { name: "Priyanshu", score: 912 },
    { name: "PravinRaju", score: 880 },
  ],
};

const Dashboard = () => {
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
            value={(data.points / 2500) * 100}
            sx={{ height: 10, borderRadius: 5, bgcolor: "#4a4a4a" }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: -1 }}>
            {badges.map((badge, index) => (
              <CheckCircle
                key={index}
                sx={{
                  color: data.points >= badge.points ? "#d400ff" : "gray",
                  fontSize: 20,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Top 3 Cards */}
      <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">My Points</Typography>
            <Typography variant="h4" color="success.main">{data.points}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Class Rank</Typography>
            <Typography variant="h4" color="primary">{data.classRank}rd</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Global Rank</Typography>
            <Typography variant="h4" color="secondary">{data.yearRank}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Leaderboard Section */}
      <Typography variant="h5" mt={4} mb={2}>Leaderboard</Typography>
      <Card sx={{ p: 2 }}>
        {data.leaderboard.map((player, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" py={1}>
            <Typography variant="body1">{player.name}</Typography>
            <Typography variant="body1" fontWeight="bold">{player.score}</Typography>
          </Stack>
        ))}
      </Card>
    </Box>
  );
};

export default Dashboard;
