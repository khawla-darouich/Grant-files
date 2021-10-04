import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import Slide from '@mui/material/Slide';
import './dialog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertDialog(props) {
  
  


const styles = theme => ({
  dialogPaper: {
    opacity: 0.5,
    border: '#FF0000 1px solid',
  },
  button: {
    margin: '30px'
  }
});

  return (
    <div>
      <div variant="outlined" onClick={props.handleClickOpen}>
        {props.action} 
      </div>
      <Dialog borderRadius="50%"
        PaperProps={{ 
          style: {
            overflowX:'hidden',
            borderRadius:'10px'
          
          },
         } }
        open={props.open}
        TransitionComponent={Transition}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.children}
        
      </Dialog>
    </div>
  );
}