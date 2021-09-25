
import Login from './Auth/Login';
import Layout from './components/layout/Layout';


import Dashboard from './components/Dashboard/Dashboard';

import Forgot from './Auth/forgot';
import UpdatePassword from './Auth/updatePassword';
import Loggin from './Auth/Loggin';
import Reset from './Auth/reset';
import { Component } from 'react';
import axios from 'axios';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import "./app.css"
import Home from './components/pages/Home/Home';
import { Route, Switch, BrowserRouter ,Redirect} from 'react-router-dom';
import Utilisateurs from './components/pages/Utilisateurs/Utilisateurs';
import NewUser from './components/pages/Utilisateurs/NewUser';
import Dossiers from './components/pages/Dossiers/Dossiers';
import History from './components/pages/History/History';
import Account from './components/pages/Account/Account';
import PrivateRoute from './components/HOC/PrivateRoute';
import NewDossier from './components/pages/Dossiers/NewDossier';
import DossierAReceptionner from './components/pages/Dossiers/DossierAReceptionner';
import DossierAEnvoyer from './components/pages/Dossiers/DossierAEnvoyer';
export default class App extends Component {
  state={};
   
  constructor(props){
    super(props)
    
    this.state = {
      user: {},
      currentUser: {},
      isAuthenticated: false
    }
  }
    componentDidMount()
    {
        const config={
          headers:{
            Authorization : "Bearer "+localStorage.getItem("tokenAuth")
          }
        }
        axios.get('currentUser',config)
        .then(
            res=>{
                   this.setUser(res.data)

                    console.log(res);
            })

        if (localStorage.getItem("tokenAuth") != null) {
          this.setState({
            isAuthenticated:true
          })
        }
    }

    setUser = user=>{
      this.setState({
        user:user
    });
    }

  render()
  {
    let classes=this.state.isAuthenticated? "app-container":"app"
     return (
      <div>
         {this.state.isAuthenticated?
         <Topbar isAuthenticated={this.state.isAuthenticated} onAuth={(auth) => this.setState({isAuthenticated: auth})} ></Topbar>
         :null}

        <div className={classes}>
        {this.state.isAuthenticated?
          <Sidebar user={this.state.user}></Sidebar>
          :null}
          <Switch>
            
            <Route path='/login' component={()=><Loggin setUser={this.setUser} onUser={(user) => this.setState({user: user})} onAuth={(auth) => this.setState({isAuthenticated: auth})} />}>

            </Route>
            <PrivateRoute exact path='/' component={()=><Home />} />
            <PrivateRoute path='/utilisateurs' component={Utilisateurs} />
            <PrivateRoute path='/dossiers' component={Dossiers} />
            <PrivateRoute path='/nouveauUtilisateur' component={NewUser} />
            <PrivateRoute path='/historique' component={History} />
            <PrivateRoute path='/account' component={Account} />
            <PrivateRoute path='/aReceptionner' component={DossierAReceptionner} />
            <PrivateRoute path='/aEnvoyer' component={DossierAEnvoyer} />
            <PrivateRoute path='/nouveauDossier' component={NewDossier} />
            <Route path='/forgot' component={Forgot}></Route>
        <Route path='/reset' component={()=><Reset setUser={this.setUser}/>}></Route>
          </Switch>
        </div>
        
      </div>
    /*<Layout>
      <Switch>
        <Route path='/' exact component=  {() => <Dashboard user={this.state.user}  setUser={this.setUser}/> }></Route>
        <Route path='/login' component={()=><Loggin setUser={this.setUser}/>}></Route>
       
        <Route path='/updatePassword' component={()=><UpdatePassword setUser={this.setUser}/>}></Route>
      </Switch>
    </Layout>*/
    
  );
  }
 
}



