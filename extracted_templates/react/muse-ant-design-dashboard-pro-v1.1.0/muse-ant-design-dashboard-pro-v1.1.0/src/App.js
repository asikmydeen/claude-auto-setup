/*!
=========================================================
* Muse Ant Design Dashboard PRO - v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import "antd/dist/antd.min.css";
import "antd-button-color/dist/css/style.css";
import "./App.css";
import "./responsive.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SignUp from "./component/pages/SignUp";

import Main from "./component/layout/main";
import Pricing from "./component/pages/Pricing";
import Cover from "./component/authentication/signup/Cover";
import Illustration from "./component/authentication/signup/Illustration";
import PageFound from "./component/pages/PageFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/sign-up" exact component={SignUp} />
          <Route
            path="/authentication/sign-up/basic"
            exact
            component={SignUp}
          />
          <Route path="/authentication/sign-up/cover" exact component={Cover} />
          <Route
            path="/authentication/sign-up/illustration"
            exact
            component={Illustration}
          />
          <Route path="/sign-in" exact component={PageFound} />
          {/* <Route path="/sign-in" exact component={SignIn} /> */}
          <Route path="/pages/pricing" exact component={Pricing} />

          <Route path="/:id" component={Main} />

          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
