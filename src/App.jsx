import React from 'react';
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom'
import NormalLoginForm from './pages/Login'
import './App.css';
import Register from './pages/Register';

function App() {
 
   return (
     <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={NormalLoginForm}/>
        <Route exact path="/register" component={Register}/>

        <Redirect to="login"/>
      </Switch>  
     </BrowserRouter>
   )
}

export default App;
