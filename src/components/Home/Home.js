import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from "react-redux";
import useStyles from './styles'

import { getPosts } from '../../actions/posts'
import Paginate from "../pagination";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.mainContainer}>
                    <Grid item xs={12}  md={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12}  md={4}>
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