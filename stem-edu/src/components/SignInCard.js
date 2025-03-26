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
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function SignInCard() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/authRoute/login`, { email, password });
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);  // ✅ Store User ID
        localStorage.setItem("name", response.data.name);  // ✅ Store User Name
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth variant="outlined" />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link component="button" onClick={handleClickOpen} variant="body2">Forgot your password?</Link>
          </Box>
          <TextField id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth variant="outlined" />
        </FormControl>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">Sign in</Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account? <Link href="/sign-up" variant="body2">Sign up</Link>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Sign in with Google</Button>
        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>Sign in with Facebook</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>Government Official?</Typography>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/gov-login")}>
          Login as Authority
        </Button>
      </Box>
    </Card>
  );
}
