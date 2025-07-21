import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    maxWidth: 'calc(100vw - 48px)',
    width: '100%'
  },
  [theme.breakpoints.up('md')]: {
    width: '450px',
    maxWidth: '450px'
  },
}));

export default function SignInCard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/authRoute/login`, { email, password });
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("name", response.data.name);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove the outer Box wrapper and return Card directly
  return (
    <Card variant="outlined">
      <Typography 
        component="h1" 
        variant="h4" 
        sx={{ 
          fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 8vw, 2.15rem)',
          textAlign: 'center',
          mb: isMobile ? 2 : 3,
          fontWeight: 600
        }}
      >
        Sign in
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: isMobile ? 2 : 2.5
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email" sx={{ 
            fontSize: isMobile ? '0.875rem' : '1rem',
            mb: 0.5,
            fontWeight: 500
          }}>
            Email
          </FormLabel>
          <TextField 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            fullWidth 
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: isMobile ? '0.875rem' : '1rem'
              }
            }}
          />
        </FormControl>
        
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <FormLabel htmlFor="password" sx={{ 
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: 500
            }}>
              Password
            </FormLabel>
            <Link 
              component="button" 
              type="button"
              onClick={handleClickOpen} 
              variant="body2"
              sx={{ 
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                textDecoration: 'none',
                color: 'primary.main',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot password?
            </Link>
          </Box>
          <TextField 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            fullWidth 
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: isMobile ? '0.875rem' : '1rem'
              }
            }}
          />
        </FormControl>
        
        <FormControlLabel 
          control={<Checkbox value="remember" color="primary" size={isMobile ? "small" : "medium"} />} 
          label={
            <Typography sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
              Remember me
            </Typography>
          }
          sx={{ mt: 0.5 }}
        />
        
        <ForgotPassword open={open} handleClose={handleClose} />
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained"
          size={isMobile ? "medium" : "large"}
          sx={{ 
            py: isMobile ? 1.5 : 2,
            fontSize: isMobile ? '0.875rem' : '1rem',
            fontWeight: 'bold',
            mt: 1,
            borderRadius: 2
          }}
        >
          Sign in
        </Button>
        
        <Typography sx={{ 
          textAlign: 'center', 
          fontSize: isMobile ? '0.875rem' : '1rem',
          mt: 1.5
        }}>
          Don&apos;t have an account?{' '}
          <Link 
            href="/register"
            variant="body2" 
            sx={{ 
              fontSize: isMobile ? '0.875rem' : '1rem',
              textDecoration: 'none',
              fontWeight: 'bold',
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
      
      <Divider sx={{ my: isMobile ? 2 : 2.5 }}>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary', 
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          px: 2
        }}>
          or
        </Typography>
      </Divider>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 2.5 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<GoogleIcon />}
          size="large"
          sx={{ 
            py: isMobile ? 1.25 : 1.5,
            fontSize: isMobile ? '0.875rem' : '1rem',
            textTransform: 'none',
            borderRadius: 2
          }}
        >
          Sign in with Google
        </Button>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<FacebookIcon />}
          size="large"
          sx={{ 
            py: isMobile ? 1.25 : 1.5,
            fontSize: isMobile ? '0.875rem' : '1rem',
            textTransform: 'none',
            borderRadius: 2
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
      
      <Divider sx={{ my: isMobile ? 2 : 2.5 }} />
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 1.5,
            fontSize: isMobile ? '0.875rem' : '1rem',
            color: 'text.secondary'
          }}
        >
          Teacher?
        </Typography>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => navigate("/gov-login")}
          size={isMobile ? "medium" : "large"}
          sx={{ 
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            textTransform: 'none',
            px: isMobile ? 2 : 3,
            py: 1,
            borderRadius: 2
          }}
        >
          Login as Teacher
        </Button>
      </Box>
    </Card>
  );
}