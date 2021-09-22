import React,{Component} from 'react';
import logoORMVA from '../assets/logoORMVA.png';
import classes from './Login.module.css';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useState } from 'react';

export default class Forgot extends Component{

  
    constructor() {
        super();
        this.state={
            input: {},
            errors: {},
            msgs: {},
            isValid: true
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
      handleSubmit(event)
    {
        event.preventDefault();
      
        this.validate(event);
         

    }
      validate(event)
    {
       
        let msgs= {};
        let errors= {};
        

        const data={
            email: this.state.input.email
        }

        axios.post('/checkEmail',data)
        .then(result=>{
               
                console.log("2--- true :",this.state.isValid);
                msgs["email"]=" Lien de réinitialisation envoyé";
                this.setState({
                    msgs:msgs,
                    errors:{},
                    isValid:true
                });
                console.log("3--- result ",this.state.isValid);
                
            emailjs.sendForm('service_1234567', 'template_zonvtzn', event.target, 'user_a1adQN6UGbEQeVjBmHT9D')
            .then((result) => {
                    console.log("4--- ",result.text);
                    let input= {};
           
                    input["email"]="";
                 
                    this.setState({input:input});
                }, (error) => {
                    console.log("4--- ",error.text);
                });


        }).catch(err=>{
                this.setState({
                    isValid:false
                })
                console.log("2--- false : ",this.state.isValid);
                errors["email"]=err.response.data.message;
                this.setState({
                    errors: errors,
                    msgs:{}
                });
                console.log("3--- result ",this.state.isValid);
                return this.state.isValid;
        });

      
    }

/*
    handleSubmit = e=>{

        e.preventDefault();
        const data={
            email:this.email,
        }

        axios.post('/checkEmail',data)
        .then(res=>{
            emailjs.sendForm('service_1234567', 'template_zonvtzn', e.target, 'user_a1adQN6UGbEQeVjBmHT9D')
                .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                     e.target.reset();
                     this.setState({
                     
                        isDone:"done"
                    });
        }).catch(err=>{
                    console.log(err.response.data.message);
                    console.log(err);
                    this.setState({
                        message:err.response.data.message,
                        isDone:"undone"
                    });
                    
                });
      
    }*/
    render ()
    {
        
        return (
            <div>
        <div className="container-fluid px-1 px-md-5 px-md-1 px-xl-5 py-5 mx-auto">
    <div className={`card  ${classes.card0} border-0`}>
    <div className={` row m-2`}> <img src={logoORMVA}  className={classes.logo}/> </div>
        <div className="row justify-content-center mb-5">
           
            <div className=" col-6 ">
                <div className={`card ${classes.card2} border-0  `}>
               
                    <div className="row px-3 mb-4 mt-2  px-4">
                        <div className={classes.line}></div> 
                            <small className={`${classes.or} text-center`}>Mot de passe oublié !</small>
                        <div className={classes.line}></div>
                    </div>
                    <div className='m-3 mb-0 '>
                    <div className="text-success">{this.state.msgs.email}</div>
                        <div><strong> Entrez votre adresse Email </strong></div>
                        <div><small> un email de réinitialisation va être envoyez à votre boite e-mail</small></div>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit} >
                <div className={`form-group`}>
                    <label htmlFor="email">Email</label>
                    <input className={`form-control`}
                           type="email " 
                           name="email" 
                           required 
                           id="email" 
                           value={this.state.input.email}
                           onChange={this.handleChange} 
                           placeholder="xyz@gmail.com" 
                           />
                             <div className="text-danger">{this.state.errors.email}</div>
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