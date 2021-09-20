import React,{Component,useRef} from "react";
import Footer from '../components/layout/Footer';
import logoORMVA from '../assets/logoORMVA.png';
import { Link,Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { useForm } from "react-hook-form";
import axios from "axios";


 export default class Reset extends Component{

    constructor(){
        super();
        this.state={
            input:{},
            msg:{}
        };
        this.pwdConfirm=this.pwdConfirm.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    pwdConfirm = (e) => {
        var inputpwd=this.state.input;
        inputpwd[e.target.name]=e.target.value;
        this.setState({
            inputpwd
        });
        console.log("heeeey"+ this.state.inputpwd);
    }

    validation(){
        var msg={};
        if(this.state.input["password"]!==this.state.input["passwordConfirm"])
        {
            msg["password"]="Passwords Are Wrong ..!"
        }
        else{
            msg["passwordConfirm"]="Passwords Are the Same ..!"
        }
        console.log("heeeey"+ this.state.msg,msg);
      this.setState({
          msg:msg
      });
      console.log("heeeey"+ this.state.msg);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("heeeey"+ this.state.input);
        if(this.validation())
        {
            var input={};
            input['password']="";
            input['passwordConfirm']="";
            console.log("heeeey"+ input['passwordConfirm']);
        }
    }
  


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
                  
                    <form className={classes.form} onSubmit={this.handleSubmit}  >
                <div className={`form-group`}>
                    <label htmlFor="old-password">Email</label>
                    <input className={`form-control`}  type="email" required id="email" placeholder="xyz@gmail.com" onChange={e => this.email=e.target.value}  />
                   
                </div>
                <div className={`form-group`}>
                    <label htmlFor="New-password">Nouveau mot de passe</label>
                    <input className={`form-control`} onChange={this.pwdConfirm} name="password" value={this.state.input.password} type="password" required id="New-password" placeholder="*******" onChange={e => this.newPass=e.target.value} />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="password-repeat">Confirmer le mot de passe</label>
                    <input className={`form-control`} onChange={this.pwdConfirm} name="passwordConfirm" type="password" value={this.state.input.passwordConfirm} required id="repeat-password" placeholder="*******" onChange={e => this.confirmPass=e.target.value}/>
                    <div className="text-danger"> {this.state.msg.password} </div>
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
