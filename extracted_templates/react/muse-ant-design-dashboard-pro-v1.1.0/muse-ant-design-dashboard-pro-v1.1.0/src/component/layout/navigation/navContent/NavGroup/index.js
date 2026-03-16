import React from "react";
import NavCollapse from "./../NavCollapse";
import NavItem from "./../NavItem";
import { Menu } from "antd";

const NavGroup = (props) => {
  let navItems = "";
  if (props.group.children) {
    const groups = props.group.children;
    navItems = Object.keys(groups).map((item) => {
      item = groups[item];
      switch (item.type) {
        case "collapse":
          return <NavCollapse key={item.id} collapse={item} type="main" />;
        case "item":
          return <NavItem key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }
  return (
    <>
      <Menu.Item className="menu-item-header" key={props.group.id}>
        {props.group.title} {props.group.id}
      </Menu.Item>

      {navItems}
    </>
  );
};
let navGroup = NavGroup;
export default navGroup;
