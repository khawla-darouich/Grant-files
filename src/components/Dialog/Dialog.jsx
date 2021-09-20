import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useHistory } from 'react-router';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertDialog(props) {
    const history=useHistory();
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
    <div>
      <div variant="outlined" onClick={handleClickOpen}>
        Supprimer 
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Supprimer un utilisateurs?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Voulez-vous supprimer {props.nom} {props.prenom}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>oui</Button>
          <Button onClick={handleClose} autoFocus>
            non
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}