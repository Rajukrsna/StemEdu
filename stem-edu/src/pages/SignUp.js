import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'; // Add this import
import AppTheme from '../theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  borderRadius: theme.spacing(2), // Add rounded corners
  [theme.breakpoints.down('md')]: { // Mobile responsive
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    gap: theme.spacing(1.5),
    maxWidth: 'calc(100vw - 48px)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

// ✅ FIXED: Make container scrollable
const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', // Changed from fixed height to minHeight
  padding: theme.spacing(2),
  overflow: 'auto', // Enable scrolling
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: { // Mobile specific
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
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
}));

export default function SignUp(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Add mobile detection
  
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [sellerData, setSellerData] = React.useState({ name: "", email: "", password: "" });

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/authRoute/register`, {
        name: sellerData.name,
        email: sellerData.email,
        password: sellerData.password,
      });

      if (response.data) {
        console.log("User registered successfully.");
        navigate("/login");
      }
    } catch (error) {
      console.log("Server error. Please try again later.");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <SignUpContainer 
        direction="column" 
        justifyContent={isMobile ? "flex-start" : "space-between"} // ✅ Better mobile alignment
      >
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ 
              width: '100%', 
              fontSize: isMobile ? 'clamp(1.5rem, 8vw, 2rem)' : 'clamp(2rem, 10vw, 2.15rem)', // Responsive
              textAlign: 'center',
              mb: isMobile ? 1 : 0
            }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: isMobile ? 1.5 : 2 // Responsive gap
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                Full name
              </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                onChange={handleChange}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
                size={isMobile ? "small" : "medium"} // Responsive size
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                Email
              </FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                onChange={handleChange}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
                size={isMobile ? "small" : "medium"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                Password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                size={isMobile ? "small" : "medium"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" size={isMobile ? "small" : "medium"} />}
              label={
                <Typography sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                  I want to receive updates via email.
                </Typography>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              size={isMobile ? "medium" : "large"}
              sx={{
                py: isMobile ? 1.2 : 1.5,
                fontSize: isMobile ? '0.875rem' : '1rem',
                fontWeight: 'bold'
              }}
            >
              Sign up
            </Button>
          </Box>
          <Divider sx={{ my: isMobile ? 1.5 : 2 }}>
            <Typography sx={{ 
              color: 'text.secondary',
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}>
              or
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1.5 : 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
              size={isMobile ? "medium" : "large"}
              sx={{
                py: isMobile ? 1 : 1.2,
                fontSize: isMobile ? '0.875rem' : '1rem',
                textTransform: 'none'
              }}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
              size={isMobile ? "medium" : "large"}
              sx={{
                py: isMobile ? 1 : 1.2,
                fontSize: isMobile ? '0.875rem' : '1rem',
                textTransform: 'none'
              }}
            >
              Sign up with Facebook
            </Button>

            <Typography sx={{
              textAlign: 'center',
              mt: isMobile ? 1.5 : 2,
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}>
              Already have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/login")}
                variant="body2"
                sx={{
                  alignSelf: 'center',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: 'primary.main',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}