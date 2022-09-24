import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
            
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]) 

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Link to="/" className={classes.brandContainer}>
                    <img src={memoriesText} alt="memories" height="45px" />
                    <img className={classes.image} src={memoriesLogo} alt="icon" height="45px"/>
                </Link>
            </div>        
            <Toolbar className={classes.toolbar}>
                {user?.result.name ? (
                    <>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.given_name ? user.result.given_name : user.result.name }</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>   
            </AppBar>
    )
}

export default Navbar