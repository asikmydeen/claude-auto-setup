import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
// @material-ui/icons components
import Code from "@material-ui/icons/Code";
import Notifications from "@material-ui/icons/Notifications";
import ThumbUp from "@material-ui/icons/ThumbUp";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/timeline.js";
import componentStylesBadge from "assets/theme/components/badge.js";
const useStyles = makeStyles(componentStyles);
const useStylesBadge = makeStyles(componentStylesBadge);

const items = [
  {
    icon: Notifications,
    title: "New message",
    color: "Success",
  },
  {
    icon: Code,
    title: "Product issue",
    color: "Error",
  },
  {
    icon: ThumbUp,
    title: "New likes",
    color: "Info",
  },
  {
    icon: Notifications,
    title: "New message",
    color: "Success",
  },
  {
    icon: Code,
    title: "Product issue",
    color: "Error",
  },
];

const Timeline = () => {
  const classes = { ...useStyles(), ...useStylesBadge() };
  return (
    <>
      <SimpleHeader section="Timeline" subsection="Pages" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Card elevation={0}>
              <CardHeader
                className={classes.cardHeader}
                title="Timeline"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <div
                  className={clsx(classes.timeline, classes.timelineOneSide)}
                >
                  {items.map((prop, key) => (
                    <div key={key} className={classes.timelineBlock}>
                      <Badge
                        badgeContent={<prop.icon />}
                        color={prop.color === "Error" ? "error" : undefined}
                        classes={{
                          root: classes.timelineBadgeRoot,
                          badge: clsx(
                            classes.timelineBadge,
                            classes.badgePositionRelative,
                            {
                              [classes["badge" + prop.color]]:
                                prop.color !== "Error",
                            }
                          ),
                        }}
                      ></Badge>
                      <div className={classes.timelineContent}>
                        <Box component="small" fontSize="80%" fontWeight="600">
                          10:30
                        </Box>
                        <Typography
                          component="h5"
                          variant="h5"
                          className={classes.typographyH5}
                        >
                          {prop.title}
                        </Typography>
                        <Box
                          component="p"
                          marginBottom="0"
                          fontWeight="300"
                          lineHeight="1.7"
                          fontSize=".875rem"
                          marginTop=".5rem"
                        >
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </Box>
                        <Box marginTop="1rem">
                          <Badge
                            badgeContent={"design"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                          <Badge
                            badgeContent={"system"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                          <Badge
                            badgeContent={"creative"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                        </Box>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card className={classes.cardRootDark}>
              <CardHeader
                className={classes.cardHeader}
                title="Dark timeline"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <div
                  className={clsx(classes.timeline, classes.timelineOneSide)}
                >
                  {items.map((prop, key) => (
                    <div key={key} className={classes.timelineBlock}>
                      <Badge
                        badgeContent={<prop.icon />}
                        color={prop.color === "Error" ? "error" : undefined}
                        classes={{
                          root: classes.timelineBadgeRoot,
                          badge: clsx(
                            classes.timelineBadge,
                            classes.badgePositionRelative,
                            {
                              [classes["badge" + prop.color]]:
                                prop.color !== "Error",
                            }
                          ),
                        }}
                      ></Badge>
                      <div className={classes.timelineContent}>
                        <Box component="small" fontSize="80%" fontWeight="600">
                          10:30
                        </Box>
                        <Typography
                          component="h5"
                          variant="h5"
                          className={classes.typographyH5}
                        >
                          {prop.title}
                        </Typography>
                        <Box
                          component="p"
                          marginBottom="0"
                          fontWeight="300"
                          lineHeight="1.7"
                          fontSize=".875rem"
                          marginTop=".5rem"
                        >
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </Box>
                        <Box marginTop="1rem">
                          <Badge
                            badgeContent={"design"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                          <Badge
                            badgeContent={"system"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                          <Badge
                            badgeContent={"creative"}
                            color={prop.color === "Error" ? "error" : undefined}
                            classes={{
                              root: classes.badgeMargin,
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeRound,
                                {
                                  [classes["badge" + prop.color]]:
                                    prop.color !== "Error",
                                }
                              ),
                            }}
                          ></Badge>
                        </Box>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Timeline;
