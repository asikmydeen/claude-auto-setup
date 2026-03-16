import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Flight from "@material-ui/icons/Flight";
import Grain from "@material-ui/icons/Grain";
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import StatsHeader from "components/Headers/StatsHeader.js";
import CardBlog from "components/Cards/Cards/CardBlog.js";
import CardTeamMembersSearch from "components/Cards/Widgets/CardTeamMembersSearch.js";
import CardLatestMessages from "components/Cards/Widgets/CardLatestMessages.js";
import CardCreditInputs from "components/Cards/Widgets/CardCreditInputs.js";
import CardCalendar from "components/Cards/Widgets/CardCalendar.js";
import CardLatestNotifications from "components/Cards/Widgets/CardLatestNotifications.js";
import CardProgressTrack from "components/Cards/Dashboard/CardProgressTrack.js";
import CardCreditSimple from "components/Cards/Widgets/CardCreditSimple.js";
import CardRealTime from "components/Cards/Alternative/CardRealTime.js";
import CardCreditNumber from "components/Cards/Widgets/CardCreditNumber.js";
import CardStatsGradient from "components/Cards/Widgets/CardStatsGradient.js";
import CardToDoList from "components/Cards/Dashboard/CardToDoList.js";

import componentStyles from "assets/theme/views/admin/widgets.js";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = { ...useStyles() };
  const theme = useTheme();
  return (
    <>
      <StatsHeader section="Widgets" subsection="Widgets" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12} lg={4}>
            <CardBlog />
            <CardTeamMembersSearch />
            <CardLatestMessages />
            <CardCreditInputs />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardCalendar />
            <CardLatestNotifications />
            <CardProgressTrack />
            <CardCreditSimple />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardRealTime />
            <CardCreditNumber />
            <CardStatsGradient
              subtitle="Total Traffic"
              title="350,897"
              icon={TrendingUp}
              color="bgGradientDefault"
              footer={
                <>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.white.main}
                    marginRight=".5rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component={ArrowUpward}
                      width="1.5rem!important"
                      height="1.5rem!important"
                    />{" "}
                    3.48%
                  </Box>
                  <Box
                    component="span"
                    whiteSpace="nowrap"
                    color={theme.palette.gray[400]}
                  >
                    Since last month
                  </Box>
                </>
              }
            />
            <CardStatsGradient
              subtitle="New users"
              title="2,356"
              icon={Grain}
              color="bgGradientPrimary"
              footer={
                <>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.white.main}
                    marginRight=".5rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component={ArrowUpward}
                      width="1.5rem!important"
                      height="1.5rem!important"
                    />{" "}
                    3.48%
                  </Box>
                  <Box
                    component="span"
                    whiteSpace="nowrap"
                    color={theme.palette.gray[400]}
                  >
                    Since last month
                  </Box>
                </>
              }
            />
            <CardStatsGradient
              subtitle="Performance"
              title="49,65%"
              icon={Flight}
              color="bgGradientError"
              footer={
                <>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.white.main}
                    marginRight=".5rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component={ArrowUpward}
                      width="1.5rem!important"
                      height="1.5rem!important"
                    />{" "}
                    3.48%
                  </Box>
                  <Box
                    component="span"
                    whiteSpace="nowrap"
                    color={theme.palette.gray[400]}
                  >
                    Since last month
                  </Box>
                </>
              }
            />
            <CardToDoList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
