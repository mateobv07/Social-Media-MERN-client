import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import { getPosts } from '../../actions/posts'

import useStyles from './styles'
import Paginate from "../pagination";
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Memories" fullWidth value="Test" onChange={() => {}}/>
                        </AppBar>
                        <Form currentId={currentId}  setCurrentId={setCurrentId}/>
                        <Paper elevation={6}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;