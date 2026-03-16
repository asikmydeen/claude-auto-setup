/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../../images/logo-ct-black.png";

const navLogo = (props) => {
  return (
    <>
      <div className=" brand">
        <img src={logo} alt="" />
        <span className="b-title">Muse Dashboard</span>
      </div>
    </>
  );
};

export default navLogo;
