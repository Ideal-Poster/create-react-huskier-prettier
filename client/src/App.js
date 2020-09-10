import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapContainer from "./components/map/MapContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/" component={MapContainer} />
      </Switch>
    </Router>
  );
}

export default App;
