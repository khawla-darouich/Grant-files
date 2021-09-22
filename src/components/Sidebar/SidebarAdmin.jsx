import React, { Component } from 'react'
import "./sidebarAdmin.css";
import {GroupOutlined,History,BuildOutlined,PersonAddOutlined, StorageRounded,FolderOutlined,HomeOutlined,PersonAdd,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
                      <li className="sidebarItem active"><HomeOutlined className="sidebarIcon"/><Link to="/" style={{textDecoration:"none"}}> Home</Link> </li>
                      <li className="sidebarItem"><BuildOutlined className="sidebarIcon"/> Outils</li>
                      <li className="sidebarItem"><GroupOutlined className="sidebarIcon"/> Utilisateurs</li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><GroupOutlined className="sidebarIcon"/> Utilisateurs</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem"><PersonAddOutlined className="sidebarIcon"/> <Link to="/nouveauUtilisateur" style={{textDecoration:"none"}}>Ajouter un utilisateur</Link></li>
                      <li className="sidebarItem"><PeopleOutline className="sidebarIcon"/>  <Link to="/utilisateurs" style={{textDecoration:"none"}}>Utilisateurs</Link> </li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><FolderOutlined className="sidebarIcon"/> Etat dossier</h3> 
                 
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle" style={{cursor:"pointer"}}><Link to="/dossiers" style={{textDecoration:"none"}}><StorageRounded className="sidebarIcon"/> Tous les dossiers</Link></h3> 
                  
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