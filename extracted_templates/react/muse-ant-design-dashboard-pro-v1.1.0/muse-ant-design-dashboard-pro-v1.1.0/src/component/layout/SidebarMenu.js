import React, { Component } from "react";
import { Menu, Button } from "antd";
import logo from "../images/logo-ct-black.png";
import { NavLink } from "react-router-dom";
import {
  CodeFilled,
  AppstoreFilled,
  DollarCircleFilled,
  LockFilled,
  ReadFilled,
  RocketFilled,
  SwitcherFilled,
  DashboardFilled,
} from "@ant-design/icons";

const { SubMenu } = Menu;
export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: ["sub1"],
      rootSubmenuKeys: [
        "sub1",
        "sub2",
        "sub3",
        "sub4",
        "sub5",
        "sub6",
        "sub7",
        "sub8",
      ],
      main: [],
      item: [],
    };
  }

  componentDidMount() {}

  handleClick = (keys) => {
    console.log("handleChange: ", keys);
    const latestOpenKey = keys.find(
      (key) => this.state.currentSection.indexOf(key) === -1
    );
    // this.setState({ currentSection: e.key });
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ currentSection: keys });
    } else {
      this.setState({ currentSection: latestOpenKey ? [latestOpenKey] : [] });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSection !== this.state.currentSection) {
      console.log("currentSection :", this.state.currentSection);
    }
  }

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

    return (
      <>
        <div className="brand">
          <img src={logo} alt="" />
          <span>Muse Dashboard</span>
        </div>
        <hr />

        <Menu
          theme="light"
          mode="inline"
          onOpenChange={this.handleClick}
          openKeys={this.state.currentSection}
          defaultSelectedKeys={["1"]}
        >
          <SubMenu
            key="sub1"
            icon={
              <DashboardFilled
                className="icon"
                style={{
                  background: this.state.currentSection.includes("sub1")
                    ? this.props.sidebarColor
                    : "",
                }}
              />
            }
            title={[<span className="label">Dashboards</span>]}
          >
            <Menu.ItemGroup key="g1">
              <Menu.Item key="dashboard">
                <NavLink to="/dashboard">Default</NavLink>
              </Menu.Item>
              <Menu.Item key="CRM">
                <NavLink to="/CRM">CRM</NavLink>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item className="menu-item-header" key="pages">
            Pages
          </Menu.Item>
          <SubMenu
            key="sub2"
            icon={
              <CodeFilled
                className="icon"
                style={{
                  background: this.state.currentSection.includes("sub2")
                    ? this.props.sidebarColor
                    : "",
                }}
              />
            }
            title={[<span className="label">Pages</span>]}
          >
            <Menu.ItemGroup key="g2">
              <SubMenu key="Profile" title="Profile">
                <Menu.ItemGroup key="submenu-1" className="ant-menu-rtl">
                  <Menu.Item key="Profile Overview">
                    <NavLink to="/profile">Profile Overview</NavLink>
                  </Menu.Item>
                  <Menu.Item key="All Projects">
                    <NavLink to="/allprojects">All Projects</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu key="Users" title="Users">
                <Menu.ItemGroup key="submenu-2" className="ant-menu-rtl">
                  <Menu.Item key="New User">
                    <NavLink to="/new-user">New User</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu key="Account" title="Account">
                <Menu.ItemGroup key="submenu-3" className="ant-menu-rtl">
                  <Menu.Item key="Settings">
                    <NavLink to="/settings">Settings</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Billing ">
                    <NavLink to="/billing">Billing </NavLink>
                  </Menu.Item>
                  <Menu.Item key="Invoice ">
                    <NavLink to="/invoice">Invoice </NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu key="Projects" title="Projects">
                <Menu.ItemGroup key="submenu-4" className="ant-menu-rtl">
                  <Menu.Item key="Timeline">
                    <NavLink to="/timeline">Timeline</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <Menu.Item key="Pricing">
                <NavLink to="/pricing">Pricing </NavLink>
              </Menu.Item>
              <Menu.Item key="rtl">
                <NavLink to="/rtl">RTL</NavLink>
              </Menu.Item>
              <Menu.Item key="Charts">
                <NavLink to="/charts">Charts</NavLink>
              </Menu.Item>
              <Menu.Item key="Alerts">
                <NavLink to="/alerts">Alerts</NavLink>
              </Menu.Item>
              <Menu.Item key="notifications ">
                <NavLink to="/notifications">Notifications</NavLink>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="sub3"
            title={[<span className="label">Applications</span>]}
            icon={
              <AppstoreFilled
                className="icon"
                style={{
                  background: this.state.currentSection.includes("sub3")
                    ? this.props.sidebarColor
                    : "",
                }}
              />
            }
          >
            <Menu.ItemGroup key="submenu-kan" className="ant-none">
              <Menu.Item key="Kanban">
                <NavLink to="/kanban">Kanban</NavLink>
              </Menu.Item>
              <Menu.Item key="Wizard">
                <NavLink to="/wizard">Wizard</NavLink>
              </Menu.Item>
              <Menu.Item key="dataTable">
                <NavLink to="/dataTable">DataTable</NavLink>
              </Menu.Item>
              <Menu.Item key="Calendar">
                <NavLink to="/calendar">Calendar</NavLink>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={[<span className="label">Ecommerce</span>]}
            icon={
              <DollarCircleFilled
                className="icon"
                style={{
                  background: this.state.currentSection.includes("sub4")
                    ? this.props.sidebarColor
                    : "",
                }}
              />
            }
          >
            <Menu.ItemGroup key="submenu-product">
              <SubMenu key="Products" title="Products">
                <Menu.ItemGroup
                  key="submenu-product-1"
                  className="ant-menu-rtl"
                >
                  <Menu.Item key="New Product ">
                    <NavLink to="/new-product">New Product </NavLink>
                  </Menu.Item>
                  <Menu.Item key="Edit Product">
                    <NavLink to="/edit-product">Edit Product</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Product Page">
                    <NavLink to="/product-page">Product Page</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu key="Orders" title="Orders">
                <Menu.ItemGroup key="submenu-list" className="ant-menu-rtl">
                  <Menu.Item key="Order List">
                    <NavLink to="/order-list">Order List</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Order Details">
                    <NavLink to="/order-details">Order Details</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="sub5"
            title={[<span className="label">Authentication</span>]}
            icon={
              <LockFilled
                className="icon"
                style={{
                  background: this.state.currentSection.includes("sub5")
                    ? this.props.sidebarColor
                    : "",
                }}
              />
            }
          >
            <Menu.ItemGroup key="bis">
              <SubMenu key="Sign Up" title="Sign Up">
                <Menu.ItemGroup key="bis1" className="ant-menu-rtl">
                  <Menu.Item key="Basic">
                    <NavLink to="authentication/sign-up/basic">Basic</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Cover">
                    <NavLink to="/authentication/sign-up/cover">Cover</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Illustration">
                    <NavLink to="/authentication/sign-up/illustration">
                      Illustration
                    </NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu.ItemGroup>
          </SubMenu>

          <Menu.Item className="menu-item-header" key="Account">
            Docs
          </Menu.Item>
          <Menu.Item key="Getting Started">
            <NavLink to="/getting-started">
              <span
                className="icon mr-11"
                style={{
                  background:
                    this.state.currentSection === "6"
                      ? this.props.sidebarColor
                      : "",
                }}
              >
                <ReadFilled />
              </span>
              <span className="label">Getting Started</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="Components">
            <NavLink to="/components">
              <span
                className="icon mr-11"
                style={{
                  background:
                    this.state.currentSection === "7"
                      ? this.props.sidebarColor
                      : "",
                }}
              >
                <RocketFilled />
              </span>
              <span className="label">Components</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="changelog">
            <NavLink to="/changelog">
              <span
                className="icon mr-11"
                style={{
                  background:
                    this.state.currentSection === "changelog"
                      ? this.props.sidebarColor
                      : "",
                }}
              >
                <SwitcherFilled />
              </span>
              <span className="label">Changelog</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        <div className="aside-footer">
          <div
            className="footer-box"
            style={{
              background: this.props.sidebarColor,
            }}
          >
            <span className="icon">{dashboard}</span>
            <h6>Need Help?</h6>
            <p>Please check our docs</p>
            <Button type="primary" className="ant-btn-sm ant-btn-block">
              DOCUMENTATION
            </Button>
          </div>
        </div>
      </>
    );
  }
}
