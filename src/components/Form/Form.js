import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = (event) => {
        event.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, history));
        }else{
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        }
        clear();
    }

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(null);
        setPostData({  title: '', message: '', tags: '', selectedFile: '' });
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating' }</Typography>
                
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="title" 
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="message" 
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="tags (seperated by commas)" 
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.replace(/\s/g, "").split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;