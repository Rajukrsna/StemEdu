import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Home,  Leaderboard, TrackChanges, Science, Assignment } from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation(); // Get current path to highlight active item

  const menuItems = [
    { text: "Progress", icon: <Home />, path: "/progress" },
    { text: "Leaderboard", icon: <Leaderboard />, path: "/leaderboard" },
    { text: "Tracks", icon: <TrackChanges />, path: "/tracks" },
    { text: "Labs", icon: <Science />, path: "/labs" },
    { text: "Assessments", icon: <Assignment />, path: "/assesment" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          
          boxSizing: "border-box",
          backgroundColor: "#10182F", // Dark blue theme
          color: "#fff",
          paddingTop: "100px",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: "8px",
                margin: "6px 10px",
                padding: "10px",
                color: location.pathname === item.path ? "#ffd700" : "#fff", // Gold for active item
                backgroundColor: location.pathname === item.path ? "#1e2a47" : "transparent",
                "&:hover": {
                  backgroundColor: "#2a3b5f",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? "#ffd700" : "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", margin: "10px 15px" }} />
    </Drawer>
  );
};

export default Sidebar;
