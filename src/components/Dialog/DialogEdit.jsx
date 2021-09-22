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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogEdit(props) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete= () =>{
      let url="users/"+props.id
        axios.delete(url).then(res=>{
            console.log("done")
            handleClose();
            props.reload();
            console.log("done")
        }, err=>{console.log("undone")})
  }

  return (

    <Dialog action="modifier" open={open} handleClose={handleClose} handleClickOpen={handleClickOpen}>
             <DialogTitle id="alert-dialog-title" style={{ height:55,backgroundColor:" #2d8bb4 " , color:"#FFF"}}>
          {"Modifier un utilisateurs"}
          <div className="float-end"><CloseRounded onClick={handleClose} style={{fontSize:30 , cursor:'pointer'}}></CloseRounded></div>
        </DialogTitle>
        <UserForm onUpdate={props.onUpdate} onClose={handleClose} nom={props.nom} prenom={props.prenom} id={props.id} antenne={props.antenne} role={props.role} email={props.email}></UserForm>

        
        </Dialog>
   
  );
}