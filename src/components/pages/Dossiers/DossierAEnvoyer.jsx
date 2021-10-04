import React from 'react'
import "./dossiers.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
import DossiersList from './DossiersList';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {BsInbox,BsFolderPlus,BsBoxArrowRight} from "react-icons/bs";
import HistoryList from '../History/HistoryList';
export default function DossierAEnvoyer() {
   
    
    const [data,setData]= useState([]);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const [role,setRole]=useState("");

    const [reload,setReload]=useState(true);
    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
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

    function calcRetard(dateR,dateE,etape,emplacement)
    {
        let diff=0;
        if(dateE)
        {
             diff=dateDiffInDays(new Date(dateR),new Date(dateE));
        }
        else{
             diff=dateDiffInDays(new Date(dateR),new Date());
        }
       
        console.log(data.etape)
        if(etape==="approbation")
        {
            if(emplacement==="Antenne")
            {
                return 3-diff;
            }else if(emplacement==="Guichet unique central")
            {
                return 2-diff;
            }
            else if(emplacement==="Commission")
            {
                return 15-diff;
            }
        }
        else if(etape==="realisation")
        {
            if(emplacement==="Antenne")
            {
                return 2-diff;
            }else if(emplacement==="Guichet unique central")
            {
                return 1-diff;
            }
            else if(emplacement==="Commission")
            {
                return 23-diff;
            }
        }
    }
    const config={
        headers:{
          Authorization : "Bearer "+localStorage.getItem("tokenAuth")
        }
      }
      useEffect(() => {
        axios.get("currentUser",config)
        .then(res=>{
            const currUser=res.data
         axios.get('/lastTransactions',config)
         .then(
           res=>{
               const data=res.data;
               console.log(data)
              const Dossiers=[];
              data.forEach(element => {
                 
                 if((currUser.roles[0].role==="GUC" && element.historique.emplacement.designation==="Guichet unique central" && element.historique.dossier.envoyer===false)
                     || (currUser.roles[0].role==="COMISSION" && element.etape.designation==="approbation" && element.historique.emplacement.designation==="Commission" && element.historique.dossier.envoyer===false) 
                     || (currUser.roles[0].role==="ADA" && element.historique.emplacement.designation==="Antenne" && element.historique.dossier.envoyer===false) 
                     || (currUser.roles[0].role==="COMISSION" && element.historique.emplacement.designation==="Commission" && element.historique.dossier.envoyer===false && element.etape.designation==="realisation") 
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
                        envoyer:element.historique.dossier.envoyer,
                        id:element.historique.dossier.id,
                        etape:element.etape.designation,
                        emplacement:element.historique.emplacement.designation,
                        antenne:element.historique.dossier.cda.antenne.abreviation,
                        saba:element.historique.dossier.saba,
                        dateReception:formatDate(element.historique.datereception),
                        dateEnvoi:date,
                        retard:calcRetard(element.historique.datereception,element.historique.date_envoi,element.etape.designation,element.historique.emplacement.designation)
                       
                     }
                     Dossiers.push(obj);
                 }
                  
           });
           setData(Dossiers);
           },
           err=>{})
           setRole(currUser.roles[0].role);
        })
       }, [reload]);
     
       const handleSend=()=>{
        setReload(!reload)
       }

    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <BsBoxArrowRight style={{fontSize:25}} />  Dossiers à envoyer</h5>   
                                <hr></hr>
                        </div>
           
                        <HistoryList data={data} envoyer={true} onSend={handleSend} role={role}></HistoryList>
            
            
    
        
        </Page>
    )
}
