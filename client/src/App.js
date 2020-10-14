import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapContainer from "./components/map/MapContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import { autoLogin } from "./requests";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    autoLogin();
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
