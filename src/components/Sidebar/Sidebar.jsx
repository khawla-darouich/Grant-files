import React, { Component } from 'react';
import "./sidebar.css";
import SidebarAdmin from './SidebarAdmin';
import SidebarUser from './SidebarUser';
import axios from 'axios';
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        axios.get('currentUser',config)
        .then(
            res=>{
                   this.setState({
                       user:res.data
                   })

                    console.log(res);
            })
        
      }
      
    
    render()
    {
        return (
        <div className="sidebar">
           {this.state.user?
                <div className="sidebarWrapper">
                {this.state.user.roles[0].role==="Admin" ?
                        <SidebarAdmin></SidebarAdmin>
                        :
                        <SidebarUser role={this.state.user.roles[0].role}></SidebarUser>
                }
               </div>
               :null

           }
        </div>
    )
    }
    
}
