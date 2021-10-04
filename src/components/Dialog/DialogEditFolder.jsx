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
import DossierForm from '../pages/Dossiers/DossierForm';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogEditFolder(props) {
  
  const [open, setOpen] = React.useState(false);
  const [dossier, setDossier] = React.useState({});
  const history=useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const config={
    headers:{
      Authorization : "Bearer "+localStorage.getItem("tokenAuth")
    }
  }
  const url="detailDossier/"+props.id
  React.useEffect(()=>{
    axios.get(url,config)
      .then(res=>{
        console.log("res.data")
        console.log(res.data)
        setDossier(res.data);
      })
  },[])
  const handleSubmit=()=>{
    handleClose();
    history.push("/dossiers");
}


  return (

    <Dialog action="modifier" open={open} handleClose={handleClose} handleClickOpen={handleClickOpen}>
             <DialogTitle id="alert-dialog-title" style={{ height:55,backgroundColor:" #2d8bb4 " , color:"#FFF"}}>
          {"Modifier un dossier"}
          <div className="float-end"><CloseRounded onClick={handleClose} style={{fontSize:30 , cursor:'pointer'}}></CloseRounded></div>
        </DialogTitle>
        {dossier.id?
          <DossierForm  onSubmit={handleSubmit} id={props.id} nom={dossier.agriculteur.nom} prenom={dossier.agriculteur.prenom} tel={dossier.agriculteur.tel} cin={dossier.agriculteur.cin} saba={dossier.saba} reference={dossier.reference} cda={dossier.cda.id} sousRubrique={dossier.sousRubrique.id} rubrique={dossier.sousRubrique.rubrique.id} reload={props.reload} dossier={dossier} edit={true}></DossierForm>   
          :null
        }
        
        
        </Dialog>
   
  );
}