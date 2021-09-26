import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import React, { useCallback } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import {FiberManualRecordOutlined} from '@material-ui/icons';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`CDA ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const COLORS = ['#2d8bb4', '#fff07b', '#ff9c9c', '#7de5ff','#ff9cf3','#9cffa4'];
//const COLORS = ['#035679', '#297ca0', '#70adc7', '#85bcd3','#d9e2e6','#9cffa4'];
export default function CdaChart() {
    
const [data,setData]= useState([]);

const config={
  headers:{
    Authorization : "Bearer "+localStorage.getItem("tokenAuth")
  }
}
useEffect(() => {
    axios.get('dossiersByCda',config)
        .then(res=>{
            setData(res.data)
        }
        , err=>{

        })
    }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="linechart">
    <h5 className="linechartTitle">Dossiers par CDA</h5>
  <div className="linechartContainer  ">
  
    <ResponsiveContainer width="100%" aspect={2/1}>
        <PieChart className="pie mb-1" >
      <Pie
       
       cy="50%"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        innerRadius="55%"
        outerRadius="75%"
        fill="#8884d8"
        dataKey="id"
        onMouseEnter={onPieEnter}
      >{data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}</Pie>
      
    </PieChart>
   
    </ResponsiveContainer>
    <div className="row keys px-5 m-3 mb-4 ">
    
     {data.map((element, index=0)=>
       <div className="keyItem col-2  ">
         <FiberManualRecordOutlined  style={{ color:  COLORS[index++], fontSize:30}}></FiberManualRecordOutlined>
        <div className="text-muted">{element.description} </div> 
        
        
       </div>
     )}
       
    
   </div>
    
    </div>
    
    </div>
  );
}
