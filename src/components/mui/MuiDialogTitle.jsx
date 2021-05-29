import React from 'react'
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}))

const MuiDialogTitle = (props) => {
    const classes = useStyles();
    const {children, onClose, ...others} = props
    return (
        <DialogTitle disableTypography className={classes.root} {...others}> 
        <Typography variant="subtitle1">{children}</Typography>  
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} size="small">
            <CloseIcon style={{fontSize: "1rem"}}/>
          </IconButton>    
      </DialogTitle>
    )
}

export default MuiDialogTitle
