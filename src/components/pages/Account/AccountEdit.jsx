import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TextField,FormControl,Select,MenuItem,InputLabel } from '@mui/material';
import {CachedRounded,Room,Mail,Person,Lock,SupervisorAccount,PersonAddOutlined,SaveRounded} from '@material-ui/icons';
import { useState } from 'react';
import axios from 'axios';
export default class  AccountEdit extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            input: {
                nom:this.props.user.nom,
                prenom:this.props.user.prenom,
                email:this.props.user.email,
                antenne:this.props.user.antenne.id
            },
            antennes:[],
            roles:[]
        };

        this.handleChange=this.handleChange.bind(this);
        this.refresh=this.refresh.bind(this);

        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        axios.get('antennes',config)
        .then(res=>{
            console.log(res.data._embedded.antennes)
            this.setState({
                antennes:res.data._embedded.antennes
            })
        },err=>{})

        
       
    }

    handleChange(event)
    {
        let input=this.state.input;
        input[event.target.name]= event.target.value;

        this.setState({
            input
        });
    }

    refresh()
    {
        this.setState({
            input: {
                nom:"",
                prenom:""
            }
        });

        console.log(this.state.input)
    }

    
    handleSubmit= (e)=>{
        e.preventDefault();
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        if(!this.props.user.id)
     {
         console.log(this.state.input)
         this.props.onSubmit(this.state.input)
     }
     else{
        
        const user={
            antenne: {id:this.state.input.antenne},
            email: this.state.input.email,
            nom: this.state.input.nom,
            prenom: this.state.input.prenom
        }
        console.log(user)
         axios.post("updateUser",user,config)
         .then(res=>{
             console.log(res)
             this.props.onChange();
         },err=>{})
        
     }
        
     }



    render()
    {
        return (
            <div className="">
                    <div className="card ">
                        <div className="header m-3 d-flex">
                            Modifier les informations personnelles
                            <div className="info mx-3 float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                            </div>
                        </div>
                    
                        <form className=' p-2 px-3 mb-2  row' onSubmit={this.handleSubmit}>
                       
                            <div className={`form-group col-md-6 mt-2`}>
                              
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="nom" 
                                
                                value={this.state.input.nom}
                                name="nom"
                                placeholder="Nom" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group col-md-6  mt-2`}>
                           
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="prenom" 
                                
                                value={this.state.input.prenom}
                                name="prenom"
                                placeholder="Prenom" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group ${!this.props.id ? "col-md-6 ": "col-12"}   mt-2`}>
                            
                                <input className={`form-control`} 
                                type="email" 
                                required 
                                id="email" 
                              
                                value={this.state.input.email}
                                name="email"
                                placeholder="xyz@gmail.com" 
                                onChange={this.handleChange} disabled />
                                <div className="text-danger">{this.props.error}</div>

                            </div> 
                           

                                <div className={`form-group col-md-6  mt-3`}>
                                   
                                    <FormControl size="small"  style={{width: "100%"}}  >
                                    
                                        <Select
                                    
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="antenne"
                                        
                                        value={this.state.input.antenne}
                                        onChange={this.handleChange}
                                        >
                                     
                                     
                                     { this.state.antennes.map((antenne)=>(
                                              
                                              <MenuItem value={antenne.id} >{antenne.abreviation}</MenuItem>
                                     ))}
                                    
                                          
                                        </Select>
                                    </FormControl>
                                </div>
                                        
                               
                           
                               
                           

                            <div className={`mt-1 float-end btn `}>
                           
                        <button className="  float-end">  Enregistrer </button> 
                    
                    </div>
                        </form>

                    </div>
            </div>
        )
    }
   
}
