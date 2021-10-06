
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {ArchiveRounded, SendRounded,DeleteRounded,ArrowBackOutlined,MoreVertSharp,VisibilityRounded,Edit,NoteAdd } from '@material-ui/icons';
import BackDrop from '../Backdrop';
import { useState } from 'react';
import Modal from '../Modal';
import Dialog from '../../Dialog/Dialog';
import DialogEdit from '../../Dialog/DialogEdit';
import DialogDelete from '../../Dialog/DialogDelete';
import DialogView from '../../Dialog/DialogView';
import {BsInbox,BsFolderPlus,BsBoxArrowInLeft} from "react-icons/bs";
import DialogSend from '../../Dialog/DialogSend';
import DialogDeleteFolder from '../../Dialog/DialogDeleteFolder';
import DialogEditFolder from '../../Dialog/DialogEditFolder';
import DialogRecieve from '../../Dialog/DialogRecieve';
import DialogArchiverFolder from '../../Dialog/DialogArchiverFolder';
import DialogNote from '../../Dialog/DialogNote';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    
    {...props}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    transformOrigin={{ vertical: "top", horizontal: "center" }}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenu(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const handleDelete=()=>{
    handleClose();
    props.onDelete();
  }
  function closeModal() {
    console.log("hey")
    setModalIsOpen(false);
}
console.log(props)

  return (
    <div >
      <MoreVertSharp
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        
      >
        Options
      </MoreVertSharp>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <VisibilityRounded />
         <DialogView  id={props.id} ></DialogView>
        </MenuItem>
        
        {props.receptionner===true?
          
          <MenuItem  disableRipple>
          <ArrowBackOutlined  />
              <DialogRecieve saba={props.saba} id={props.id} onSend={props.onSend}></DialogRecieve>
          </MenuItem>
         
           :
           null
        }
        {(props.envoyer===true && !(props.role==="COMISSION" && props.etape==="realisation"))?
          <MenuItem disableRipple>
          <SendRounded></SendRounded>
        <DialogSend saba={props.saba} id={props.id} onSend={props.onSend}/>
        </MenuItem>:
        null
        }
        {(props.envoyer===true && (props.role==="COMISSION" || props.role==="GUC"))?
          <MenuItem disableRipple>
          <NoteAdd></NoteAdd>
        <DialogNote id={props.id}/>
        </MenuItem>:
        null
        }
        {props.envoyer===true?props.etape==="approbation"?props.emplacement==="Antenne"?
          <div>
            <MenuItem  disableRipple>
          <DeleteRounded />
          <DialogDeleteFolder saba={props.saba} id={props.id}  reload={props.onSend} /> 
          
        </MenuItem>
        <MenuItem disableRipple>
        <Edit />
        <DialogEditFolder reload={props.onSend} id={props.id}  ></DialogEditFolder>
      </MenuItem>
          </div>:
        null :null:null

        }
        {props.envoyer===true?props.role==="COMISSION"?props.etape==="realisation"?props.emplacement==="Commission"?props.send===false?
         
          
        <MenuItem disableRipple>
        <ArchiveRounded />
        <DialogArchiverFolder  saba={props.saba} id={props.id}  reload={props.onSend} ></DialogArchiverFolder>
      </MenuItem>
          :
        null :null:null:null:null

        }
      </StyledMenu>
    </div>
  );
}