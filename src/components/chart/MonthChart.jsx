import React from 'react'
import "./linechart.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState,useEffect } from 'react';

export default function MonthChart() {

    const [data,setData]= useState([]);
    const [monthStat,setMonthStat]= useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
 
    useEffect(() => {
    axios.get("dossiers").
    then(res=>{
        
        
      let dossiers=res.data._embedded.dossiers;
       
    
        dossiers.forEach(element => {
            element["month"]=monthNames[new Date(element["dateCreation"]).getMonth()];
        });
        setData(dossiers);
        
        const dataTable = [
          { month:"Jan",
              dossiers:0 },
           { month:"Fév",
             dossiers:0 },
           { month:"Mar",
             dossiers:0 },
           { month:"Apr",
             dossiers:0 },
           { month:"May",
             dossiers:0 },
           { month:"Juin",
             dossiers:0 },
           { month:"Juil",
             dossiers:0 },
           { month:"Aout",
             dossiers:0 },
           { month:"Sept",
             dossiers:0 },
           { month:"Oct",
             dossiers:0 },
           { month:"Nov",
             dossiers:0 },
           { month:"Dec",
             dossiers:0 }
      ];
        dossiers.forEach(element => {
          let i=new Date(element["dateCreation"]).getMonth()-1;
         
            dataTable[new Date(element["dateCreation"]).getMonth()].dossiers++;
         
      });
      
      setMonthStat(dataTable);
        
        
     
       
    },
    err=>{})
}, []);

    return (
        <div className="linechart">
            <h5 className="linechartTitle">Dossiers par mois
          <div className="linechartContainer">
          <ResponsiveContainer width="100%" aspect={5/1}>
            <LineChart data={monthStat}>
              <XAxis dataKey="month" stroke="#9b9b9b"></XAxis>
              <Line type="monotone" dataKey="dossiers"></Line>
              <Tooltip></Tooltip>
              
              <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"></CartesianGrid>
            </LineChart> 
          </ResponsiveContainer>
          </div>
            
         
           </h5>
        </div>
    )
}
