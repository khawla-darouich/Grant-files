import React from 'react'
import UsersList from './UsersList'
import "./utilisateurs.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
export default function Utilisateurs() {

    

    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <PeopleRounded style={{fontSize:25}} />  Liste de utilisateurs</h5>   
                                <hr></hr>
                        </div>
           
                   <UsersList></UsersList>
            
    
        
        </Page>
    )
}
