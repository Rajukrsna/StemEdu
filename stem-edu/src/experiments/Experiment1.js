import React from 'react';
import Spline from '@splinetool/react-spline';
import { Box, useTheme, useMediaQuery } from '@mui/material';

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        paddingTop: isMobile ? "100px" : "90px", // Navbar clearance
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 90px)',
          position: 'relative',
          // Responsive scaling for mobile
          transform: isMobile ? 'scale(0.8)' : 'scale(1)',
          transformOrigin: 'center center'
        }}
      >
        <Spline
          scene="https://prod.spline.design/5BvRthUTl76pQGxa/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            // Ensure proper mobile touch handling
            touchAction: isMobile ? 'pan-x pan-y' : 'auto'
          }}
          onLoad={(spline) => {
            // Log spline object for debugging (remove in production)
            console.log('Spline loaded successfully:', spline);
          }}
          onError={(error) => {
            console.error('Spline loading error:', error);
          }}
        />
      </Box>

      {/* Loading indicator overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          color: 'text.secondary',
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}
      >
        Loading 3D Scene...
      </Box>

      {/* Mobile touch hint */}
      {isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            fontSize: '0.75rem',
            zIndex: 10,
            '@keyframes fadeInOut': {
              '0%, 100%': { opacity: 0.7 },
              '50%': { opacity: 1 }
            },
            animation: 'fadeInOut 3s ease-in-out infinite'
          }}
        >
          📱 Touch and drag to interact
        </Box>
      )}
    </Box>
  );
}