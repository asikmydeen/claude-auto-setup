import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons components
import MoreHoriz from "@material-ui/icons/MoreHoriz";

// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import CardInfoBg from "components/Cards/Alternative/CardInfoBg.js";
import CardSalesValueAlternative from "components/Cards/Alternative/CardSalesValueAlternative.js";
import CardTotalOrders from "components/Cards/Charts/CardTotalOrders.js";
import CardProgressTrackAlternative from "components/Cards/Alternative/CardProgressTrackAlternative.js";
import CardPageVisitsAlternative from "components/Cards/Alternative/CardPageVisitsAlternative.js";
import CardRealTime from "components/Cards/Alternative/CardRealTime.js";
import CardTeamMembers from "components/Cards/Dashboard/CardTeamMembers.js";
import CardToDoList from "components/Cards/Dashboard/CardToDoList.js";
import CardProgressTrack from "components/Cards/Dashboard/CardProgressTrack.js";

import componentStyles from "assets/theme/views/admin/alternative-dashboard.js";
import componentStylesCardDeck from "assets/theme/components/cards/card-deck.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardDeck = makeStyles(componentStylesCardDeck);

const infoCards = [
  {
    color: "primary",
    subtitle: "Tasks completed",
    title: "8/24",
    progressColor: "success",
    progressValue: 30,
  },
  {
    color: "info",
    subtitle: "Contacts",
    title: "123/267",
    progressColor: "success",
    progressValue: 50,
  },
  {
    color: "error",
    subtitle: "Items sold",
    title: "200/300",
    progressColor: "success",
    progressValue: 80,
  },
  {
    color: "default",
    subtitle: "Notifications",
    title: "50/62",
    progressColor: "success",
    progressValue: 90,
  },
];

const DropdownComponent = ({ id }) => {
  const classes = { ...useStyles(), ...useStylesCardDeck() };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls={"simple-menu-" + id}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        className={classes.buttonRoot}
      >
        <Box
          component={MoreHoriz}
          width="1.25rem!important"
          height="1.25rem!important"
          position="relative"
          top="2px"
        />
      </Button>
      <Menu
        id={"simple-menu-" + id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Action</MenuItem>
        <MenuItem onClick={handleClose}>Another action</MenuItem>
        <MenuItem onClick={handleClose}>Something else here</MenuItem>
      </Menu>
    </>
  );
};

const AnchorComponent = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        color={theme.palette.white.main}
        fontWeight="600"
        whiteSpace="nowrap"
        textDecoration="none"
        component="a"
      >
        See details
      </Box>
    </>
  );
};

function AlternativeDashboard() {
  const classes = { ...useStyles(), ...useStylesCardDeck() };
  return (
    <>
      <AlternativeHeader section="Alternative" subsection="Dashboards" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          {infoCards.map((prop, key) => (
            <Grid item xs={12} md={6} xl={3} key={key}>
              <CardInfoBg
                color={prop.color}
                subtitle={prop.subtitle}
                title={prop.title}
                progressValue={prop.progressValue}
                progressColor={prop.progressColor}
                rightAction={<DropdownComponent id={key} />}
                bottomAction={<AnchorComponent />}
              />
            </Grid>
          ))}
        </Grid>
        <Box className={clsx(classes.cardDeck, classes.flexColumnFlexXlRow)}>
          <CardSalesValueAlternative />
          <CardTotalOrders />
          <CardProgressTrackAlternative />
        </Box>
        <Grid container>
          <Grid item xs={12} xl={8}>
            <CardPageVisitsAlternative />
          </Grid>
          <Grid item xs={12} xl={4}>
            <CardRealTime />
          </Grid>
        </Grid>
        <Box className={clsx(classes.cardDeck, classes.flexColumnFlexXlRow)}>
          <CardTeamMembers />
          <CardToDoList />
          <CardProgressTrack />
        </Box>
      </Container>
    </>
  );
}

export default AlternativeDashboard;
