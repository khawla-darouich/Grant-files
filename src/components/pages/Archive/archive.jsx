import React from 'react'
import "../Dossiers/dossiers.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';

import { useState,useEffect } from 'react';
import DossiersList from '../Dossiers/DossiersList';
import {BsInbox,BsFolderPlus,BsInboxFill} from "react-icons/bs";
import axios from 'axios';
import ArchiveList from './ArchiveList';
export default function Archive() {
    const [reload,setReload]=useState(true);
    const [data,setData]= useState([]);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const config={
        headers:{
          Authorization : "Bearer "+localStorage.getItem("tokenAuth")
        }
      }
      
    useEffect(() => {
       axios.get("currentUser",config)
       .then(res=>{
           console.log(res)
           const currUser=res.data
        axios.get('/lastTransactions',config)
        .then(
          res=>{
              const data=res.data;
              console.log(res.data)
             const Dossiers=[];
             data.forEach(element => {
                
                if(element.etape.designation==="Archive")
                {
                            
                            let date=null;
                        if(!element.historique.date_envoi)
                        {
                        date="---"
                        }else{
                        date=formatDate(element.historique.date_envoi);
                        }
                    const obj={
                        id:element.historique.dossier.id,
                        etat:element.historique.dossier.envoyer,
                        emplacement:element.historique.emplacement.designation,
                        cda:element.historique.dossier.cda.description,
                        saba:element.historique.dossier.saba,
                        reference:element.historique.dossier.reference,
                        sousRubrique:element.historique.dossier.sousRubrique.designation,
                        reference:element.historique.dossier.reference,
                        dateDepot:formatDate(element.historique.dossier.dateCreation),
                        postulant:element.historique.dossier.agriculteur.nom+" "+element.historique.dossier.agriculteur.prenom, 
                    }
                    Dossiers.push(obj);
                }
                 
          });
          setData(Dossiers);
          },
          err=>{})
       })
      }, [reload]);
      const handleSend=()=>{
        setReload(!reload)
       }
    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <BsInboxFill style={{fontSize:25}} /> Archive</h5>   
                                <hr></hr>
                        </div>
           
                   <ArchiveList data={data}  onSend={handleSend}></ArchiveList>
            
    
        
        </Page>
    )
}
