import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons components
import Archive from "@material-ui/icons/Archive";
import Grain from "@material-ui/icons/Grain";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/buttons.js";
import componentStylesButtons from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(componentStylesButtons);

const socialButtonColors = [
  {
    icon: "fab fa-facebook",
    text: "Facebook",
    color: "buttonContainedFacebook",
  },
  {
    icon: "fab fa-twitter",
    text: "Twitter",
    color: "buttonContainedTwitter",
  },
  {
    icon: "fab fa-google-plus-g",
    text: "Google +",
    color: "buttonContainedGoogle",
  },
  {
    icon: "fab fa-instagram",
    text: "Instagram",
    color: "buttonContainedInstagram",
  },
  {
    icon: "fab fa-pinterest",
    text: "Pinterest",
    color: "buttonContainedPinterest",
  },
  {
    icon: "fab fa-youtube",
    text: "Youtube",
    color: "buttonContainedYoutube",
  },
  {
    icon: "fab fa-vimeo-v",
    text: "Vimeo",
    color: "buttonContainedVimeo",
  },
  {
    icon: "fab fa-slack",
    text: "Slack",
    color: "buttonContainedSlack",
  },
  {
    icon: "fab fa-dribbble",
    text: "Dribbble",
    color: "buttonContainedDribbble",
  },
  {
    icon: "fab fa-github",
    text: "Github",
    color: "buttonContainedGithub",
  },
];

const Buttons = () => {
  const classes = { ...useStyles(), ...useStylesButtons() };
  return (
    <>
      <SimpleHeader section="Buttons" subsection="Components" />
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
                title="Styles"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="primary" variant="contained">
                    Button
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="primary" variant="contained">
                    <Box
                      component={Archive}
                      marginRight=".75em"
                      top="-2px"
                      position="relative"
                    />
                    With Icons
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="primary" variant="contained">
                    <Box component={Grain} top="-2px" position="relative" />
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Colors"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button variant="contained">Default</Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="primary" variant="contained">
                    Primary
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="secondary" variant="contained">
                    Secondary
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedInfo,
                    }}
                  >
                    Info
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedSuccess,
                    }}
                  >
                    Success
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedError,
                    }}
                  >
                    Error
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedWarning,
                    }}
                  >
                    Warning
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Outline"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button variant="outlined">Default</Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="primary" variant="outlined">
                    Primary
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button color="secondary" variant="outlined">
                    Secondary
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="outlined"
                    classes={{
                      root: classes.buttonOutlineInfo,
                    }}
                  >
                    Info
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="outlined"
                    classes={{
                      root: classes.buttonOutlineSuccess,
                    }}
                  >
                    Success
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="outlined"
                    classes={{
                      root: classes.buttonOutlineError,
                    }}
                  >
                    Error
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="outlined"
                    classes={{
                      root: classes.buttonOutlineWarning,
                    }}
                  >
                    Warning
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Sizes"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button size="large" color="primary" variant="contained">
                    Large button
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button size="large" color="secondary" variant="contained">
                    Large button
                  </Button>
                </Box>
                <Box
                  component={Divider}
                  marginTop="2rem!important"
                  marginBottom="2rem!important"
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button size="small" color="primary" variant="contained">
                    Small button
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button size="small" color="secondary" variant="contained">
                    Small button
                  </Button>
                </Box>
                <Box
                  component={Divider}
                  marginTop="2rem!important"
                  marginBottom="2rem!important"
                />
                <Box display="block" marginBottom="1rem">
                  <Button color="primary" variant="contained" fullWidth>
                    Block level
                  </Button>
                </Box>
                <Button color="secondary" variant="contained" fullWidth>
                  Block level
                </Button>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Group"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <ButtonGroup
                  variant="contained"
                  color="secondary"
                  aria-label="contained-secondary-button-group"
                >
                  <Button>Left</Button>
                  <Button>Middle</Button>
                  <Button>Right</Button>
                </ButtonGroup>
                <Box
                  component={Divider}
                  marginTop="2rem!important"
                  marginBottom="2rem!important"
                />
                <Box
                  display="inline-block"
                  marginRight=".25rem"
                  marginBottom="1rem"
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label="contained-info-button-group"
                    classes={{
                      groupedContained: clsx(
                        classes.butttonInfoContainedGroup,
                        classes.letterSpacingInherit
                      ),
                    }}
                  >
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                  </ButtonGroup>
                </Box>
                <ButtonGroup
                  variant="contained"
                  color="default"
                  aria-label="contained-default-button-group"
                  classes={{
                    groupedContained: classes.letterSpacingInherit,
                  }}
                >
                  <Button>5</Button>
                  <Button>6</Button>
                  <Button>7</Button>
                </ButtonGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Social"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                {socialButtonColors.map((prop, key) => (
                  <Box
                    key={key}
                    display="inline-block"
                    marginRight="1rem"
                    marginBottom="1rem"
                  >
                    <Button
                      variant="contained"
                      classes={{ root: classes[prop.color] }}
                    >
                      <Box
                        component="i"
                        marginRight=".5rem"
                        className={prop.icon}
                      />
                      {prop.text}
                    </Button>
                  </Box>
                ))}
                <Box
                  component={Divider}
                  marginTop="2rem!important"
                  marginBottom="2rem!important"
                />
                {socialButtonColors.map((prop, key) => (
                  <Box
                    key={key}
                    display="inline-block"
                    marginRight="1rem"
                    marginBottom="1rem"
                  >
                    <Button
                      variant="contained"
                      classes={{
                        root: clsx(classes[prop.color], classes.buttonIconOnly),
                      }}
                    >
                      <Box component="i" className={prop.icon} />
                    </Button>
                  </Box>
                ))}
                <Box
                  component={Divider}
                  marginTop="2rem!important"
                  marginBottom="2rem!important"
                />
                {socialButtonColors.map((prop, key) => (
                  <Box
                    key={key}
                    display="inline-block"
                    marginRight="1rem"
                    marginBottom="1rem"
                  >
                    <IconButton
                      variant="contained"
                      classes={{
                        root: clsx(classes[prop.color], classes.buttonIconOnly),
                      }}
                    >
                      <Box
                        fontSize="14px"
                        component="i"
                        className={prop.icon}
                      />
                    </IconButton>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Buttons;
