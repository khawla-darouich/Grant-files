import React, { Component } from 'react';
import "./sidebar.css";
import SidebarAdmin from './SidebarAdmin';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
        
      }
      
    
    render()
    {
        return (
        <div className="sidebar">
           <div className="sidebarWrapper">
              
               <SidebarAdmin ></SidebarAdmin>
           </div>
        </div>
    )
    }
    
}