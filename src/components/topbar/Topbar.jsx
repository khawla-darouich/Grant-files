import React from 'react';
import "./Topbar.css";
import logoORMVA from '../../assets/logoORMVA.png';
import {Tune,MenuRounded, AccountCircle,CalendarTodayOutlined,KeyboardArrowDownOutlined,ArrowDropDownCircleRounded} from '@material-ui/icons';
import { BsBoxArrowLeft,BsChevronDown ,BsFillPersonFill,BsCalendar} from "react-icons/bs";
import CustomizedAccountMenu from '../layout/menu/CustomizedAccountMenu';
import { IconButton } from '@mui/material';
import { Toolbar } from '@mui/material';
export default function Topbar(props) {

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/');
    }
    return (
        <Toolbar className="topBar ">
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuRounded style={{color: "#005f88"}} />
          </IconButton>
          
            
                <div className="">
                    <div >
                        <img src={logoORMVA} className="logo" />
                    </div>
                </div>
                <div className="">
                    
                    <div className="topBarIcons d-flex justify-content-center align-items-center">
                        <div className="date d-flex mx-3">
                        <CalendarTodayOutlined className="icon" style={{fontSize:20}}></CalendarTodayOutlined>
                       <div className="date-text mx-1">{formatDate(new Date())}</div>
                        </div>
                        <BsFillPersonFill className="icon"/>
                        <CustomizedAccountMenu onAuth={props.onAuth} className="icon"></CustomizedAccountMenu>
                    </div>
                </div>
            
        </Toolbar>
    )
}

