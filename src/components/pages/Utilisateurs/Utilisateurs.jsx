import React from 'react'
import UsersList from './UsersList'
import "./utilisateurs.css"
import Dialog from '../../Dialog/Dialog'

export default function Utilisateurs() {

    

    return (
        <div className="utilisateurs">
           <h5 className=" text-black m-3">Liste des utilisateurs</h5>  
           
                   <UsersList></UsersList>
            
    
        </div>
    )
}