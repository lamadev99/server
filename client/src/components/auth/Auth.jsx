import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
// import { signin, signup } from '../../actions/auth';
// import { AUTH } from '../../constants/actionTypes';
import Input from './input';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = ({setOpen}) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
//   const dispatch = useDispatch();
//   const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (isSignup) {
    //   dispatch(signup(form, history));
    // } else {
    //   dispatch(signin(form, history));
    // }
  };

//   const googleSuccess = async (res) => {
//     const result = res?.profileObj;
//     const token = res?.tokenId;

//     try {
//       dispatch({ type: AUTH, data: { result, token } });

//       history.push('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <main className='bg-[#111111a8] fixed top-0 left-0 w-full h-full flex items-center justify-center'>
    <Container component="main" maxWidth="xs">
      <Paper className="p-4 relative" elevation={3}>
        <HighlightOffIcon onClick={()=>setOpen(false)} className='absolute right-4 top-2 cursor-pointer text-red-500'/>
        <Typography component="h1" variant="h5" className='text-center mb-8'>{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className="mt-4" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop: '20px'}}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          {/* <GoogleLogin
            clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </main>
  );
};

export default SignUp;
