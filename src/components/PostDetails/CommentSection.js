import React, { useState, useRef} from 'react';
import { Typography, TextField, Button, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments || []);
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));
        console.log(newComments);
        setComments(newComments);
        setComment('');
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={user?.result ? 6 : 12}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    <div className={classes.commentsScroll}>
                        {comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1"> {c} </Typography>
                        ))}
                    </div>
                </Grid>
                {user?.result && (
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="subtitle1"> Write a comment </Typography>
                        <TextField 
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} color='primary' variant="contained" onClick={handleClick}>
                            Comment
                        </Button>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default CommentSection;