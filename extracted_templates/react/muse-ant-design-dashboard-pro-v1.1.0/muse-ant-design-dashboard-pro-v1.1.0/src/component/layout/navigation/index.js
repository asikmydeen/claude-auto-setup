import React, { Component } from "react";
import { withRouter } from "react-router";

import NavLogo from "./navLogo";
import NavContent from "./navContent";

import menuItems from "../../../utils/menu-items";

class Navigation extends Component {
  render() {
    let navContent = (
      <React.Fragment>
        <NavLogo
          collapseMenu={this.props.collapseMenu}
          windowWidth={this.props.windowWidth}
          onToggleNavigation={this.props.onToggleNavigation}
        />
        <hr />
        <NavContent
          navigation={menuItems.items}
          handleSidebarColor={this.props.handleSidebarColor}
          currentSelected={this.props.currentSelected}
        />
      </React.Fragment>
    );
    return <>{navContent}</>;
  }
}

export default withRouter(Navigation);
