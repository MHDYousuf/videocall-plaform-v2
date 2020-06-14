/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./services/auth";
import PrivateRoute from "./services/PrivateRoute";
import Profile from "./Profile";
import Landing from "./modules/Landing";
import Login from "./modules/Login";
import ForgotPassword from "./modules/ForgotPassword";
import Register from "./modules/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/profile/room/:roomId" component={Room} /> */}
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
