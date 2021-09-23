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
                  <h3 className="sidebarTitle active"><Link to="/"  className="link" style={{textDecoration:"none"}}><LineStyle className="sidebarIcon"/> Home</Link></h3> 
                  
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><Tune className="sidebarIcon"/> Outils</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem "><HomeOutlined className="sidebarIcon"/> Home </li>
                      <li className="sidebarItem"><BuildOutlined className="sidebarIcon"/> Outils</li>
                      <li className="sidebarItem"><GroupOutlined className="sidebarIcon"/> Utilisateurs</li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><GroupOutlined className="sidebarIcon"/> Utilisateurs</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem"> <Link to="/nouveauUtilisateur" className="link" style={{textDecoration:"none"}}> <PersonAddOutlined className="sidebarIcon"/>Ajouter un utilisateur</Link></li>
                      <li className="sidebarItem"> <Link to="/utilisateurs" className="link" style={{textDecoration:"none"}}><PeopleOutline className="sidebarIcon"/> Utilisateurs</Link> </li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><Link to="/historique" className="link" ><FolderOutlined className="sidebarIcon"/> Etat dossier</Link> </h3> 
                 
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle" style={{cursor:"pointer"}}><Link to="/dossiers" className="link" > <StorageRounded className="sidebarIcon"/>Tous les dossiers</Link></h3> 
                  
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