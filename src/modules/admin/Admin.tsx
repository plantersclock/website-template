import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ManageBlog from "./blog/ManageBlog";
import { Switch, Route } from "react-router-dom";

const Admin = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    console.log("logging out");
    setError("");

    try {
      await logout();
      history.push("/admin/login");
    } catch {
      setError("failed to log out");
    }
  };
  return (
    <div>
      <div>Admin Page</div>
      <div>{currentUser.email}</div>
      <button onClick={handleLogout}>Logout</button>
      <div>{error}</div>
      <Switch>
        <Route exact path="/admin/blog" component={ManageBlog} />
      </Switch>
    </div>
  );
};

export default Admin;
