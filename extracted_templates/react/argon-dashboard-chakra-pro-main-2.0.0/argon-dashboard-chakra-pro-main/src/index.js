/*!

=========================================================
* Vision UI PRO Chakra - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/ 

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App"; // Ensure correct relative path if App is in the same directory 

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter> 
      <App /> 
  </BrowserRouter>
);