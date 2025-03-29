import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import logo from "../logo2.svg"; // Adjust path if needed

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
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
   <img src={logo} alt="STEMhacks Logo" style={{ height: 50 }} />      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
