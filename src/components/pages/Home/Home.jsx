import React from 'react';
import Chart from '../../chart/Chart';
import FeaturedInfo from '../../FeaturedInfo/FeaturedInfo';
import "./home.css";
import { useState,useEffect } from 'react';
import axios from 'axios';
import Page from '../../layout/Page';
export default function Home() {
    const [user, setUser] = useState({})
    const config={
        headers:{
          Authorization : "Bearer "+localStorage.getItem("tokenAuth")
        }
      }
      useEffect(() => {
        axios.get('currentUser',config)
        .then(
            res=>{
                setUser(res.data)
            }).catch(err=>{
                console.log(err)
            })
      }, [])
    return (
        <Page >
            <div className="homeTitle">
            <h5 className=" text-black">Dashboard</h5>
            <p className="text-muted  sidebarUserName">Bonjour {user.prenom} {user.nom},</p>
            </div>
           <FeaturedInfo></FeaturedInfo>
            <div className="">
            <Chart></Chart>
            </div>
        </Page>
    )
}
