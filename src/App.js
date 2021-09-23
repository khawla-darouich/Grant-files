
/*import Login from './Auth/Login';
import Layout from './components/layout/Layout';
import Loggin from './Auth/Loggin';

import Dashboard from './components/Dashboard/Dashboard';

import Forgot from './Auth/forgot';
import UpdatePassword from './Auth/updatePassword';*/
import Reset from './Auth/reset';
import { Component } from 'react';
import axios from 'axios';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import "./app.css"
import Home from './components/pages/Home/Home';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Utilisateurs from './components/pages/Utilisateurs/Utilisateurs';
import NewUser from './components/pages/Utilisateurs/NewUser';
import Dossiers from './components/pages/Dossiers/Dossiers';
import History from './components/pages/History/History';

export default class App extends Component {
  state={};
   
    componentDidMount()
    {
        const config={
          headers:{
            Authorization : "Bearer "+localStorage.getItem("tokenAuth")
          }
        }
      console.log(config)
    
        axios.get('dossiers',config).then(res=>{
            console.log(res);
                axios.get('currentUser',config)
                    .then(
                        res=>{
                               this.setUser(res.data)
            
                                console.log(res);
                        })
        }).catch(err=>{
            console.log(err);
        })
    }

    setUser = user=>{
      this.setState({
        user:user
    });
    }

  render()
  {
     return (
      <div>
         <Topbar></Topbar>
        <div className="app-container">
          <Sidebar></Sidebar>
          <Switch>
            <Route exact path="/">
             <Home></Home>
            </Route>
            <Route exact path="/utilisateurs">
              <Utilisateurs></Utilisateurs>
            </Route>
            <Route exact path="/dossiers">
              <Dossiers></Dossiers>
            </Route>
            <Route exact path="/nouveauUtilisateur">
              <NewUser></NewUser>
            </Route>
            <Route exact path="/historique">
              <History></History>
            </Route>
          </Switch>
        </div>
        
      </div>
    /*<Layout>
      <Switch>
        <Route path='/' exact component=  {() => <Dashboard user={this.state.user}  setUser={this.setUser}/> }></Route>
        <Route path='/login' component={()=><Loggin setUser={this.setUser}/>}></Route>
        <Route path='/forgot' component={Forgot}></Route>
        <Route path='/reset' component={()=><Reset setUser={this.setUser}/>}></Route>
        <Route path='/updatePassword' component={()=><UpdatePassword setUser={this.setUser}/>}></Route>
      </Switch>
    </Layout>*/
    
  );
  }
 
}



