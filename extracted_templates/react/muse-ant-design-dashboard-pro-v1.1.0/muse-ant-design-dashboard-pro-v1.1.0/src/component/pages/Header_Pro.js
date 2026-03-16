import React, { Component } from "react";
import { Menu, Button } from "antd";

import { NavLink } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  DashboardFilled,
  CodeFilled,
  AppstoreFilled,
  DollarCircleFilled,
  LockFilled,
  ReadFilled,
  RocketFilled,
  SwitcherFilled,
} from "@ant-design/icons";

export default class Header_Pro extends Component {
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

      isMenu: false,
    };
  }

  ToggleMenu = () => {
    this.setState({
      isMenu: !this.state.isMenu,
    });
  };
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
  render() {
    const toggler = [
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        key={0}
      >
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
      </svg>,
    ];
    const { isMenu } = this.state;
    return (
      <>
        <div className="header-col header-brand flex-menu">
          <h6 className="font-bold">Muse Dashboard PRO</h6>
          <Button className="btn-menu-trigger" onClick={this.ToggleMenu}>
            {toggler}
          </Button>
        </div>

        <div className="header-col header-nav">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["submenu"]}
            className="menu-large"
          >
            <SubMenu
              key="submenu"
              title="Dashboards"
              icon={<DashboardFilled />}
            >
              <Menu.Item key="dashboard">
                <NavLink to="/dashboard">Default</NavLink>
              </Menu.Item>
              <Menu.Item key="CRM">
                <NavLink to="/dashboard/crm">CRM</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="pages" title="Pages" icon={<CodeFilled />}>
              <SubMenu key="profile" title="Profile">
                <Menu.Item key="Profile Overview">
                  <NavLink to="/pages/profile/profile-overview">
                    Profile Overview
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="All Projects">
                  <NavLink to="/pages/profile/all-projects">
                    All Projects
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="setting" title="setting">
                <Menu.Item key="Settings">
                  <NavLink to="/pages/account/settings">Settings</NavLink>
                </Menu.Item>
                <Menu.Item key="Billing">
                  <NavLink to="/pages/account/billing">Billing </NavLink>
                </Menu.Item>
                <Menu.Item key="Invoice">
                  <NavLink to="/pages/account/invoice">Invoice </NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="Users" title="Users">
                <Menu.Item key="NewUser">
                  <NavLink to="/pages/users/new-user">New User</NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="Projects" title="Projects">
                <Menu.Item key="Timeline">
                  <NavLink to="/pages/projects/timeline">Timeline</NavLink>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="Pricing">
                <NavLink to="/pages/pricing">Pricing </NavLink>
              </Menu.Item>
              <Menu.Item key="rtl">
                <NavLink to="/pages/rtl">RTL</NavLink>
              </Menu.Item>
              <Menu.Item key="Charts">
                <NavLink to="/pages/charts">Charts</NavLink>
              </Menu.Item>
              <Menu.Item key="Alerts">
                <NavLink to="/pages/alerts">Alerts</NavLink>
              </Menu.Item>
              <Menu.Item key="notifications">
                <NavLink to="/pages/notifications">Notifications </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="Applications"
              title="Applications"
              icon={<AppstoreFilled />}
            >
              <Menu.Item key="Kanban">
                <NavLink to="/applications/kanban">Kanban</NavLink>
              </Menu.Item>
              <Menu.Item key="Wizard">
                <NavLink to="/applications/wizard">Wizard</NavLink>
              </Menu.Item>
              <Menu.Item key="dataTable">
                <NavLink to="/applications/data-table">DataTable</NavLink>
              </Menu.Item>
              <Menu.Item key="Calendar">
                <NavLink to="/applications/calendar">Calendar</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="ecommerce"
              title="Ecommerce"
              icon={<DollarCircleFilled />}
            >
              <SubMenu key="submenu-product-1" title="Products">
                <Menu.Item key="New Product ">
                  <NavLink to="/ecommerce/products/new-product">
                    New Product{" "}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="Edit Product">
                  <NavLink to="/ecommerce/products/edit-product">
                    Edit Product
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="Product Page">
                  <NavLink to="/ecommerce/products/product-page">
                    Product Page
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Orders" title="Orders">
                <Menu.Item key="Order List">
                  <NavLink to="/ecommerce/orders/order-list">
                    Order List
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="Order Details">
                  <NavLink to="/ecommerce/orders/order-details">
                    Order Details
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            </SubMenu>

            <SubMenu
              key="sub5"
              title="Authentication"
              icon={<LockFilled className="icon" />}
            >
              <SubMenu key="Sign Up" title="Sign Up">
                <Menu.Item key="Basic">
                  <NavLink to="/authentication/sign-up/basic">Basic</NavLink>
                </Menu.Item>
                <Menu.Item key="Cover">
                  <NavLink to="/authentication/sign-up/cover">Cover</NavLink>
                </Menu.Item>
                <Menu.Item key="Illustration">
                  <NavLink to="/authentication/sign-up/illustration">
                    Illustration{" "}
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>

          {isMenu && (
            <Menu
              className="menu-small"
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
                    <NavLink to="/dashboard/crm">CRM</NavLink>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item className="menu-item-header" key="pages">
                Pages
              </Menu.Item>

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
                    <NavLink to="/applications/kanban">Kanban</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Wizard">
                    <NavLink to="/applications/wizard">Wizard</NavLink>
                  </Menu.Item>
                  <Menu.Item key="dataTable">
                    <NavLink to="/applications/data-table">DataTable</NavLink>
                  </Menu.Item>
                  <Menu.Item key="Calendar">
                    <NavLink to="/applications/calendar">Calendar</NavLink>
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
                        <NavLink to="/ecommerce/products/new-product">
                          New Product{" "}
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="Edit Product">
                        <NavLink to="/ecommerce/products/edit-product">
                          Edit Product
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="Product Page">
                        <NavLink to="/ecommerce/products/product-page">
                          Product Page
                        </NavLink>
                      </Menu.Item>
                    </Menu.ItemGroup>
                  </SubMenu>

                  <SubMenu key="Orders" title="Orders">
                    <Menu.ItemGroup key="submenu-list" className="ant-menu-rtl">
                      <Menu.Item key="Order List">
                        <NavLink to="/ecommerce/orders/order-list">
                          Order List
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="Order Details">
                        <NavLink to="/ecommerce/orders/order-details">
                          Order Details
                        </NavLink>
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
                        <NavLink to="/authentication/sign-up/basic">
                          Basic
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="Cover">
                        <NavLink to="/authentication/sign-up/cover">
                          Cover
                        </NavLink>
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
                <NavLink to="http://digimonk.net:1618/overview">
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
                  <span className="label">Basic</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Components">
                <NavLink to="http://digimonk.net:1618/alert">
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
                <NavLink to="https://github.com/digimonktech/musedocs">
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
          )}
        </div>
        <div className="header-col header-btn">
          <Button type="false" className="ant-btn-dark border-dark px-30">
            BUY NOW
          </Button>
        </div>
      </>
    );
  }
}
