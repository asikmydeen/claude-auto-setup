import React, { Component } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

import NavIcon from "./../NavIcon";
import NavBadge from "./../NavBadge";

export default class NavItem extends Component {
  render() {
    let itemTitle = this.props.item.title;
    let itemId = this.props.item.id;
    // if (this.props.item.icon) {
    //   itemTitle = this.props.item.icon();
    // }

    let itemTarget = "";
    if (this.props.item.target) {
      itemTarget = "_blank";
    }

    let subContent;
    if (this.props.item.external) {
      subContent = (
        <Menu.Item key={itemId}>
          <a
            href={this.props.item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NavIcon items={this.props.item} />
            {itemTitle}, EXTERNAL, ----- , {itemId}
            <NavBadge items={this.props.item} />
          </a>
        </Menu.Item>
      );
    } else {
      subContent = (
        <Menu.Item key={itemId}>
          <NavLink
            key="items"
            to={this.props.item.url}
            className="nav-link"
            exact={true}
            target={itemTarget}
          >
            <NavIcon items={this.props.item} key="items2" />
            {itemTitle} ------- {itemId}
            <NavBadge key="item3" items={this.props.item} />
          </NavLink>
        </Menu.Item>
      );
    }

    return <React.Fragment>{subContent}</React.Fragment>;
  }
}
