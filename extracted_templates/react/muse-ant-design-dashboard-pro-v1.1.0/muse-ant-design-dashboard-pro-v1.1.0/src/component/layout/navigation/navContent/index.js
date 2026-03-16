import React, { Component } from "react";
import { Button, Menu } from "antd";

import NavGroup from "./NavGroup";
import { NavLink, withRouter } from "react-router-dom";
import NavIcon from "./NavIcon";
import NavBadge from "./NavBadge";
import menuItems from "../../../../utils/menu-items";

class NavContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      rootKeys: [],
      windowWidth: window.innerWidth,
    };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    let rootKeys = menuItems.items.map((item) => {
      if (item.children) {
        return [
          ...item.children.map((child) => {
            return child.id;
          }),
        ];
      }
      return false;
    });
    rootKeys = [].concat.apply([], rootKeys);
    if (this.props.location) {
      const keys = this.props.location.pathname.split("/");
      if (keys[keys.length - 1] !== "dashboard") {
        keys.pop();
      }
      keys.splice(0, 1);
      this.setState({ openKeys: keys });
    }
    this.setState({ rootKeys });
  }
  onOpenChange = (keys) => {
    const { openKeys } = this.state;
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (this.state.rootKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys: keys });
    } else {
      this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    }
  };
  navItems = this.props.navigation.map((item, index) => {
    switch (item.type) {
      case "group":
        return <NavGroup group={item} key={index} />;
      default:
        return false;
    }
  });

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.openKeys.length !== this.state.openKeys.length ||
      this.state.windowWidth > 992
    ) {
      if (this.state.openKeys.length === 0 && this.state.windowWidth > 992) {
        let rootKeys = menuItems.items.map((item) => {
          if (item.children) {
            return [
              ...item.children.map((child) => {
                return child.id;
              }),
            ];
          }
          return false;
        });
        rootKeys = [].concat.apply([], rootKeys);
        if (this.props.location) {
          const keys = this.props.location.pathname.split("/");
       
          if (keys[keys.length - 1] !== "dashboard") {
            keys.pop();
          }
          keys.splice(0, 1);
          this.setState({ openKeys: keys });
        }
        this.setState({ rootKeys });
      }
    }

    if (
      prevState.windowWidth !== this.state.windowWidth &&
      this.state.windowWidth <= 992
    ) {
      if (this.state.openKeys.length) {
       
        this.setState({ openKeys: [] });
      }
    }
  }

  renderItem = (navigation) => {
    if (!navigation) return;
    return navigation.map((item, index) => {
      switch (item.type) {
        case "group":
          return (
            <React.Fragment key={index}>
              <Menu.Item
                className={`menu-item-header ${
                  item.className ? item.className : ""
                }`}
                key={item.id || index}
              >
                {item.title}
              </Menu.Item>
              {this.renderItem(item.children)}
            </React.Fragment>
          );
        case "collapse":
          return (
            <Menu.SubMenu
              key={item.id || index}
              icon={
                item.icon
                  ? item.icon(
                      this.state.openKeys.includes(item.id),
                      window.sessionStorage.getItem("color_theam")
                    )
                  : ""
              }
              title={item.title}
            >
              <Menu.ItemGroup key={item.id + "1"}>
                {this.renderItem(item.children)}
              </Menu.ItemGroup>
            </Menu.SubMenu>
          );
        case "item":
          if (item.target) {
            return (
              <Menu.Item key={item.id} className="catlog">
                <a
                  href={item.url}
                  className="nav-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <NavIcon items={item} />
                  <span className="label"> {item.title}</span>
                  <NavBadge items={item} />
                </a>
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={item.id}>
              <NavLink to={item.url} className="nav-link" exact={true}>
                <NavIcon items={item} />
                <span className="label">{item.title}</span>
                <NavBadge items={item} />
              </NavLink>
            </Menu.Item>
          );
        default:
          return false;
      }
    });
  };
  render() {
    const dashboard = [
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        key={0}
      >
        <path
          d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
          fill={this.props.sidebarColor}
        ></path>
        <path
          d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
          fill={this.props.sidebarColor}
        ></path>
        <path
          d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
          fill={this.props.sidebarColor}
        ></path>
      </svg>,
    ];
    const mainContent = (
      <div className="navbar-content datta-scroll">
        <Menu
          theme="light"
          mode="inline"
          openKeys={this.state.openKeys}
          // defaultSelectedKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {/* {this.navItems} */}
          {this.renderItem(this.props.navigation)}
        </Menu>
        <div className="aside-footer">
          <div
            className="footer-box"
            style={{
              background: window.sessionStorage.getItem("color_theam"),
            }}
          >
            <span className="icon">{dashboard}</span>
            <h6>Need Help?</h6>
            <p>Please check our docs</p>
            <a
              href="http://digimonk.net:1618/overview"
              target="_blank"
              rel="noreferrer"
            >
              <Button type="primary" className="ant-btn-sm ant-btn-block">
                DOCUMENTATION
              </Button>
            </a>
          </div>
        </div>
      </div>
    );

    return <div>{mainContent}</div>;
  }
}
export default withRouter(NavContent);
