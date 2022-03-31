import React from "react";
import "./css/App.css";
import "./css/LogIn.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import MyHouse from "./pages/MyHouse";
import MyTenants from "./pages/MyTenants";
import Error from "./pages/Error";
import MyBackgrounds from "./pages/MyBackgrounds";
import SignAgreement from "./pages/SignAgreement";
import LogIn from "./pages/LogIn";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:name" component={SingleRoom} />
        <Route exact path="/myHouse/" component={MyHouse} />
        <Route exact path="/myTenants/" component={MyTenants} />
        <Route exact path="/myBackgrounds/" component={MyBackgrounds} />
        <Route exact path="/availableHouse/" component={SignAgreement} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
