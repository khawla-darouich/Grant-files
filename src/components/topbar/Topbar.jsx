import React from 'react';
import "./Topbar.css";
import logoORMVA from '../../assets/logoORMVA.png';
import {Tune, AccountCircle,CalendarTodayOutlined,KeyboardArrowDownOutlined,ArrowDropDownCircleRounded} from '@material-ui/icons';
import CustomizedAccountMenu from '../layout/menu/CustomizedAccountMenu';

export default function Topbar() {
    return (
        <div className="topBar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div >
                        <img src={logoORMVA} className="logo" />
                    </div>
                </div>
                <div className="topRight">
                    <div className="topBarIcons d-flex justify-content-center align-items-center">
                        <div className="date d-flex mx-3">
                        <CalendarTodayOutlined className="icon"></CalendarTodayOutlined>
                       <div className="date-text ">03,Jun 2021</div>
                        </div>
                        <AccountCircle className="icon"/>
                        <CustomizedAccountMenu className="icon"></CustomizedAccountMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}
