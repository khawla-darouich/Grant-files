import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Dot} from 'recharts';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {FiberManualRecord} from '@material-ui/icons';

const AntenneChart = () => {

	const [data,setData]= useState([]);

	useEffect(() => {
		axios.get('dossiersByAntenne')
			.then(res=>{
				console.log("chart")
				console.log(res)
				setData(res.data)
			}
			, err=>{

			})
		}, []);



const COLORS = ['rgb(186, 236, 252)', ' rgb(217, 240, 255)', 'rgb(192, 208, 220)', '#7de5ff','#ff9cf3','#9cffa4'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



return (
	<div className="linechart">
            <h5 className="linechartTitle">Dossiers par Antenne</h5>
          <div className="linechartContainer">
	<ResponsiveContainer width="100%" aspect={2/1}>
		<PieChart >
		<Pie
		
		 data={data}
		 dataKey="cnt" 
		 outerRadius="80%" 
		 fill="green"
		 cx="50%"
            cy="50%" 
			labelLine={false}
            label={renderCustomizedLabel}
            
            fill="#8884d8">
				{data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
				</Pie>
				<Tooltip></Tooltip>
		</PieChart>
		</ResponsiveContainer>
		<div className="row keyss px-5  ">
     
      {data.map((element, index=0)=>
        <div className="keyItem col-4 mt-4 ">
          <FiberManualRecord style={{ color:  COLORS[index++], fontSize:30}}></FiberManualRecord>
         <div className="text-muted">{element.abreviation} </div> 
         
         
        </div>
      )}
        
     
    </div>
		</div>
		
		</div>
);
}

export default AntenneChart;
