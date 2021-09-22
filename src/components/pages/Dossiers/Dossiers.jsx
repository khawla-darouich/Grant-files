import React from 'react'
import "./dossiers.css"
import Dialog from '../../Dialog/Dialog'
import { PeopleRounded } from '@material-ui/icons';
import Page from '../../layout/Page';
import DossiersList from './DossiersList';
export default function Dossiers() {

    

    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <PeopleRounded style={{fontSize:25}} />  Liste des dossiers</h5>   
                                <hr></hr>
                        </div>
           
                   <DossiersList></DossiersList>
            
    
        
        </Page>
    )
}
