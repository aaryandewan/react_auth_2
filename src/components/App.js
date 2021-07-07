import React from "react";
import Signup from "./Signup";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Signup />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
