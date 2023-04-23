/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import FiscaliasList from "../components/FiscaliasList";
import Login from "../components/Login";
import AddFiscalia from "../components/AddFiscalia";
import Fiscalia from "../components/Fiscalia";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { loginRequest } from "./authConfig";
import ProfileContent from "./ProfileData";

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <Router>
      <nav style={{backgroundColor:"#142667"}} className="navbar navbar-expand navbar-dark">
        <a href={"/fiscalias"} className="navbar-brand">
          Ministerio Público
        </a>

        <div className="navbar-nav mr-auto">
          <>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to={"/fiscalias"} className="nav-link">
                    Fiscalías
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/agregar"} className="nav-link">
                    Agregar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/perfil"} className="nav-link">
                    Perfil
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              {isAuthenticated ? (
                <Link
                  to={"/"}
                  className="nav-link"
                  onClick={() => handleLogout()}
                >
                  Sign Out
                </Link>
              ) : (
                <Link
                  to={"/"}
                  className="nav-link"
                  onClick={() => handleLogin()}
                >
                  Sign In
                </Link>
              )}
            </li>
          </>
        </div>
      </nav>

      {isAuthenticated ? (
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/fiscalias"]} component={FiscaliasList} />
            <Route exact path="/inicio" component={Login} />
            <Route exact path="/agregar" component={AddFiscalia} />
            <Route path="/fiscalias/:id" component={Fiscalia} />
            <Route path="/perfil" component={ProfileContent} />
          </Switch>
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </Router>
  );
};
