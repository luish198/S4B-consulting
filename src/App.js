import logo from './logo.svg';
import './App.css';
import Main from './Main'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Home from './Home'
import { useEffect, useState } from 'react';

//components-----------------------------------------
import Clients from './mini-erp/Clients'
import Consultants from './mini-erp/Consultants'




function App() {

  //const [userInfo, setUserInfo] = useState("User Info Initial");
  function NotFound() {
    return <>You have landed on a page that doesn't exist</>;
  }

  return (
    <div className="App">


      <Switch>
        <Route exact path="/">
          <Main />
          <Button />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/consultants">
          <Consultants />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>



    </div>
  );
}

export default App;
