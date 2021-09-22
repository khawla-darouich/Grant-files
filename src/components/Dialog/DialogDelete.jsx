import React from 'react'
import Dialog from '../Dialog/Dialog';
import Button from '@mui/material/Button';
import './dialog.css'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {CloseRounded} from '@material-ui/icons';
export default function DialogDelete(props) {

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
              
              props.reload();
              console.log("done")
          }, err=>{console.log("undone")})
    }
    return (
        <Dialog action="supprimer"  open={open} handleClose={handleClose} handleClickOpen={handleClickOpen}> 
             <DialogTitle id="alert-dialog-title"  style={{ backgroundColor:" #2d8bb4 " ,height:54, color:"#FFF", fontSize:18}}>
          {" Supprimer "} <div className="float-end"><CloseRounded onClick={handleClose} style={{fontSize:30 , cursor:'pointer'}}></CloseRounded></div>
        </DialogTitle>
        <DialogContent className="mt-4">
          <DialogContentText id="alert-dialog-description" style={{  color:"#000"}}>
           Voulez-vous supprimer    <strong className=""> {props.nom} {props.prenom} </strong> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleDelete}>supprimer</Button>
          
          </DialogActions>
        </Dialog>
        
    )
}
