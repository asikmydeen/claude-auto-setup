/*!

=========================================================
* BLK Design System PRO React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-pro-react.scss?v1.2.0";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// presentation pages
import Index from "views/Index.js";
import Presentation from "views/Presentation.js";
import Sections from "views/Sections.js";
// example pages
import AboutUs from "views/examples/AboutUs.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import LandingPage from "views/examples/LandingPage.js";
import Pricing from "views/examples/Pricing.js";
import Ecommerce from "views/examples/Ecommerce.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Error404 from "views/examples/Error404.js";
import Error500 from "views/examples/Error500.js";
import AccountSettings from "views/examples/AccountSettings.js";
import LoginPage from "views/examples/LoginPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ResetPage from "views/examples/ResetPage.js";
import InvoicePage from "views/examples/InvoicePage.js";
import CheckoutPage from "views/examples/CheckoutPage.js";
import ChatPage from "views/examples/ChatPage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/sections" element={<Sections />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/blog-post" element={<BlogPost />} />
      <Route path="/blog-posts" element={<BlogPosts />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/ecommerce" element={<Ecommerce />} />
      <Route path="/product-page" element={<ProductPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/404-error" element={<Error404 />} />
      <Route path="/500-error" element={<Error500 />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/reset-page" element={<ResetPage />} />
      <Route path="/invoice-page" element={<InvoicePage />} />
      <Route path="/checkout-page" element={<CheckoutPage />} />
      <Route path="/chat-page" element={<ChatPage />} />
      <Route path="/" element={<Navigate to="/presentation" replace />} />
    </Routes>
  </BrowserRouter>
);
