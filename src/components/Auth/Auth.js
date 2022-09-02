import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input';
import useStyles from './styles';
import jwt_decode from 'jwt-decode';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const googleSucces = async (res) => {
        
        const result = jwt_decode(res?.credential);
        console.log(result)
        const credential = res?.credential;

        try {
            dispatch({ type: 'AUTH', payload: {result, credential} });
            
            history.push('/');
        } catch (error) {
            console.log(error);
        }
        console.log(res)
    };

    const googleFailure = (error) => {
        console.log("Google Sign In was unsuccessful. Try Again Later");
        console.log(error);
    };

    return (
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="confirmpassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>}
                    </Grid>
                    <Grid container direction="column"  justifyContent="space-evenly" alignItems="center" spacing={2}>
                        <Grid item>
                            <Button fullWidth type="Submit"  variant="contained" color="primary" className={classes.submit}> {isSignUp ? 'Sign Up' : 'Sign In'} </Button>
                        </Grid> 
                        <Grid item >
                            <GoogleLogin
                            onSuccess={googleSucces}
                            onError={googleFailure}
                            
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)} >{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"} </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;