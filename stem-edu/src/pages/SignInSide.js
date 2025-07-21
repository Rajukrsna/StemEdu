import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import SignInCard from '../components/SignInCard';
import Content from '../components/Content';

export default function SignInSide(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            minHeight: '100vh', // Remove fixed height, keep only minHeight
            overflow: 'auto' // Allow scrolling
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, sm: 4, md: 12 },
            p: { xs: 2, sm: 3, md: 4 },
            mx: 'auto',
            maxWidth: '1200px',
            width: '100%',
            minHeight: isMobile ? 'auto' : '100vh', // Auto height on mobile for scrolling
            // Mobile-specific adjustments
            ...(isMobile && {
              paddingTop: '2rem',
              paddingBottom: '2rem',
              minHeight: 'calc(100vh - 4rem)', // Account for padding
              overflow: 'visible' // Ensure content can expand
            })
          }}
        >
          
          <SignInCard />
        </Stack>
      </Stack>
    </AppTheme>
  );
}