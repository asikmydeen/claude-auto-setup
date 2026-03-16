import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/typography.js";
import componentStylesTypography from "assets/theme/components/typography.js";

const useStyles = makeStyles(componentStyles);
const useStylesTypography = makeStyles(componentStylesTypography);

const headings = [1, 2, 3, 4, 5, 6];
const displays = [1, 2, 3, 4];
const colors = ["primary", "info", "success", "warning", "error"];

const TypographyView = () => {
  const classes = { ...useStyles(), ...useStylesTypography() };
  const theme = useTheme();
  return (
    <>
      <SimpleHeader section="Typography" subsection="Components" />
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
                title="Headings"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                {headings.map((prop, key) => (
                  <Grid
                    container
                    key={key}
                    component={Box}
                    paddingTop="1rem"
                    paddingBottom="1rem"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="small"
                        fontSize="80%"
                        fontWeight="600"
                        color={theme.palette.gray[600]}
                        className={classes.textUppercase}
                      >
                        Heading {prop}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Typography
                        variant={"h" + prop}
                        component={"h" + prop}
                        className={classes.mb0}
                      >
                        Argon Dashboard PRO Material-UI
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Display titles"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                {displays.map((prop, key) => (
                  <Grid
                    container
                    key={key}
                    component={Box}
                    paddingTop="1rem"
                    paddingBottom="1rem"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="small"
                        fontSize="80%"
                        fontWeight="600"
                        color={theme.palette.gray[600]}
                        className={classes.textUppercase}
                      >
                        Display {prop}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Typography
                        variant={"h" + prop}
                        component={"h" + prop}
                        className={clsx(classes.mb0, classes["display" + prop])}
                      >
                        Argon Dashboard PRO Material-UI
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Specialized titles"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Heading
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h3"
                      component="h3"
                      className={clsx(classes.mb0, classes.heading)}
                    >
                      Argon Dashboard PRO Material-UI
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Heading Title
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h3"
                      component="h3"
                      className={clsx(
                        classes.mb0,
                        classes.headingTitle,
                        classes.info
                      )}
                    >
                      Argon Dashboard PRO Material-UI
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Heading Title
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={clsx(classes.mb0, classes.display3)}
                    >
                      Argon Dashboard PRO Material-UI
                    </Typography>
                    <Box
                      component="p"
                      color={theme.palette.gray[600]}
                      className={classes.lead}
                    >
                      According to the National Oceanic and Atmospheric
                      Administration, Ted, Scambos, NSIDClead scentist, puts the
                      potentially record maximum.
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Paragraphs"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Paragraph
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box
                      component="p"
                      marginBottom="1rem"
                      fontWeight="300"
                      lineHeight="1.7"
                      fontSize="1rem"
                      marginTop="0"
                    >
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers. I
                      understand culture. I am the nucleus. I think that’s a
                      responsibility that I have, to push possibilities, to show
                      people, this is the level that things could be at.
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Lead text
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box component="p" className={classes.lead}>
                      According to the National Oceanic and Atmospheric
                      Administration, Ted, Scambos, NSIDClead scentist, puts the
                      potentially record maximum.
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Quote
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box component="blockquote" fontSize="1.25rem" margin="0">
                      <Box
                        component="p"
                        marginBottom="0"
                        fontWeight="300"
                        lineHeight="1.7"
                        fontSize="1rem"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </Box>
                      <Box
                        component="footer"
                        fontSize="80%"
                        display="block"
                        color={theme.palette.gray[600]}
                      >
                        — Someone famous in{" "}
                        <Box component="cite" title="Source Title">
                          Source Title
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  paddingTop="1rem"
                  paddingBottom="1rem"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                      className={classes.textUppercase}
                    >
                      Paragraph
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box
                      component="p"
                      marginBottom="0"
                      fontWeight="300"
                      lineHeight="1.7"
                      fontSize="1rem"
                      marginTop="0"
                      color={theme.palette.gray[600]}
                    >
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </Box>
                  </Grid>
                </Grid>
                {colors.map((prop, key) => (
                  <Grid
                    container
                    key={key}
                    component={Box}
                    paddingTop="1rem"
                    paddingBottom="1rem"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="small"
                        fontSize="80%"
                        fontWeight="600"
                        color={theme.palette.gray[600]}
                        className={classes.textUppercase}
                      >
                        {prop} text
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box
                        component="p"
                        marginBottom="0"
                        fontWeight="300"
                        lineHeight="1.7"
                        fontSize="1rem"
                        marginTop="0"
                        color={theme.palette[prop].main}
                      >
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers...
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TypographyView;
