import React, { useState, useEffect } from "react";
import { Dialog, Typography, Button, DialogContent, DialogActions } from "@material-ui/core";

import useStyles from './styles'

const Delete = ({ message, confirmDelete, setConfirmDelete, deleteComponent }) => {
    const styles = useStyles();


    return (
        <Dialog elevation={6} open={confirmDelete} onClose={()=>setConfirmDelete(false)}>
            <DialogContent>
                <Typography variant='h5'>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions className={styles.buttons}>
                    <Button variant="contained" color="primary" onClick={()=>setConfirmDelete(false)}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={deleteComponent}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Delete;