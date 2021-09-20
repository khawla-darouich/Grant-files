import React,{Component,useRef} from "react";

import Footer from "../components/layout/Footer";
import logoORMVA from '../assets/logoORMVA.png';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';
import { useForm } from "react-hook-form";
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


     render()
     {
        return (
            <div>
        <div className="container-fluid px-1 px-md-5 px-md-1 px-xl-5 py-5 mx-auto">
    <div className={`card  ${classes.card0} border-0`}>
    <div className={` row `}> <img src={logoORMVA}  className={classes.logo}/> </div>
        <div className="row justify-content-center mb-1">
           
            <div className=" col-6 ">
                <div className={`card ${classes.card2} border-0  `}>
               
                    <div className="row px-3 mb-2  px-4">
                        <div className={'col-2'}><hr/></div> 
                            <h4 className={`col-8 text-center`}>Réinitialisation du mot de passe!</h4>
                        <div className={'col-2'}><hr/></div>
                    </div>
                    <div className="text-success">{this.state.msgs.success}</div>
                    <form className={classes.form} onSubmit={this.handleSubmit}  >
                <div className={`form-group`}>
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
                <div className={`form-group`}>
                    <label htmlFor="New-password">Nouveau mot de passe</label>
                    <input className={`form-control`} 
                           type="password" required id="New-password" 
                           placeholder="*******" 
                           name="newPassword"
                           onChange={this.handleChange} 
                           value={this.state.input.newPassword}
                           />
                </div>
                <div className={`form-group`}>
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
                 

                
                
                <div className={` mt-3 ${classes.pass}`}>
                <Link to='/login'>Se connecter !</Link>
                    <div className={`${classes.actions} `}>
                    <button >Envoyer <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </button>
                    </div>
                </div>
            </form>
                   
                </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
        </div>
        </div>
        );
     }
    
}