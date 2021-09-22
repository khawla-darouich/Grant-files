
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Edit,DeleteRounded,MoreHoriz,MoreVertSharp } from '@material-ui/icons';
import BackDrop from './Backdrop';
import { useState } from 'react';
import Modal from './Modal';
import Dialog from '../Dialog/Dialog';
import DialogEdit from '../Dialog/DialogEdit';
import DialogDelete from '../Dialog/DialogDelete';
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
          <Edit />
          <DialogEdit onUpdate={props.onDelete} nom={props.nom} prenom={props.prenom} id={props.id} antenne={props.antenne} role={props.role} email={props.email}></DialogEdit>
        </MenuItem>
        <MenuItem  disableRipple>
          <DeleteRounded />
          <DialogDelete nom={props.nom} prenom={props.prenom} id={props.id}  reload={handleDelete} /> 
          
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
       
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHoriz />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  );
}