import React from 'react';
import Chart from '../../chart/Chart';
import FeaturedInfo from '../../FeaturedInfo/FeaturedInfo';
import "./home.css";


export default function Home() {
    return (
        <div className="home container ">
            <div className="homeTitle">
            <h5 className=" text-black">Dashboard</h5>
            <p className="text-muted  userName">Bonjour Khawla Darouich,</p>
            </div>
           <FeaturedInfo></FeaturedInfo>
            <div className="">
            <Chart></Chart>
            </div>
        </div>
    )
}
