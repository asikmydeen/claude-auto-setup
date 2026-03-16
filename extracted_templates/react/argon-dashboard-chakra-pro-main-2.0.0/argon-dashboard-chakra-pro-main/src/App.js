/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/
import { Routes, Route, Navigate } from 'react-router-dom'; 

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import LandingLayout from "layouts/Landing";
import theme from './theme/theme';   
import {
  ChakraProvider, 
} from '@chakra-ui/react'; 
// Chakra imports

export default function Main() { 
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout />
          }
        />
        <Route
          path="landing/*"
          element={
            <LandingLayout />
          }
        /> 
        <Route
          path="rtl/*"
          element={
            <RTLLayout  />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />


  
      </Routes>
    </ChakraProvider>
  );
}
