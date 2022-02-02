import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert({ onClose, elevation, severity, variant, children }) {
    return <MuiAlert onClose={onClose} elevation={elevation} variant={variant} severity={severity} >
        {children}
    </MuiAlert>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Snackbar = (props) => {
    const classes = useStyles();

    const {
        isOpen,
        message,
        onClose,
        severity = 'success',
        elevation = 6,
        variant = 'filled',
        autoHideDuration = 6000,
    } = props;
    console.log("message", message)

    
    return (
       <div className={classes.root}>
            <MuiSnackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={onClose}>
                <Alert onClose={onClose} severity={severity} elevation={elevation} variant={variant}>
                {message}
                </Alert>
            </MuiSnackbar>
        </div>
    );
}

export default Snackbar;