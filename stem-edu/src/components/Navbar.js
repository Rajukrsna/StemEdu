import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  InputBase, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  Search, 
  Home, 
  School, 
  Dashboard, 
  Star, 
  Login, 
  HowToReg,
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({  isMobile, onSidebarToggle, showSidebarToggle  }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
 
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Mobile Navigation Items
  const navigationItems = isAuthenticated ? [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Learn', icon: <School />, path: '/learn' },
    { text: 'Play with Maths', icon: <Dashboard />, path: '/dashboard' },
  ] : [
    { text: 'Login', icon: <Login />, path: '/login' },
    { text: 'Register', icon: <HowToReg />, path: '/register' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: "#0D0D2B", 
          zIndex: 1201, 
          height: isMobileScreen ? '56px' : '64px'
        }}
      >
        <Toolbar 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            paddingY: isMobileScreen ? 0.5 : 1,
            minHeight: isMobileScreen ? '56px !important' : '64px !important',
            px: isMobileScreen ? 1 : 3
          }}
        >
          {showSidebarToggle && (
          <IconButton
            color="inherit"
            onClick={onSidebarToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
          
          {/* Logo */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              textDecoration: "none", 
              gap: isMobileScreen ? 0.5 : 1,
              flexShrink: 0
            }}
          >
            <img 
              src={logo} 
              alt="STEMhacks Logo" 
              style={{ 
                height: isMobileScreen ? 35 : 50 
              }} 
            />
            {!isMobileScreen && (
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              BrightMindsSTEM
              </Typography>
            )}
          </Box>

          {/* Search Bar - Hidden on mobile */}
          {!isMobileScreen && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 3,
                paddingX: 2,
                width: "30%",
                maxWidth: "400px",
                minWidth: "250px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Search sx={{ color: "#555" }} />
              <InputBase 
                placeholder="Search courses..." 
                sx={{ 
                  marginLeft: 1, 
                  flex: 1, 
                
                }} 
              />
            </Box>
          )}

          {/* Desktop Navigation */}
          {!isMobileScreen ? (
            isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/" 
                  startIcon={<Home />} 
                  sx={{ fontFamily: "Roboto", fontSize: '0.875rem' }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/learn" 
                  startIcon={<School />} 
                  sx={{ fontFamily: "Roboto", fontSize: '0.875rem' }}
                >
                  Learn
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/dashboard" 
                  startIcon={<Dashboard />} 
                  sx={{ fontFamily: "Roboto", fontSize: '0.875rem' }}
                >
                  Play with Maths
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
                    fontSize: '0.875rem'
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  startIcon={<Login />} 
                 
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register" 
                  startIcon={<HowToReg />} 
                
                >
                  Register
                </Button>
              </Box>
            )
          ) : (
            /* Mobile Menu Button */
            <IconButton
              color="inherit"
              onClick={toggleMobileMenu}
              sx={{ p: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#0D0D2B',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
           BrightMindsSTEM
          </Typography>
          <IconButton onClick={closeMobileMenu} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Search Bar */}
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 3,
              paddingX: 2,
              py: 1,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Search sx={{ color: "#555" }} />
            <InputBase 
              placeholder="Search courses..." 
              sx={{ 
                marginLeft: 1, 
                flex: 1, 
              
              }} 
            />
          </Box>
        </Box>

        <List>
          {navigationItems.map((item) => (
            <ListItem 
              key={item.text}
              component={Link}
              to={item.path}
              onClick={closeMobileMenu}
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          
          {isAuthenticated && (
            <ListItem 
              onClick={handleLogout}
              sx={{ 
                color: 'white',
                cursor: 'pointer',
                mt: 2,
                backgroundColor: 'linear-gradient(45deg, #ff9800, #ff5722)',
                borderRadius: 1,
                mx: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 152, 0, 0.8)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;