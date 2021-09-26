import React from 'react'
import "./dossiers.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
import DossiersList from './DossiersList';
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function Dossiers() {
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
      axios.get('/dossiersList',config)
      .then(
        res=>{
            const data=res.data;
           const Dossiers=[];
           data.forEach(element => {
               
            const obj={
                id:element.dossier.id,
                etat:element.dossier.envoyer,
                emplacement:element.emplacement.designation,
                cda:element.dossier.cda.description,
                saba:element.dossier.saba,
                reference:element.dossier.reference,
                dateDepot:formatDate(element.dossier.dateCreation),
                postulant:element.dossier.agriculteur.nom+" "+element.dossier.agriculteur.prenom, 
            }
            Dossiers.push(obj);
        });
        setData(Dossiers);
        },
        err=>{})
    }, [reload]);
      

    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <PeopleRounded style={{fontSize:25}} />  Liste des dossiers</h5>   
                                <hr></hr>
                        </div>
           
                   <DossiersList data={data}></DossiersList>
            
    
        
        </Page>
    )
}
