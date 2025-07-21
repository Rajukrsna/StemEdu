import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import logo from "../logo2.svg";

const items = [
  {
    icon: <ScienceRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Interactive STEM Labs',
    description:
      'Explore hands-on virtual labs for Math, Physics, Chemistry, and more, making learning engaging and practical.',
  },
  {
    icon: <EmojiEventsRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Gamified Learning',
    description:
      'Earn XP, climb the leaderboard, and achieve Bronze, Silver, or Gold ranks while mastering STEM concepts.',
  },
  {
    icon: <SchoolRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Personalized Learning',
    description:
      'Track progress with assessments and flashcards, ensuring better retention and understanding of key concepts.',
  },
  {
    icon: <BarChartRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Performance Insights',
    description:
      'Educators can monitor student progress and provide guidance with real-time performance tracking.',
  },
];

export default function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      sx={{ 
        flexDirection: 'column', 
        alignSelf: 'center', 
        gap: isMobile ? 2 : 4, // Responsive gap
        maxWidth: isMobile ? '100%' : 450, // Full width on mobile
        width: '100%',
        px: isMobile ? 2 : 0 // Mobile padding
      }}
    >
      {/* Responsive Logo - Show on mobile too but smaller */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: isMobile ? 'center' : 'flex-start',
        mb: isMobile ? 1 : 0
      }}>
        <img 
          src={logo} 
          alt="STEMhacks Logo" 
          style={{ 
            height: isMobile ? 35 : 50, // Smaller on mobile
            maxWidth: '100%' // Responsive width
          }} 
        />
      </Box>

      {/* Responsive Feature List */}
      {items.map((item, index) => (
        <Stack 
          key={index} 
          direction="row" 
          sx={{ 
            gap: isMobile ? 1.5 : 2, // Tighter gap on mobile
            alignItems: 'flex-start' // Better alignment
          }}
        >
          <Box sx={{ 
            mt: 0.5, // Slight top margin for icon alignment
            '& svg': {
              fontSize: isMobile ? '1.25rem' : '1.5rem' // Smaller icons on mobile
            }
          }}>
            {item.icon}
          </Box>
          <Box sx={{ flex: 1 }}> {/* Take remaining space */}
            <Typography 
              gutterBottom 
              sx={{ 
                fontWeight: 'medium',
                fontSize: isMobile ? '1rem' : '1.125rem', // Responsive title
                lineHeight: 1.3
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.875rem' : '0.875rem',
                lineHeight: 1.4
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}