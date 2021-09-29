import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  './dailog.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  MuiDialogTitle: {
    root: {
      backgroundColor: "#000"
    }
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogsBlank(props) {
  const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        props.openFun();
      };

      const handleClose = () => {
        setOpen(false);
        props.closeFun();
      };
    
      const okFun = ()=>{
          props.saveFun(props.saveFun)
      }

    useEffect(() => {
      console.log(">>>>>>>>>>>>>>>>>>>")
    }, [props.isOpen])
    
    
    
    return (
      <Dialog fullWidth maxWidth="xs" onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen}>
             <DialogTitle className="modal-header" id="customized-dialog-title" >
                  <Typography align="center"> {props.title}</Typography>
              </DialogTitle>
          
          <DialogContent dividers>
              {props.children}
          </DialogContent>
          <DialogActions>
            <Button size="small" color="primary" onClick={okFun} >
              {props.oktitle}
            </Button>

            <Button onClick={handleClose} color="primary">
              {props.cancelTitle}
            </Button>
        </DialogActions>
      </Dialog>
  );
}
