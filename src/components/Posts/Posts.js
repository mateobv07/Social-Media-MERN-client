import React, {useState} from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletePost } from '../../actions/posts'

import Post from "./Post/Post";
import useStyles from './styles'
import Delete from "../Delete/Delete";


const Posts = ({ currentId, setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const deletePostDispatch = () => {
        if (currentId){
            dispatch(deletePost(currentId));
            setConfirmDelete(false);
        }
    }

    if(!posts.length && !isLoading) return 'No posts'
    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container  spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} xl={3}> 
                        <Post post={post} setCurrentId={setCurrentId} confirmDeletePost={(id)=>{setCurrentId(id);setConfirmDelete(true)}}/>
                    </Grid>
                ))}
            <Delete message={'Are you sure you want to delete this post?'} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteComponent={deletePostDispatch}/>
            </Grid>
        )
    );
}

export default Posts;