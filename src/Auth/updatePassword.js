import React,{Component,useRef} from "react";

import Footer from "../components/layout/Footer";
import logoORMVA from '../assets/logoORMVA.png';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';
import { useForm } from "react-hook-form";
import {CachedRounded,Room,Mail,Person,Lock,SupervisorAccount,PersonAddOutlined,SaveRounded} from '@material-ui/icons';
import axios from "axios";

 export default class UpdatePassword extends Component{

    constructor()
    {
        super();
        this.state={
            input: {},
            errors: {},
            msgs: {}
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.refresh=this.refresh.bind(this);
    }

    handleChange(event)
    {
        let input=this.state.input;
        input[event.target.name]= event.target.value;

        this.setState({
            input
        });
    }

    validate()
    {
        let input= this.state.input;
        let errors= {};
        let isValid=true;


        if (typeof input["newPassword"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
          
            if (input["newPassword"] != input["confirmPassword"]) {
              isValid = false;
              errors["newPassword"] = "Passwords don't match.";
              console.log(errors);
            }
        } 

        this.setState({
            errors: errors
        });

        return isValid;
      
    }

    handleSubmit(event)
    {
        event.preventDefault();
        if(this.validate())
        {
            console.log( "input"+this.state.input.oldPassword);

            
            
          
            const data={
                oldPassword:this.state.input.oldPassword,
                 newPassword:this.state.input.newPassword
            }
            console.log(data)
           
            const config={
                headers:{
                  Authorization : "Bearer "+localStorage.getItem("tokenAuth")
                }
              } 
              console.log(data)
            axios.post('updatePassword',data,config)
                .then(res=>{
                    console.log(res)
                    let msgs={};
                    msgs["success"]="Mot de passe changé avec succés";
                    
                    let input= {};
                    input["oldPassword"]="";
                    input["newPassword"]=""
                    input["confirmPassword"]=""
                    this.setState({
                        input:input,
                        msgs:msgs,
                        errors:{}
                    });
                },err=>{
                    console.log(err.response)
                    let errors={};
                    errors['oldPassword']=err.response.data.message
                    this.setState({
                        msgs:{},
                        errors:errors
                    })
                });


        }

    }
/*    submitHanlder=(event)=>{
        event.preventDefault();

        const data={
            oldPassword:this.oldPass,
            newPassword:this.newPass,
            confirmPass:this.confirmPass,
          
        }
        console.log(data)
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        axios.post('updatePassword',data,config)
        .then(res=>{
            console.log(res)
        },err=>{console.log(err)});
    }*/

    refresh()
    {
        this.setState({
            input: {
                oldPassword:"",
                newPassword:"",
                confirmPassword:""
            }
        });

        console.log(this.state.input)
    }
     render()
     {
        return (
            <div className={`card  `}>
               
               <div className="header m-3 d-flex">
                  <div>
                  <Lock/>
                            Changer le mot de passe
                  </div>
                            <div className="info mx-3 float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                            </div>
                        </div>
                    
            <div className="text-success">{this.state.msgs.success}</div>
            <form className={` row ${classes.form}`} onSubmit={this.handleSubmit}  >
        <div className={`form-group col-md-4 col-12`}>
            <label htmlFor="old-password">Ancien mot de passe</label>
            <input className={`form-control`} 
                    type="password" required id="old-password" 
                    placeholder="*******" 
                    name="oldPassword"
                    onChange={this.handleChange} 
                    value={this.state.input.oldPassword}
                    />
                    <div className="text-danger">{this.state.errors.oldPassword}</div>
           
        </div>
        <div className={`form-group col-md-4 col-12`}>
            <label htmlFor="New-password">Nouveau mot de passe</label>
            <input className={`form-control`} 
                   type="password" required id="New-password" 
                   placeholder="*******" 
                   name="newPassword"
                   onChange={this.handleChange} 
                   value={this.state.input.newPassword}
                   />
        </div>
        <div className={`form-group col-md-4 col-12`}>
            <label htmlFor="password-repeat">Confirmer le mot de passe</label>
            <input className={`form-control`} 
            type="password" required id="repeat-password" 
            placeholder="*******" 
            name="confirmPassword"
            onChange={this.handleChange} 
            value={this.state.input.confirmPassword}
            />
            <div className="text-danger">{this.state.errors.newPassword}</div>
        
        </div>
         

        
        
        <div className={`mt-1 float-end btn `}>
                           
                        <button className=" float-end">  Enregistrer </button> 
                    
                    </div>
    </form>
           
        </div>
        );
     }
    
}