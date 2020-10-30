import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapContainer from "./components/map/MapContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import { autoLogin } from "./requests";

function App() {
  useEffect(() => {
    autoLogin();
    // .then(console.log);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Auth} />
        <Route path="/" component={MapContainer} />
      </Switch>
    </Router>
  );
}

export default App;
