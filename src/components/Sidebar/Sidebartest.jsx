import React from 'react'

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {GroupOutlined,History,BuildOutlined,PersonAddOutlined, StorageRounded,FolderOutlined,HomeOutlined,PersonAdd,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';
import SidebarAdmin from './SidebarAdmin';

export default function Sidebartest() {
    return (
        
        <div
      className="sidebar"
    ><CDBSidebar textColor="#000" backgroundColor="rgb(251, 251, 255)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <SidebarAdmin></SidebarAdmin>
        </CDBSidebarContent>
    </CDBSidebar>


    </div>
        
    )
}
