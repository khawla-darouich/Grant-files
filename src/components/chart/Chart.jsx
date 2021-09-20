import React from 'react'
import AntenneChart from './AntenneChart';
import CdaChart from './CdaChart';
import "./chart.css";
import MonthChart from './MonthChart';



export default function Chart() {
    return (
        <div className="row ">
            <div className="lineChart col-12">
                <MonthChart></MonthChart>
                
            </div>
           
            <div className="col-md-6 col-12">
                <AntenneChart></AntenneChart>
            </div>
            <div className="col-md-6 col-12">
            <CdaChart></CdaChart>
            </div>
            
        </div>
    )
}

