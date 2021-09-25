import React from 'react'
import "./account.css"
import Dialog from '../../Dialog/Dialog'
import { BrightnessLowRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';
import UpdatePassword from '../../../Auth/updatePassword';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function Account() {

     const [data, setData] = useState({})
     const [done,setDone]=useState(false)
    const config={
        headers:{
          Authorization : "Bearer "+localStorage.getItem("tokenAuth")
        }
      }
      useEffect(() => {
        axios.get('currentUser',config)
        .then(
            res=>{
                  setData(res.data)
                    console.log(res);
                    setDone(true)
            }).catch(err=>{
                console.log(err)
            })
      }, [])
     
    const User={ 
        nom:"DAROUICH",
         prenom: "Khawla",
         email: "Khawla@gmail.com",
         role:{
             role:"Antenne"
         },
         antenne:{
             id:1,
             abreviation:"AAA"
         }
    }

    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <BrightnessLowRounded style={{fontSize:25}} />  Gestion du compte</h5>   
                                <hr></hr>
                        </div>
           
                 { done ?
                 <div className="row  mx-2">
                 <div className="col-md-4 mt-4 col-12">
                     <AccountDetail user={data}></AccountDetail>
                 </div>
                 <div className="col-md-8 mt-4 col-12">
                    <AccountEdit user={data}></AccountEdit>
                 </div>
                 <div className="col-12 my-3">
                     <UpdatePassword></UpdatePassword>
                 </div>
             </div>
                :null}
    
        
        </Page>
    )
}
