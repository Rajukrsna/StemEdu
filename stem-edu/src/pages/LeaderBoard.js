import React, { useEffect, useState } from "react";
import { 
  Box, 
  Card, 
  Stack, 
  Grid, 
  Typography, 
  LinearProgress, 
  Tooltip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { 
  Medal,
  Award, 
  Trophy,
  Crown,
  Diamond,
  Star,
  Sparkles,
  Gem,
  Zap,
  Target
} from "lucide-react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const badges = [
  { 
    name: "Bronze", 
    points: 0, 
    icon: Medal,
    color: "#CD7F32",
    bgColor: "rgba(205, 127, 50, 0.1)"
  },
  { 
    name: "Silver", 
    points: 500, 
    icon: Medal,
    color: "#C0C0C0",
    bgColor: "rgba(192, 192, 192, 0.1)"
  },
  { 
    name: "Gold", 
    points: 750, 
    icon: Medal,
    color: "#FFD700",
    bgColor: "rgba(255, 215, 0, 0.1)"
  },
  { 
    name: "Platinum", 
    points: 1000, 
    icon: Trophy,
    color: "#E5E4E2",
    bgColor: "rgba(229, 228, 226, 0.1)"
  },
  { 
    name: "Diamond", 
    points: 1250, 
    icon: Diamond,
    color: "#B9F2FF",
    bgColor: "rgba(185, 242, 255, 0.1)"
  },
  { 
    name: "Sapphire", 
    points: 1500, 
    icon: Star,
    color: "#0F52BA",
    bgColor: "rgba(15, 82, 186, 0.1)"
  },
  { 
    name: "Emerald", 
    points: 1750, 
    icon: Gem,
    color: "#50C878",
    bgColor: "rgba(80, 200, 120, 0.1)"
  },
  { 
    name: "Ruby", 
    points: 2000, 
    icon: Sparkles,
    color: "#E0115F",
    bgColor: "rgba(224, 17, 95, 0.1)"
  },
  { 
    name: "Amethyst", 
    points: 2250, 
    icon: Zap,
    color: "#9966CC",
    bgColor: "rgba(153, 102, 204, 0.1)"
  },
  { 
    name: "Opal", 
    points: 2500, 
    icon: Crown,
    color: "#FFFFFF",
    bgColor: "rgba(255, 255, 255, 0.1)"
  },
];

const userId = localStorage.getItem("userId");

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [userData, setUserData] = useState(null); 
  const [allUserData, setAllUserData] = useState([]); 
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => { 
    const getUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/getUsers`);
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
        const response = await axios.get(`${backendUrl}/api/progress/${userId}`);
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

  // Split badges for mobile display
  const firstRowBadges = badges.slice(0, 5);
  const secondRowBadges = badges.slice(5);

  // Badge component for consistent rendering
  const BadgeItem = ({ badge, index, isEarned }) => {
    const IconComponent = badge.icon;
    
    return (
      <Tooltip 
        title={`${badge.name} Badge - ${badge.points} Points ${isEarned ? '(Earned!)' : '(Locked)'}`}
        arrow
        placement="top"
      >
        <Stack 
          alignItems="center" 
          spacing={0.5} 
          sx={{ 
            minWidth: isSmallMobile ? "50px" : "60px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)"
            }
          }}
        >
          <Box
            sx={{
              p: isSmallMobile ? 0.5 : 1,
              borderRadius: "50%",
              backgroundColor: isEarned ? badge.bgColor : "rgba(128, 128, 128, 0.1)",
              border: isEarned ? `2px solid ${badge.color}` : "2px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent 
              size={isSmallMobile ? 20 : 24} 
              color={isEarned ? badge.color : "gray"}
            />
          </Box>
          <Typography 
            color={isEarned ? "white" : "gray"}
            fontWeight={isEarned ? "bold" : "normal"}
            fontSize={isSmallMobile ? 10 : 12}
            textAlign="center"
          >
            {badge.name}
          </Typography>
          <Typography 
            color="gray" 
            fontSize={isSmallMobile ? 8 : 10}
          >
            {badge.points} PTS
          </Typography>
        </Stack>
      </Tooltip>
    );
  };

  return (
    <Box 
      sx={{ 
        paddingTop: isMobile ? "100px" : "90px", // Add this line - pushes content below navbar
        p: isMobile ? 1 : 3,
        maxWidth: "100%",
        overflow: "hidden",
              minHeight: "100vh" // Add this to ensure full height

      }}
      className={isMobile ? "mobile-full-width" : ""}
    >
      {/* Badges Section - Mobile Responsive */}
      <Box sx={{ 
        p: isMobile ? 2 : 3, 
        bgcolor: "#0a0f1f", 
        borderRadius: 2, 
        textAlign: "center",
        overflow: "hidden"
      }}>
        {isMobile ? (
          // Mobile: Stack badges in two rows
          <Stack spacing={2}>
            <Stack 
              direction="row" 
              spacing={isSmallMobile ? 1 : 2} 
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
            >
              {firstRowBadges.map((badge, index) => (
                <BadgeItem 
                  key={index} 
                  badge={badge} 
                  index={index}
                  isEarned={totalXp >= badge.points}
                />
              ))}
            </Stack>
            
            <Stack 
              direction="row" 
              spacing={isSmallMobile ? 1 : 2} 
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
            >
              {secondRowBadges.map((badge, index) => (
                <BadgeItem 
                  key={index + 5} 
                  badge={badge} 
                  index={index + 5}
                  isEarned={totalXp >= badge.points}
                />
              ))}
            </Stack>
          </Stack>
        ) : (
          // Desktop: Single row
          <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
            {badges.map((badge, index) => (
              <BadgeItem 
                key={index} 
                badge={badge} 
                index={index}
                isEarned={totalXp >= badge.points}
              />
            ))}
          </Stack>
        )}

        {/* Progress Bar - Mobile Responsive */}
        <Box sx={{ 
          position: "relative", 
          mt: isMobile ? 3 : 2, 
          width: "100%",
          px: isMobile ? 1 : 0
        }}>
          <LinearProgress
            variant="determinate"
            value={(totalXp / 2500) * 100}
            sx={{ 
              height: isMobile ? 8 : 10, 
              borderRadius: 5, 
              bgcolor: "#4a4a4a",
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, #ff9800, #ff5722)',
              }
            }}
          />
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            sx={{ 
              mt: isMobile ? -0.5 : -1,
              px: isMobile ? 0.5 : 0
            }}
          >
            {badges.map((badge, index) => (
              <Tooltip 
                key={index} 
                title={`${badge.name}: ${badge.points} XP ${totalXp >= badge.points ? '✓' : ''}`} 
                arrow
                placement="top"
              >
                <CheckCircle
                  sx={{
                    color: totalXp >= badge.points ? badge.color : "gray",
                    fontSize: isMobile ? 16 : 20,
                    cursor: "pointer",
                    filter: totalXp >= badge.points ? "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))" : "none",
                    transition: "all 0.3s ease"
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>

        {/* Current XP Display */}
        <Typography 
          color="white" 
          variant={isMobile ? "body2" : "body1"}
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Current XP: {totalXp} / 2500
        </Typography>
      </Box>

      {/* Stats Cards - Mobile Responsive Grid */}
      <Grid container spacing={isMobile ? 1 : 2} justifyContent="center" mt={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            p: isMobile ? 1.5 : 2, 
            textAlign: "center",
            minHeight: isMobile ? "80px" : "auto",
            background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))",
            border: "1px solid rgba(76, 175, 80, 0.3)"
          }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>My Points</Typography>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="success.main"
              sx={{ fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: "bold" }}
            >
              {totalXp}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            p: isMobile ? 1.5 : 2, 
            textAlign: "center",
            minHeight: isMobile ? "80px" : "auto",
            background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(63, 81, 181, 0.1))",
            border: "1px solid rgba(33, 150, 243, 0.3)"
          }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>Class Rank</Typography>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="primary"
              sx={{ fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: "bold" }}
            >
              {userData?.classRank || "N/A"}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            p: isMobile ? 1.5 : 2, 
            textAlign: "center",
            minHeight: isMobile ? "80px" : "auto",
            background: "linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(233, 30, 99, 0.1))",
            border: "1px solid rgba(156, 39, 176, 0.3)"
          }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>Global Rank</Typography>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="secondary"
              sx={{ fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: "bold" }}
            >
              {userData?.yearRank || "N/A"}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Leaderboard Section - Mobile Responsive */}
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        mt={isMobile ? 2 : 4} 
        mb={isMobile ? 1 : 2}
        px={isMobile ? 1 : 0}
        sx={{ fontWeight: "bold" }}
      >
        🏆 Leaderboard
      </Typography>
      <Card sx={{ 
        p: isMobile ? 1 : 2,
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => {
            const isTopThree = index < 3;
            const rankIcons = ['🥇', '🥈', '🥉'];
            
            return (
              <Stack 
                key={index} 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
                py={isMobile ? 0.5 : 1}
                px={isMobile ? 0.5 : 1}
                sx={{
                  borderBottom: index < leaderboard.length - 1 ? "1px solid #f0f0f0" : "none",
                  minHeight: isMobile ? "44px" : "auto",
                  backgroundColor: isTopThree ? "rgba(255, 215, 0, 0.05)" : "transparent",
                  borderRadius: isTopThree ? 1 : 0,
                  transition: "background-color 0.2s ease"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {isTopThree && (
                    <Typography fontSize={isMobile ? "1.2rem" : "1.5rem"}>
                      {rankIcons[index]}
                    </Typography>
                  )}
                  <Typography 
                    variant="body1"
                    sx={{
                      fontSize: isMobile ? "0.875rem" : "1rem",
                      fontWeight: isTopThree ? "bold" : "normal",
                      color: isTopThree ? theme.palette.primary.main : "inherit"
                    }}
                  >
                    {index + 1}. {player.name}
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    color: isTopThree ? theme.palette.success.main : "inherit"
                  }}
                >
                  {player.xp} XP
                </Typography>
              </Stack>
            );
          })
        ) : (
          <Typography 
            variant="body1" 
            textAlign="center"
            sx={{ py: isMobile ? 2 : 4 }}
          >
            No leaderboard data available
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default Dashboard;