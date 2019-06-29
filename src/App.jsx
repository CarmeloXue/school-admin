import React from 'react';
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom'
import NormalLoginForm from './pages/Login'
import './App.css';
import Register from './pages/Register';
import List from './pages/List';
import Create from './pages/Create';

function App() {
 
   return (
     <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={NormalLoginForm}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/list" component={List}/>
        <Route exact path="/create" component={Create}/>


        <Redirect to="login"/>
      </Switch>  
     </BrowserRouter>
   )
}

export default App;
