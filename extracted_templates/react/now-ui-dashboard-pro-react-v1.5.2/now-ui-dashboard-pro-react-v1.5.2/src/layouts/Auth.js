/*!

=========================================================
* Now UI Dashboard PRO React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

function Auth(props) {
  const [filterColor, setFilterColor] = React.useState("yellow");
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const handleColorClick = (color) => {
    setFilterColor(color);
  };
  return (
    <>
      <AuthNavbar {...props} />
      <div className="wrapper wrapper-full-page">
        <div className="full-page section-image" filter-color={filterColor}>
          <Routes>
            {getRoutes(routes)}
            <Route
              path="/auth"
              element={<Navigate to="/auth/login-page" replace />}
            />
          </Routes>
          <Footer fluid />
        </div>
      </div>
      <FixedPlugin bgColor={filterColor} handleColorClick={handleColorClick} />
    </>
  );
}

export default Auth;
