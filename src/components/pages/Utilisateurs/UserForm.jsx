import React, { Component } from 'react'
import './userForm.css'
import { Link } from 'react-router-dom'
import { TextField,FormControl,Select,MenuItem,InputLabel } from '@mui/material';
import {CachedRounded,Room,Mail,Person,Lock,SupervisorAccount,PersonAddOutlined,SaveRounded} from '@material-ui/icons';
import { useState } from 'react';
import axios from 'axios';
export default class  UserForm extends Component {
    
    constructor(props)
    {
        super(props);
        console.log(this.props.nom)
        this.state={
            input: {
                nom:this.props.nom,
                prenom:this.props.prenom,
                email:this.props.email,
                antenne:this.props.antenne,
                role:this.props.role
            },
            antennes:[],
            roles:[]
        };

        this.handleChange=this.handleChange.bind(this);
        this.refresh=this.refresh.bind(this);

        axios.get('antennes')
        .then(res=>{
            console.log(res.data._embedded.antennes)
            this.setState({
                antennes:res.data._embedded.antennes
            })
        },err=>{})

        axios.get('roles')
        .then(res=>{
            console.log(res.data._embedded.roles)
            this.setState({
                roles:res.data._embedded.roles
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
                prenom:"",
                email:"",
                password:""
            }
        });

        console.log(this.state.input)
    }

    handleSubmit= (e)=>{
        e.preventDefault();
        if(!this.props.id)
     {
         console.log(this.state.input)
       this.props.onSubmit(this.state.input)
     }
     else{
        console.log(this.state.input)
         axios.post("editUser",this.state.input)
         .then(res=>{
             console.log(res)
            this.props.onClose();
            this.props.onUpdate();
         },err=>{})
        
     }
        
     }



    render()
    {
        return (
            <div className="">
                    <div className="card card2 border-0">
                    <div className="info float-end"> 
                        <div className="text">Informations personnelles</div>
                        <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                    </div>
                        <form className='form mt-2 row' onSubmit={this.handleSubmit}>
                       
                            <div className={`form-group col-md-6 mt-4`}>
                                <Person style={{ color : "#2d8bb4"}}/><label htmlFor="old-password" className="mx-1">Nom</label>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="nom" 
                                defaultValue={this.props.nom ? this.props.nom : this.state.input.nom}
                                value={this.state.input.nom}
                                name="nom"
                                placeholder="Nom" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group col-md-6  mt-4`}>
                            <Person style={{ color : "#2d8bb4"}}/><label htmlFor="old-password" className="mx-1">Prenom</label>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="prenom" 
                                defaultValue={this.props.prenom ? this.props.prenom : this.state.input.prenom}
                                value={this.state.input.prenom}
                                name="prenom"
                                placeholder="Prenom" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group ${!this.props.id ? "col-md-6 ": "col-12"}   mt-4`}>
                                <Mail style={{ color : "#2d8bb4"}}/><label htmlFor="old-password" className="mx-1"> Email</label>
                                <input className={`form-control`} 
                                type="email" 
                                required 
                                id="email" 
                              
                                value={this.props.email ? this.props.email : this.state.input.email}
                                name="email"
                                placeholder="xyz@gmail.com" 
                                onChange={this.handleChange} />
                                <div className="text-danger">{this.props.error}</div>

                            </div> 
                            {!this.props.id ? 
                             <div className={`form-group col-md-6  mt-4`}>
                                <Lock style={{ color : "#2d8bb4"}}/><label htmlFor="old-password" className="mx-1"> Password</label>
                                <input className={`form-control`} 
                                type="password" 
                                required 
                                id="password" 
                                value={this.state.input.password}
                                name="password"
                                placeholder="Password" 
                                onChange={this.handleChange} />

                            </div> : <div></div>
                            }

                                <div className={`form-group col-md-6  mt-4`}>
                                    <Room style={{ color : "#2d8bb4"}}/><label htmlFor="" className="mb-2">Antenne</label>
                                    <FormControl  style={{width: "100%"}}>
                                    
                                        <Select
                                    
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="antenne"
                                        defaultValue={this.props.antenne ? this.props.antenne : this.state.input.antenne}
                                        value={this.state.input.antenne}
                                        onChange={this.handleChange}
                                        >
                                     
                                     
                                     { this.state.antennes.map((antenne)=>(
                                              
                                              <MenuItem value={antenne.id} >{antenne.abreviation}</MenuItem>
                                     ))}
                                    
                                          
                                        </Select>
                                    </FormControl>
                                </div>
                                        
                               
                                <div className={`form-group col-md-6  mt-4`}>
                                <SupervisorAccount style={{ color : "#2d8bb4"}}/><label htmlFor="" className="mx-1 mb-2">Role</label>
                                    <FormControl  style={{width: "100%"}}>
                                        <Select
                                            name="role"
                                            defaultValue={this.props.role ? this.props.role : this.state.input.role}
                                            value={this.state.input.role}
                                            onChange={this.handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                         { this.state.roles.map((role)=>(
                                              
                                              <MenuItem value={role.id} >{role.role}</MenuItem>
                                     ))}
                                        </Select>
                                    </FormControl>
                                </div>
                           
                               
                           

                            <div className={`button float-end `}>
                            {!this.props.id ? 
                        <button > <PersonAddOutlined/> Ajouter </button> : <div className="d-flex float-end"><button >  modifier </button> </div>}
                    
                    </div>
                        </form>

                    </div>
            </div>
        )
    }
   
}
