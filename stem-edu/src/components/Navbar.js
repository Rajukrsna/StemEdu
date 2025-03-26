import { AppBar, Toolbar, Typography, Button, InputBase, Box } from "@mui/material";
import { Search, Home, School, Dashboard, Star, Login, HowToReg } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg"; // Adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#0D0D2B", zIndex: 1201, fontFamily: "Roboto" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", paddingY: 1 }}>
        
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 1 }}>
          <img src={logo} alt="STEMhacks Logo" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 3,
            paddingX: 2,
            width: "30%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Search sx={{ color: "#555" }} />
          <InputBase placeholder="Search courses..." sx={{ marginLeft: 1, flex: 1, fontFamily: "Roboto" }} />
        </Box>

        {/* Navigation Buttons */}
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" component={Link} to="/" startIcon={<Home />} sx={{ fontFamily: "Roboto" }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/learn" startIcon={<School />} sx={{ fontFamily: "Roboto" }}>
              Learn
            </Button>
            <Button color="inherit" component={Link} to="/dashboard" startIcon={<Dashboard />} sx={{ fontFamily: "Roboto" }}>
              Dashboard
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              startIcon={<Star />}
              sx={{
                background: "linear-gradient(45deg, #ff9800, #ff5722)",
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/login" startIcon={<Login />} sx={{ fontFamily: "Roboto" }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register" startIcon={<HowToReg />} sx={{ fontFamily: "Roboto" }}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
