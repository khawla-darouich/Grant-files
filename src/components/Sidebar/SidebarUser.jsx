import React, { Component } from 'react'
import "./sidebarAdmin.css";
import {GroupOutlined,History,ArchiveOutlined,PersonAddOutlined, StorageRounded,FolderOutlined,HomeOutlined,PersonAdd,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {BsInbox,BsFolderPlus,BsBoxArrowRight} from "react-icons/bs";

export default class  SidebarUser extends Component {
      constructor(props) {
            super(props);
            this.state = {/* Awesome State Not Yet Used */}
          }
          
          
          
      render()
      {
     
            console.log('role')
            console.log(this.props.role)
    return (
        <div className="sidebarAdmin">
             
             {this.props.role==="GUC"?
                   <h2 className="sideBarTitle">Espace GUC</h2>
                  :this.props.role==="ADA"?
                  <h4 className="sideBarTitle">Espace Antenne</h4>
                  :this.props.role==="COMISSION"?
                  <h4 className="sideBarTitle">Espace Commission</h4>
                  :null
             }
             
             <hr style={{ color:'#5aacd0'}} />
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle active"><Link to="/"  className="link" style={{textDecoration:"none"}}><LineStyle className="sidebarIcon"/> Home</Link></h3> 
                  
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><GroupOutlined className="sidebarIcon"/> Gestion des dossiers</h3> 
                  <ul className="sidebarList">
                      <li className="sidebarItem"> <Link to="/nouveauDossier" className="link" style={{textDecoration:"none"}}> <BsFolderPlus className="sidebarIcon"/>Créer un dossier </Link></li>
                      <li className="sidebarItem"> <Link to="/aReceptionner" className="link" style={{textDecoration:"none"}}><BsInbox className="sidebarIcon"/> A réceptionner</Link> </li>
                      <li className="sidebarItem"> <Link to="/aEnvoyer" className="link" style={{textDecoration:"none"}}><BsBoxArrowRight className="sidebarIcon"/> A envoyer</Link> </li>
                      
                  </ul>
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle"><Link to="/historique" className="link" ><FolderOutlined className="sidebarIcon"/> Etat dossier</Link> </h3> 
                 
            </div>
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle" style={{cursor:"pointer"}}><Link to="/dossiers" className="link" > <StorageRounded className="sidebarIcon"/>Tous les dossiers</Link></h3> 
                  
            </div>
            
            <div className="sidebarMenu">
                  <h3 className="sidebarTitle" style={{cursor:"pointer"}}><Link to="/archive" className="link" > <ArchiveOutlined className="sidebarIcon"/>Archive</Link></h3> 
                  
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