/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import NavItem from "../NavItem";
// import LoopNavCollapse from "./index";
import { Menu } from "antd";

export default class NavCollapse extends Component {
  render() {
    let navItems = "";
    if (this.props.collapse.children) {
      const collapses = this.props.collapse.children;
      navItems = Object.keys(collapses).map((item, index) => {
        item = collapses[item];
        switch (item.type) {
          case "collapse":
            return <NavCollapse collapse={item} type="sub" key={index} />;
          case "item":
            return <NavItem item={item} key={index} />;
          default:
            return false;
        }
      });
    }
    const subContent = (
      <React.Fragment>
        <Menu.SubMenu
          key={this.props.collapse.id}
          icon={this.props.collapse.icon ? this.props.collapse.icon() : ""}
          title={[this.props.collapse.title + "--" + this.props.collapse.id]}
        >
          <Menu.ItemGroup key="navitems">{navItems}</Menu.ItemGroup>
        </Menu.SubMenu>
      </React.Fragment>
    );

    return <React.Fragment>{subContent}</React.Fragment>;
  }
}
