import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Leaderboard, 
  TrackChanges, 
  Science, 
  Assignment,
  Close as CloseIcon
} from "@mui/icons-material";
import { useState } from "react";

const Sidebar = ({ isMobile, open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: "Progress", icon: <Home />, path: "/progress" },
    { text: "Leaderboard", icon: <Leaderboard />, path: "/leaderboard" },
    { text: "Tracks", icon: <TrackChanges />, path: "/tracks" },
    { text: "Labs", icon: <Science />, path: "/labs" },
    { text: "Assessments", icon: <Assignment />, path: "/assesment" },
  ];

  const handleItemClick = () => {
    if (isMobileScreen && onClose) {
      onClose(); // Close mobile drawer when item is clicked
    }
  };

  const drawerContent = (
    <>
      {/* Mobile Header with Close Button */}
      {isMobileScreen && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Menu
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <List sx={{ pt: isMobileScreen ? 1 : 0 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleItemClick}
              sx={{
                borderRadius: "8px",
                margin: "6px 10px",
                padding: isMobileScreen ? "12px 10px" : "10px", // Larger touch targets on mobile
                color: location.pathname === item.path ? "#ffd700" : "#fff",
                backgroundColor: location.pathname === item.path ? "#1e2a47" : "transparent",
                minHeight: isMobileScreen ? "48px" : "auto", // Touch-friendly height
                "&:hover": {
                  backgroundColor: "#2a3b5f",
                  transition: "0.3s ease-in-out",
                },
                "&:active": {
                  backgroundColor: "#1e2a47", // Touch feedback
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? "#ffd700" : "#fff",
                minWidth: isMobileScreen ? "40px" : "56px" // Adjust icon spacing
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: isMobileScreen ? '1rem' : '0.875rem'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.2)", 
        margin: "10px 15px" 
      }} />
    </>
  );

  return (
    <Drawer
      variant={isMobileScreen ? "temporary" : "permanent"}
      anchor="left"
      open={isMobileScreen ? open : true}
      onClose={isMobileScreen ? onClose : undefined}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        width: isMobileScreen ? 280 : 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobileScreen ? 280 : 260,
          boxSizing: "border-box",
          backgroundColor: "#10182F",
          color: "#fff",
          paddingTop: isMobileScreen ? "0px" : "80px", // No top padding on mobile
          zIndex: isMobileScreen ? 1300 : 1200,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;