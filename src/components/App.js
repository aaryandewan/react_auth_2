import React from "react";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Signin from "./Signin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
