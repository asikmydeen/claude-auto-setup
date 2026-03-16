/**
 * @param  {} props
 * @param  {} {super(props
 * @param  {false} ;this.state={visible
 * @param  {"right"} placement
 * @param  {""} currentComponent
 * @param  {"#1890ff"} sidebarColor
 * @param  {"transparent"} sidenavType
 * @param  {false} fixed
 * @param  {""} name
 * @param  {""} subName
 * @param  {} };}componentDidMount(
 * @param  {this.props.match.params.id} {this.setState({currentComponent
 * @param  {this.capatlizeWord(this.props.match.params.id} name
 */
import React, { Component } from "react";

// import SidebarMenu from "./SidebarMenu";
import HeaderTop from "./HeaderTop";
import { Layout, Drawer, Affix } from "antd";

import Navigation from "./navigation";

import FooterNEw from "../layout/FooterNEw";

import { Route, Switch, withRouter } from "react-router";
import routes from "../../utils/routes";

const { Header, Content } = Layout;
const { Sider } = Layout;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: "right",
      currentComponent: "",
      sidebarColor: "#1890ff",
      sidenavType: "transparent",
      fixed: false,
      name: "",
      subName: "",
      breadcrumb: "",
      collapsed: false,

      activateMouseHover: false,
    };
  }

  componentDidMount() {
    if (this.props?.location?.pathname) {
      let page = this.props.location.pathname.split("/");
      page = page[page.length - 1];
      this.setState({ currentComponent: page });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.props.location.pathname) {
        let page = this.props.location.pathname.split("/");
        page = page[page.length - 1];
        this.setState({ currentComponent: page });
      }
    }
  }

  capatlizeWord = (word) => {
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  OpenDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleSidenavType = (type) => {
    this.setState({ sidenavType: type });
  };

  handleSidebarColor = (color) => {
    this.setState({ sidebarColor: color });
  };

  handleFixedNavbar = (type) => {
    this.setState({ fixed: type });
  };
  toggleCollasped = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { placement, visible } = this.state;

    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} key={index} />}
        />
      ) : null;
    });

    return (
      <Layout
        className={`layout-dashboard ant-layout ant-layout-has-sider has-sidebar ${
          this.state.currentComponent === "all-projects" ||
          this.state.currentComponent === "profile-overview"
            ? "layout-profile"
            : ""
        } ${this.state.collapsed ? " sidebar-minimized" : ""}
        
          ${
            this.state.currentComponent === "new-product"
              ? "layout-profile"
              : ""
          }
         ${this.state.currentComponent === "rtl" ? "layout-dashboard-rtl" : ""}
         `.trim()}
      >
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => this.setState({ visible: false })}
          open={visible}
          key={placement === "right" ? "left" : "right"}
          width={250}
          className={`drawer-sidebar ${
            this.state.currentComponent === "rtl" ? "drawer-sidebar-rtl" : ""
          } `}
        >
          <Layout
            className={`layout-dashboard ${
              this.state.currentComponent === "rtl"
                ? "layout-dashboard-rtl"
                : ""
            }`}
          >
            {/* <Navigation
              handleSidebarColor={this.handleSidebarColor}
              currentSelected={this.state.currentComponent}
            /> */}

            <Sider
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${
                this.state.sidenavType === "#fff" ? "active-route" : ""
              }`}
              style={{ background: this.state.sidenavType }}
            >
              <Navigation
                currentSelected={this.state.currentComponent}
                handleSidebarColor={this.handleSidebarColor}
              />

              {/* <SidebarMenu sidebarColor={this.state.sidebarColor} /> */}
            </Sider>
          </Layout>
        </Drawer>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            this.state.sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ background: this.state.sidenavType }}
        >
          <Navigation
            currentSelected={this.state.currentComponent}
            handleSidebarColor={this.handleSidebarColor}
          />
          {/* < sidebarColor={this.state.sidebarColor} /> */}
        </Sider>
        <Layout id="temp__div">
          {this.state.fixed ? (
            <Affix>
              <Header
                className={`${this.state.fixed ? "ant-header-fixed" : ""}`}
              >
                <HeaderTop
                  onPress={this.OpenDrawer}
                  breadcrumb={this.state.breadcrumb}
                  name={this.state.name}
                  subname={this.state.subName}
                  handleSidebarColor={this.handleSidebarColor}
                  handleSidenavType={this.handleSidenavType}
                  handleFixedNavbar={this.handleFixedNavbar}
                  toggleCollasped={this.toggleCollasped}
                />
              </Header>
            </Affix>
          ) : (
            <Header className={`${this.state.fixed ? "ant-header-fixed" : ""}`}>
              <HeaderTop
                breadcrumb={this.state.breadcrumb}
                onPress={this.OpenDrawer}
                placement={this.state.placement}
                name={this.state.name}
                subname={this.state.subName}
                handleSidebarColor={this.handleSidebarColor}
                handleSidenavType={this.handleSidenavType}
                handleFixedNavbar={this.handleFixedNavbar}
                toggleCollasped={this.toggleCollasped}
              />
            </Header>
          )}
          <Content className="content-ant ">
            <Switch>{menu}</Switch>
          </Content>
          <FooterNEw />
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Main);
