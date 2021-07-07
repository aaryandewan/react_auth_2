import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    history.push("/signin");
    try {
      await logout();
    } catch {
      setError("failed to logout");
    }
  };

  return (
    <div>
      {currentUser && currentUser.email}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
