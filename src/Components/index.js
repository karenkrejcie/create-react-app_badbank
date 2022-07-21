import React from "react";
import ReactBootstrap from "react-bootstrap";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Home from "./home.js";
import CreateAccount from "./createaccount.js";
import Deposit from "./deposit.js";
import Withdraw from "./withdraw.js";
import AllData from "./alldata.js";
import NavBar from "./navbar.js";
import {UserContext} from './context';

export default function Spa() {
  const Route       =  BrowserRouter.Route;
  const Link        =  BrowserRouter.Link;
  const HashRouter  =  BrowserRouter.HashRouter;

  //https://www.pragimtech.com/blog/reactjs/usecontext-part-2-in-react/
  const [user, setUser] = React.useState({users:[{id: 1, name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]});
//useState({users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]});
  return (
    <HashRouter>
      <NavBar/>
      < UserContext.Provider value={{data:user, updateUser:setUser}}>
        <div className="container" style={{padding: "20px"}}>
          <h1>This will be exciting</h1>
          <Route exact path="/"  component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          {/*<Route path="/login/" component={Login} />*/}
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          {/*<Route path="/balance/" component={Balance} />*/}
          <Route path="/alldata/" component={AllData} />
        </div>
       
      </UserContext.Provider>         
    </HashRouter>
  );
};
