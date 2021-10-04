import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '../Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useHistory } from 'react-router';
import Slide from '@mui/material/Slide';
import UserForm from '../pages/Utilisateurs/UserForm';
import {CloseRounded} from '@material-ui/icons';
import DossierDetail from '../pages/Dossiers/DossierDetail';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogView(props) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (

    <Dialog action="consulter" open={open} handleClose={handleClose} handleClickOpen={handleClickOpen}>
             <DialogTitle id="alert-dialog-title" style={{ height:55,backgroundColor:" #2d8bb4 " , color:"#FFF"}}>
          {"Detail du dossier"}
          <div className="float-end"><CloseRounded onClick={handleClose} style={{fontSize:30 , cursor:'pointer'}}></CloseRounded></div>
        </DialogTitle>
        <DossierDetail id={props.id}></DossierDetail>

        
        </Dialog>
   
  );
}