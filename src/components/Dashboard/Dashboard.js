import axios from "axios";

import React from 'react';
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component{

    handleLogout = ()=>{
        localStorage.clear();
        this.props.setUser(null);
    }

    render()
    {
       
        if(this.props.user)
                { console.log(this.props.user.nom)
                    return(
                        <div className="d-flex bg-info">

                            <div className="card-body">
                                    Hi {this.props.user.nom}
                            </div>
                            <div className='float-end btn btn-light'> 
                            <Link to='/login' onClick ={ this.handleLogout }>Logout</Link>
                            </div>
                        </div>
                    )
                }
            
        return(
            <div>Dashboard
            <div className='float-end btn btn-primary'> 
                            <Link to='/login' >login</Link>
                            </div></div>
        );
    }
}