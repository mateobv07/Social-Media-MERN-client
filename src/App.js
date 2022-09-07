import React, { useEffect, useState } from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import { useSelector } from "react-redux";

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const auth = useSelector((state) => state.auth);

    //Update user logged out when redux state changes
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [auth])

    return (
        <GoogleOAuthProvider clientId="729046906596-onvj4jdrraa5falt2vq7903js3u6csf3.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="xl" >
                    <Navbar />
                    <Switch>
                        <Route path='/' exact component={() => <Redirect to="/posts"/>} />
                        <Route path="/posts" exact component={Home}/>
                        <Route path="/posts/search" exact component={Home}/>
                        <Route path="/posts/:id" exact component={PostDetails}/>
                        <Route path='/auth' exact component={() => (!user?.result ? <Auth /> : <Redirect to="/posts"/>)} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;