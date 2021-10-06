import React from 'react'
import "./dossiers.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
import DossiersList from './DossiersList';
import { useState,useEffect } from 'react';

import {BsInbox,BsFolderPlus,BsInboxFill} from "react-icons/bs";
import axios from 'axios';
export default function DossierAReceptionner() {
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
             const Dossiers=[];
             data.forEach(element => {
                
                if((currUser.roles[0].role==="GUC" && element.etape.designation==="approbation" && element.historique.emplacement.designation==="Antenne" && element.historique.dossier.envoyer===true)
                    || (currUser.roles[0].role==="COMISSION" && element.etape.designation==="approbation" && element.historique.emplacement.designation==="Guichet unique central" && element.historique.dossier.envoyer===true) 
                    || (currUser.roles[0].role==="ADA" && currUser.antenne.abreviation===element.historique.dossier.cda.antenne.abreviation && element.etape.designation==="realisation" && element.historique.emplacement.designation==="Commission" && element.historique.dossier.envoyer===true) 
                    || (currUser.roles[0].role==="GUC" && element.etape.designation==="realisation" && element.historique.emplacement.designation==="Antenne" && element.historique.dossier.envoyer===true) 
                    || (currUser.roles[0].role==="COMISSION" && element.etape.designation==="realisation" && element.historique.emplacement.designation==="Guichet unique central" && element.historique.dossier.envoyer===true) 
                    )
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
                            <h5 className={``}> <BsInboxFill style={{fontSize:25}} /> Dossier à réceptionner</h5>   
                                <hr></hr>
                        </div>
           
                   <DossiersList data={data} receptionner={true} onSend={handleSend}></DossiersList>
            
    
        
        </Page>
    )
}
