import React from 'react'
import "./history.css"
import Page from '../../layout/Page';
import { CompareArrowsRounded } from '@material-ui/icons';
import HistoryList from './HistoryList';
export default function History() {
    return (
        <Page>
            
            <div className="row mt-1 px-2">
                            <h5 className={``}> <CompareArrowsRounded style={{fontSize:25}} />  Liste des transactions</h5>   
                                <hr></hr>
                        </div>
           
                   <HistoryList></HistoryList>
            
    
        
        </Page>
    )
}
