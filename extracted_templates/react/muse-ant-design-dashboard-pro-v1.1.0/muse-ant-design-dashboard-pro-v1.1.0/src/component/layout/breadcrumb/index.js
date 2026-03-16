/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import menuItems from "../../../utils/menu-items";
import config from "../../../utils/config";
import { NavLink, withRouter } from "react-router-dom";

import { Breadcrumb as AntdBreadcrumb } from "antd";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main: [],
      item: [],
    };
  }

  componentDidMount() {
    this.filter();
  }

  filter = () => {
    menuItems.items.map((item, idx) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item, idx);
      }
      return false;
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.filter();
    }
  }

  getCollapse = (item) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          this.getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            this.setState({ item: collapse, main: item });
          }
        }
        return false;
      });
    }
  };

  render() {
    let main, item;
    let breadcrumb = "";
    let title = "Welcome";
    if (this.state.main && this.state.main.type === "collapse") {
      main = (
        <AntdBreadcrumb.Item>
          <NavLink to="/">{this.state.main.title}</NavLink>
        </AntdBreadcrumb.Item>
      );
    }

    if (this.state.item && this.state.item.type === "item") {
      title = this.state.item.title;
      item = (
        <AntdBreadcrumb.Item>
          <NavLink to="/">{title}</NavLink>
        </AntdBreadcrumb.Item>
      );

      if (this.state.item.breadcrumbs !== false) {
        breadcrumb = (
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <AntdBreadcrumb>
                    {main}
                    {item}
                  </AntdBreadcrumb>
                  <div className="ant-page-header-heading">
                    <span className="ant-page-header-heading-title">
                      {title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return <div>{breadcrumb}</div>;
  }
}
export default withRouter(Breadcrumb);
