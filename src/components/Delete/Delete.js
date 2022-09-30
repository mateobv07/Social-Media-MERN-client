import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";

import useStyles from './styles'

const Delete = ({ message }) => {
    const styles = useStyles();

    return (
        <Paper className={styles.container} elevation={6}>
            <Typography>
                {message}
            </Typography>
            <div>
                <Button onClick={()=>{}}>Cancel</Button>
                <Button onClick={()=>{}}>Delete</Button>
            </div>
        </Paper>
    );
}

export default Delete;