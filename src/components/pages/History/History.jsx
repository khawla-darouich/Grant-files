import React from 'react'
import "./history.css"
import Page from '../../layout/Page';
import { CompareArrowsRounded } from '@material-ui/icons';
import HistoryList from './HistoryList';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function History() {

    
    const [data,setData]= useState([]);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;


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
      axios.get('/transactions',config)
      .then(
        res=>{
            const data=res.data;
           const Dossiers=[];
           data.forEach(element => {
            if(!element.etape.designation==="Archive")  
            { let date=null;

               if(!element.historique.date_envoi)
               {
                date="---"
               }else{
                date=formatDate(element.historique.date_envoi);
               }
               
            const obj={
                id:element.historique.id.dossierid+"-"+element.historique.id.emplacement_id,
                etape:element.etape.designation,
                emplacement:element.historique.emplacement.designation,
                antenne:element.historique.dossier.cda.antenne.abreviation,
                saba:element.historique.dossier.saba,
                dateReception:formatDate(element.historique.datereception),
                dateEnvoi:date,
                retard:calcRetard(element.historique.datereception,element.historique.date_envoi,element.etape.designation,element.historique.emplacement.designation)
               
               
              
            }
            Dossiers.push(obj);}
        });
        setData(Dossiers);
        },
        err=>{})
    }, [reload]);
    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <CompareArrowsRounded style={{fontSize:25}} />  Liste des transactions</h5>   
                                <hr></hr>
                        </div>
           
                   <HistoryList data={data}></HistoryList>
            
    
        
        </Page>
    )
}
