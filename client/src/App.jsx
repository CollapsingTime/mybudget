import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ModalRoot from "./Components/Modal/ModalRoot.jsx";
import PageNotFound from "./Pages/PageNotFound";
import GlobalStyle from "./Pages/globalStyles.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <GlobalStyle />
      <ModalRoot />
      {isLoading ? null : (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/signin"
              render={(props) =>
                !isAuthenticated ? (
                  <SignIn {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard/overview" />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={(props) =>
                !isAuthenticated ? (
                  <SignUp {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard/overview" />
                )
              }
            />
            <Route
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/signin" />
                )
              }
            />
            <Route exact path="/" render={() => <Homepage />} />
            <Route component={PageNotFound}></Route>
          </Switch>
        </BrowserRouter>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
