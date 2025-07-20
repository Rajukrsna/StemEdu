import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Sidebar from "./components/Sidebar";
import Lab from "./pages/Labs";
import Progress from "./pages/Progress";
import AppTheme from "./theme/AppTheme"; 
import { CssBaseline, useTheme, useMediaQuery} from "@mui/material"; 
import ColorModeSelect from "./theme/ColorModeSelect"; 
import { Stack } from "@mui/material";
import Tracks from "./pages/Tracks";
import TracksDetails from "./pages/TracksDetails";  
import Assesment from "./pages/Assesments";  
import Leaderboard from "./pages/LeaderBoard";
import SignInSide from "./pages/SignInSide";  
import SignUp from "./pages/SignUp";  
import ProtectedRoute from "./components/ProtectedRoute"; 
import Experiment from "./experiments/Experiment1";
import CollisionExperiment from "./experiments/collision";
import Pendulum from "./experiments/Pendulum";   
import Inclined from "./experiments/Inclined";     
import Torque from "./experiments/Torque";
import Projectile from "./experiments/Projectile";  
import WrekingBall from "./experiments/WrekingBall";
import Newton from "./experiments/Newton";
import Place from "./experiments/PlaceValue";
import Calci from "./components/Calci";
import "./styles/mobile-responsive.css";
import "./styles/custom-scrollbar.css";  // Add this line
import { useState } from "react";
const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};
const MainLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect mobile devices
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showSidebar = ["/place","/track/chemistry","/track/biology","/track/maths","/learn","/newton","/measurement", "/experiment","/labs","/torque","/wrekingball","/projectile","/track/physics","/pendulum","/inclined","/leaderboard", "/assesment", "/tracks", "/progress", "/collision", "/experiment"].some((path) =>
    location.pathname.startsWith(path)
  );
const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  // ...existing code...

return (
  <div style={{ 
    display: "flex", 
    height: "100vh", 
    flexDirection: isMobile ? "column" : "row",
    overflow: "hidden"  // Change from "visible" to "hidden"
  }}>
    {/* Sidebar - Conditionally Rendered */}
    {showSidebar && (
      <Sidebar 
        isMobile={isMobile} 
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />
    )}
    {/* Main Content */}
    <div style={{ 
      flexGrow: 1,
      transition: "margin 0.3s",
      overflow: "hidden",  // Change from "visible" to "hidden"
      width: isMobile ? "100%" : "auto",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar 
        isMobile={isMobile} 
        onSidebarToggle={handleSidebarToggle}
        showSidebarToggle={showSidebar && isMobile}
      />

      <AppTheme>
        <CssBaseline enableColorScheme />
        {isMobile && (
          <ColorModeSelect sx={{ 
            position: "fixed",
            top: "70px",
            right: "12px",
            zIndex: 999,
            display: sidebarOpen ? "none" : "block"
          }} />
        )}

        <div style={{
          flex: 1,
          overflow: "auto",  // Add scrolling to this container
          height: "calc(100vh - 64px)"  // Subtract navbar height
        }}>
          {/* If it's Home Page, render directly without Stack */}
          {location.pathname === "/" || location.pathname === "/login" || location.pathname === "/learn"? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={ <Learn />} />
              <Route path="/login" element={<SignInSide />} />
            </Routes>
          ) : (
            /* Wrap other pages inside Stack */
            <Stack
              direction="column"
              component="main"
              sx={{
                minHeight: "100%",  // Change from "100vh"
                justifyContent: "flex-start",
                alignItems: "center",
                padding: isMobile ? 1 : 2,
                paddingTop: "20px",  // Add some top padding
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Content Wrapper with Controlled Width */}
              <Stack
                direction="column"
                sx={{
                  width: "100%",
                  maxWidth: "none",
                  flexGrow: 1,
                  px: isMobile ? 1 : 2,
                }}
              >
                <div style={{ 
                  padding: isMobile ? "10px" : "20px", 
                  width: "100%",
                }}>
                  <Routes element={<ProtectedRoute />}>
                    <Route path="/register" element={<SignUp />} /> 
                    <Route path="/labs" element={<Lab />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/tracks" element={<Tracks />} />
                    <Route path="/track/:trackName" element={<TracksDetails />} />
                    <Route path="/assesment" element={<Assesment />} />
                    <Route path="/leaderboard" element={<Leaderboard />} /> 
                    <Route path="/experiment" element={<Experiment />} /> 
                    <Route path="/collision" element={<CollisionExperiment />} />
                    <Route path="/pendulum" element={<Pendulum />} />
                    <Route path="/inclined" element={<Inclined />} /> 
                    <Route path="/torque" element={ <Torque />} />  
                    <Route path="/projectile" element={<Projectile />} />  
                    <Route path="/wrekingball" element={<WrekingBall />} />
                    <Route path="/newton" element={<Newton />} />
                    <Route path="/place" element={<Place />} />
                    <Route path="/dashboard" element={<Calci />} />
                  </Routes>
                </div>
              </Stack>
            </Stack>
          )}
        </div>
      </AppTheme>
    </div>
  </div>
);

// ...existing code...
 }


export default App;
