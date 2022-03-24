import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import MyHouse from "./pages/MyHouse";
import MyTenants from "./pages/MyTenants";
import Error from "./pages/Error";

import Navbar from "./components/Navbar";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/myHouse/" component={MyHouse} />
        <Route exact path="/myTenants/" component={MyTenants} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
