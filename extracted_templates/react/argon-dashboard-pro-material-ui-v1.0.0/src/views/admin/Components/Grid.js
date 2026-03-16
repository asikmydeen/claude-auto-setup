import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/grid.js";

const useStyles = makeStyles(componentStyles);

const GridView = () => {
  const classes = { ...useStyles() };
  const theme = useTheme();
  return (
    <>
      <SimpleHeader section="Grid" subsection="Components" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        {/* Table */}
        <Grid
          container
          component={Box}
          marginBottom="39px"
          justifyContent="center"
        >
          <Grid item xs={12} lg={8}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Grid system"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      One of three columns
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      One of three columns
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      One of three columns
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Equal-width"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      2 of 3
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      2 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      3 of 3
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Setting one column width"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      2 of 3 (wider)
                    </Box>
                  </Grid>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      3 of 3
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      2 of 3 (wider)
                    </Box>
                  </Grid>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      3 of 3
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Variable width content"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container component={Box} justifyContent="center">
                  <Grid item xs={12} lg={2}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item xs={12} md="auto">
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      Variable width content
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      3 of 3
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      1 of 3
                    </Box>
                  </Grid>
                  <Grid item md="auto">
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      Variable width content
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      3 of 3
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Equal-width multi-row"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      col
                    </Box>
                  </Grid>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      col
                    </Box>
                  </Grid>
                  <Box width="100%"></Box>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      col
                    </Box>
                  </Grid>
                  <Grid
                    item
                    component={Box}
                    flexBasis="0"
                    flexGrow="1"
                    maxWidth="100%"
                  >
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      col
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Mix and match"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={8}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={12} md={8}"}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={12} md={4}"}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={6} md={4}"}
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={6} md={4}"}
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={6} md={4}"}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={6}"}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      display="block"
                      padding=".75rem"
                      fontSize=".875rem"
                      margin="1rem 0"
                      color={theme.palette.gray[800]}
                      borderRadius=".25rem"
                      className={classes.boxRoot}
                    >
                      {"xs={6}"}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GridView;
