import { Route, Switch } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Login from "./modules/admin/Login";
import Admin from "./modules/admin/Admin";
import ForgotPassword from "./modules/admin/ForgotPassword";
import PrivateRoute from "./modules/common/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
