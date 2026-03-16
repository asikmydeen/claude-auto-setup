import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// @material-ui/icons components

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import componentStyles from "assets/theme/layouts/rtl.js";
import theme from "assets/theme/theme-rtl.js";

const useStyles = makeStyles(componentStyles);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = () => {
  const classes = useStyles();
  const location = useLocation();
  const [sidebarOpenResponsive, setSidebarOpenResponsive] = React.useState(
    false
  );

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    document.documentElement.classList.add(classes.directionRTL);
    document.body.setAttribute("dir", "rtl");
    return function cleanup() {
      document.documentElement.classList.remove(classes.directionRTL);
      document.body.removeAttribute("dir");
    };
  });

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/rtl") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Box display="flex" dir="rtl">
            <Sidebar
              rtlActive
              routes={routes}
              openResponsive={sidebarOpenResponsive}
              closeSidebarResponsive={() => setSidebarOpenResponsive(false)}
              logo={{
                innerLink: "/admin/index",
                imgSrc: require("../assets/img/brand/argon-react.png").default,
                imgAlt: "...",
              }}
            />
            <Box position="relative" flex="1" className={classes.mainContent}>
              <AdminNavbar
                openSidebarResponsive={() => setSidebarOpenResponsive(true)}
              />
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              <Container
                maxWidth={false}
                component={Box}
                classes={{ root: classes.containerRoot }}
              >
                <AdminFooter />
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default RTL;
