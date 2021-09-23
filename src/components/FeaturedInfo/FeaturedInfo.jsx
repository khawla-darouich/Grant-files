import React from 'react'
import "./featuredInfo.css";
import { useState,useEffect } from 'react';
import {GroupOutlined,ArchiveOutlined,HourglassEmptyOutlined,InboxOutlined,TimerOffOutlined,VerifiedUserOutlined,Storage,StorageRounded,FolderOutlined ,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';
import axios from 'axios';
export default function FeaturedInfo() {

    const [nbDossiers,setNbDossiers]= useState(0);
    const [nbUsers,setNbUsers]= useState(0);
    const [nbApp,setNbApp]= useState(0);
    const [nbRetard,setNbRetard]=useState(0);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

    function calcRetard(dateR,dateE,etape,emplacement)
    {
        let diff=dateDiffInDays(new Date(dateR),new Date(dateE));
        
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
    
    useEffect(() => {
        axios.get('/dossiersList')
        .then(
          res=>{
              console.log(res);
              const data=res.data;
             console.log('nananaa')
             console.log(data);
             setNbDossiers(data.length);  console.log(data.length);
             let cmpt=0;
             data.forEach(element => {
                
                 if(element.etape.designation==="approbation")
                  cmpt++;
          });
          setNbApp(cmpt)
          console.log(cmpt)
          axios.get("/UsersList")
          .then(res=>{
              setNbUsers(res.data.length)
              axios.get("/transactions")
              .then(res=>{
                  const data=res.data;
                  let i=0;
                  data.forEach(element=>{
                   if(calcRetard(element.historique.datereception,element.historique.date_envoi,element.etape.designation,element.historique.emplacement.designation)<0)
                   {
                        i++;
                   }
                    setNbRetard(i);
                  })
              },err=>{})
          },err=>{})
         
          },
          err=>{})
      }, []);
    return (
        <div className="featured align-items-center text-center row">
            <div className="row">
            <div className=" nanani   ">
                <div className="featuredItem bg-white row ">
                     <div className="featuredIcon col-12 col-md-4"><FolderOutlined style={{ fontSize: 40, color : "#2d8bb4" }}/> </div>
                <div className="featuredContainer col-md-8 text-center">
                    <div className="featuredNumber">{nbDossiers}</div>
                    Dossiers total

                </div>
                </div>
               
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ss  row">
                <div className="featuredIcon col-md-4 col-12"> <GroupOutlined style={{ fontSize: 40, color:"#fff07b" }} /></div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">{nbUsers}</div>
                    Utilisateurs

                </div>
            </div>
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ng   row">
                <div className="featuredIcon col-md-4 col-12"><HourglassEmptyOutlined style={{ fontSize: 40, color:" #ff9c9c" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">{nbApp}</div>
                    Dossiers en approbation

                </div>
            </div>
            </div>
            </div>
           <div className="row">
           <div className=" nanani  ">
            <div className="featuredItem bg-white r  row">
                <div className="featuredIcon col-md-4 col-12"><ArchiveOutlined style={{ fontSize: 40, color:"#7de5ff" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">46</div>
                    Dossiers Archivés

                </div>
            </div>
            </div>
            <div className=" nanani  ">
                <div className="featuredItem bg-white    row ">
                     <div className="featuredIcon col-md-4 col-12"><TimerOffOutlined style={{ fontSize: 40, color:"#ff9cf3" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">{nbRetard}</div>
                    Dossiers en retard

                </div>
                </div>
               
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ss  row">
                <div className="featuredIcon  col-12 col-md-4"><VerifiedUserOutlined style={{ fontSize: 40, color:"#9cffa4" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">{nbDossiers-nbApp}</div>
                    Dossiers en réalisation

                </div>
            </div>
            </div>
           </div>
           
        </div>
    )
}
