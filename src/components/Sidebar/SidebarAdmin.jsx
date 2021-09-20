import React, { Component } from 'react'
import "./sidebarAdmin.css";
import {GroupOutlined,History,BuildOutlined,PersonAddOutlined, StorageRounded,FolderOutlined,HomeOutlined,PersonAdd,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';


export default class  SidebarAdmin extends Component {
      constructor(props) {
            super(props);
            this.state = {/* Awesome State Not Yet Used */}
          }
          
          
          
      render()
      {
     
    return (
        <div className="sidebarAdmin">
             <h1 className="sideBarTitle">Espace Admin</h1>
             <hr style={{ color:'#5aacd0'}} />
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><LineStyle className="sidebarIcon"/> Home</h3> 
                  
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><Tune className="sidebarIcon"/> Outils</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem active"><HomeOutlined className="sidebarIcon"/> Home</li>
                      <li className="sidebarItem"><BuildOutlined className="sidebarIcon"/> Outils</li>
                      <li className="sidebarItem"><GroupOutlined className="sidebarIcon"/> Utilisateurs</li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><GroupOutlined className="sidebarIcon"/> Utilisateurs</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem"><PersonAddOutlined className="sidebarIcon"/> Ajouter un utilisateur</li>
                      <li className="sidebarItem"><PeopleOutline className="sidebarIcon"/> Utilisateurs</li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><FolderOutlined className="sidebarIcon"/> Etat dossier</h3> 
                 
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><StorageRounded className="sidebarIcon"/> Tous les dossier</h3> 
                  
            </div>
            <hr style={{ color:'#5aacd0'}}></hr>
            <div className="sidebarHistory">
                  <div className="historyIcon">
                        <History style={{ color: '#5aacd0', fontSize: 40 }}></History>
                  </div>
                  <div className="historyTitle">
                        Historique available
                  </div>
                  <div className="historyContainer">
                        Consulter l'historique des transactions des dossiers de subvention
                  </div>
            </div>
        </div>
    )
}
}