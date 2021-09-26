import React from 'react'
import Page from '../../layout/Page'
import axios from 'axios';
import { PeopleRounded } from '@material-ui/icons';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import {BsInbox,BsFolderPlus,BsBoxArrowRight} from "react-icons/bs";
import DossierForm from './DossierForm';
import "./dossiers.css"
export default function NewDossier() {
    const [error,setError]=useState("")
    const history=useHistory();
    
    const handleSubmit=()=>{
        history.push("/dossiers");
    }
    

    return (
       <Page>
           <div className="row mt-2 px-2">
                            <h5 className={``}> <BsFolderPlus style={{fontSize:25}} />  Nouveau Dossier</h5>   
                                <hr></hr>
                        </div>
                <DossierForm onSubmit={handleSubmit} ></DossierForm>
           </Page>
            
     
        
    )
}
