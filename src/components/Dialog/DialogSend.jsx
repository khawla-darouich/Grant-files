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
import {SendRounded} from '@material-ui/icons';
import '../pages/History/history.css';
export default function DialogSend(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
      
    const handleSend= () =>{
      const config={
        headers:{
          Authorization : "Bearer "+localStorage.getItem("tokenAuth")
        }
      }
        const url="envoyerDossier/"+props.id
        axios.post(url,null,config)
        .then(res=>{
            console.log("dossier anvoyer avec succés")
            props.onSend();
        }).catch(err=>{
          console.log(err)
        })
    }
    return (
        <Dialog action={"Envoyer"}  open={open} handleClose={handleClose} handleClickOpen={handleClickOpen}> 
             <DialogTitle id="alert-dialog-title"  style={{ backgroundColor:" #2d8bb4 " ,height:54, color:"#FFF", fontSize:18}}>
            {"Envoyer le dossier"}
          <div className="float-end"><CloseRounded onClick={handleClose} style={{fontSize:30 , cursor:'pointer'}}></CloseRounded></div>
        </DialogTitle>
        <DialogContent className="mt-4">
          <DialogContentText id="alert-dialog-description" style={{  color:"#000"}}>
           Voulez-vous Envoyer le dossier 
               <strong className=""> {props.id} id </strong> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend} >Envoyer</Button>
          
          </DialogActions>
        </Dialog>
        
    )
}
