import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, TextField, Button, Container, Box,FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [profile, setProfile] = React.useState({
    name: '',
    city: '',
    age: '',
    password: '',
    confirmPassword: '',
    gender: '',
    email: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    // TODO: confirm password
    if (profile.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    if (profile.password !== profile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // TODO: Send data to server
    const JsonData = JSON.stringify(profile);
    console.log(JsonData);
    fetch('/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JsonData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed to sign up');
          throw new Error('Failed to sign up');
        }
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="name"
          label="Name"
          value={profile.name}
          onChange={handleChange}
        />
        <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        name="email"
        label="Email"
        value={profile.email}
        onChange={handleChange}
        inputProps={{
          pattern: "[a-z0-9._%+-]+@xxx\\.edu"
        }}
        // 可选：添加一个辅助文本以提示用户正确的格式
        helperText="Please enter a valid educational email (e.g., user@xxx.edu)"
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="password"
          label="Password"
          type='password'
          value={profile.password}
          onChange={handleChange}
        />
        <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        name="confirmPassword"
        label="Confirm Password"
        type="password" 
        value={profile.confirmPassword}
        onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Age</InputLabel>
          <Select
            name="age"
            value={profile.age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={0}>&lt;18</MenuItem>
            <MenuItem value={1}>18 ~ 25</MenuItem>
            <MenuItem value={2}>30 ~ 40</MenuItem>
            <MenuItem value={3}>40 ~ 50</MenuItem>
            <MenuItem value={4}>50+</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="city"
          label="City"
          value={profile.city}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={profile.gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non-binary">Non-binary</MenuItem>
            <MenuItem value="not to say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
