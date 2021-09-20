import {useRef} from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import Card from '../components/ui/Card';
import Footer from '../components/layout/Footer';
import logoORMVA from '../assets/logoORMVA.png';

function Login(){

     const emailInputRef=useRef();
     const passwordInputRef=useRef();

     function loginHandler(event)
     {
         event.preventDefault();
         const entredEmail = emailInputRef.current.value;
         const entredPassword = passwordInputRef.current.value;
         const user={
             email:entredEmail,
             password:entredPassword,
             
         }
         axios.post('login',user)
         .then(res=>{
             console.log(res.headers.authorization);
             localStorage.setItem('tokenAuth',res.headers.authorization);
         }).catch(err=>{
             console.log("heeeey "+err)
         })
       
     }
/* <form className={classes.form}  onSubmit={loginHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type="text" required id="email" ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={passwordInputRef} />
                </div>
                
                <div className={classes.actions}>
                    <button>Add Meetup</button>
                </div>
            </form>*/
     return (

       <div>
         
            
          
           
            
            <div className="container-fluid px-1 px-md-5 px-md-1 px-xl-5 py-5 mx-auto">
    <div className={`card  ${classes.card0} border-0`}>
        <div className="row d-flex">
            <div className="col-md-6">
                <div className={`${classes.card1} mb-2`}>
                    <div className={` row `}> <img src={logoORMVA}  className={classes.logo}/> </div>
                    <div className={`row pr-5 px-3  ${classes.borderLine} m-2 mt-5 `}>
                        <h1 className={``}>Gestion des délais</h1>
                        <h1 className={` `}>ORMVA pouvez le rendre facile pour vous </h1>
                        <h5 className={`${classes.h1} `}>
                            Rencontrez notre nouveau système de gestion des dossiers de subventions
                            
                        </h5>
                        <div className={`${classes.actions2} `}>
                    <button>Contactez-nous</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 ">
                <div className={`card ${classes.card2} border-0 px-4 py-5 mt-1`}>
                  
                    <div className="row px-3 mb-4 mt-4">
                        <div className={classes.line}></div> 
                            <small className={`${classes.or} text-center`}>Se connecter</small>
                        <div className={classes.line}></div>
                    </div>
                    <div className='m-3 mb-0 '>
                        <div><strong> Connectez-vous à votre compte </strong></div>
                        <div><small> Entrez vos informations d'identification </small></div>
                    </div>
                    <form className={classes.form}  onSubmit={loginHandler}>
                <div className={`form-group`}>
                    <label htmlFor="email">Email</label>
                    <input className={`form-control`} type="email " required id="email" ref={emailInputRef} placeholder="xyz@gmail.com" />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="password">Mot de passe</label>
                    <input className={`form-control`} type="password" required id="password" placeholder="*******" ref={passwordInputRef} />
                </div>

                
                
                <div className={` mt-3 ${classes.pass}`}>
                    <a href="#">Mot de passe oublié !</a>
                    <div className={`${classes.actions} `}>
                    <button>Se connecter <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
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

export default Login;
