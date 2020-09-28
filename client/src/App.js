import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {userContext, updateUserContext} from './Store';
import Main from './pages/Main';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ConfirmMail from './pages/ConfirmMail';

import config from './config.json';

function App() {
  const [user, setUser] = useState(undefined);
  const checkLoggedIn = useCallback(async (reset)=>{
    if(!reset || !reset.reset){
      let res = await fetch(`${config.API_URL}/user/info`,{
        method: 'GET',
        credentials: 'include'
      });
      if(res.status===200){
        res = await res.json();
        setUser({
          name: res.name,
          username: res.username,
          mail_confirmed: res.mail_confirmed,
          loggedIn: true
        });
      }else{
        setUser({
          loggedIn: false
        });
      }
    }else{
      setUser({
        error:reset.error,
        loggedIn: false
      });
    }
  },[]);
  useEffect(()=>{
    checkLoggedIn();
  },[]);
  return user === undefined ? (
    <div className="flex fw fh">
      <div className="center-inflex">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  ):(
    <userContext.Provider value={user}>
      <updateUserContext.Provider value={checkLoggedIn}>
        <Router>
          <Switch>
            <Route path="/confirmail">
              <ConfirmMail/>
            </Route>
            <Route path="/login">
              {user.loggedIn? <Redirect to="/home"/> : <Login/>}
            </Route>
            <Route path="/signup">
              {user.loggedIn? <Redirect to="/home"/> : <Register/>}
            </Route>
            <Route path="/home">
              {user.loggedIn? <Home/> :  <Redirect to="/"/>}
            </Route>
            <Route path="/">
              {user.loggedIn? <Redirect to="/home"/> : <Main/>}
            </Route>
          </Switch>
        </Router>
      </updateUserContext.Provider>
    </userContext.Provider>
  );
}

export default App;
