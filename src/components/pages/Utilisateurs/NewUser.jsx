import React from 'react'
import Page from '../../layout/Page'
import UserForm from './UserForm'
import './userForm.css'
import axios from 'axios';
import { PeopleRounded } from '@material-ui/icons';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
export default function NewUser() {
    const [error,setError]=useState("")
    const history=useHistory();
    
    function handleSubmit(data)
    {
        axios.post("register",data)
        .then(res=>{ 
            console.log("doone")
            history.push("/utilisateurs")
        },err=>{
            setError(err.response.data.message)
        })
    }

    return (
       <Page>
           <div className="row mt-2 px-2">
                            <h5 className={``}> <PeopleRounded style={{fontSize:25}} />  Nouveau utilisateur</h5>   
                                <hr></hr>
                        </div>
           <UserForm onSubmit={handleSubmit} error={error}></UserForm>
           </Page>
            
     
        
    )
}
