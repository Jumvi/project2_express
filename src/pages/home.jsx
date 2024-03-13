import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Mon blog JMVI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


//route de l'API

const userUrlApi = 'http://localhost:3000/api/users';


 function Home() {
 const [userName,setUserName]= useState();
 const [userPass,setUserPass]= useState();
 const [serverData,SetServerData] = useState([]);
 const [showLogin, setShowLogin] = useState(true);
 const navigate = useNavigate();
 
 let dataUse = '';
 
 const { register, handleSubmit, formState: { errors }, setValue } = useForm();

 const hundleSub = async(data)=>{
  setUserName(data.userName);
  setUserPass(data.password);

      await axios.get(userUrlApi).then((response)=>{
        dataUse = response.data;
      });

      SetServerData(serverData);

      console.log('loi',serverData);

      const user = serverData.find((user)=>user.username === userName && user.userpass === userPass);

      if(!user){
        alert('Echec d\'authentification, créer un compte');
        setValue('userName', '');
        setValue('password', '');
      }else{
        navigate('/acceuil');
      }
 }

  const singUp = async(data)=>{
    const name = data.name;
    const username = data.nameUser;
    const userpass = data.userPwd;
    
    await axios.post(userUrlApi,{name,username,userpass});
    setValue('name','');
    setValue('nameUser','');
    setValue('userPwd', '');
    navigate('/home');

  }

  useEffect(()=>{
    
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.dynamique-mag.com/wp-content/uploads/AdobeStock_180952477.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {showLogin ? 'Se connecter' : 'S\'inscrire'}
            </Typography>
            <form component="form" noValidate onSubmit={handleSubmit(hundleSub)} sx={{ mt: 1 }} >
              <TextField
                {...register('userName', { required: true })}
                margin="normal"
                required
                fullWidth
                id="userName"
                label="userName"
                autoComplete="off"
                autoFocus
                error={errors.email ? true : false}
                helperText={errors.email && "Email is required"}
              />
              <TextField
                {...register('password', { required: true })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password ? true : false}
                helperText={errors.password && "Password is required"}
              />
              <FormControlLabel
                control={<Checkbox {...register('remember')} color="primary" />}
                label="se rapplez de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connectez-vous
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setShowLogin(false)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>

            {/* SignUp Form */}
            <form component="form" noValidate onSubmit={handleSubmit(singUp)} sx={{ mt: 1 }} style={{ display: showLogin ? 'none' : 'block' }}>
            <TextField
                {...register('name', { required: true })}
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                autoComplete="off"
                autoFocus
                error={errors ? true : false}
                helperText={errors.name && "name is required"}
              />
              <TextField
                {...register('nameUser', { required: true })}
                margin="normal"
                required
                fullWidth
                id="nameUser"
                label="nameUser"
                autoComplete="off"
                autoFocus
                error={errors ? true : false}
                helperText={errors.nameUser && "username is required"}
              />
              <TextField
                {...register('userPwd', { required: true })}
                margin="normal"
                required
                fullWidth
                name="userPwd"
                label="password"
                type="password"
                id="userPass"
                autoComplete="off"
                error={errors.password ? true : false}
                helperText={errors.password && "Password is required"}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Grid container style={{ display: showLogin ? 'none' : 'block' }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setShowLogin(true)}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Home;