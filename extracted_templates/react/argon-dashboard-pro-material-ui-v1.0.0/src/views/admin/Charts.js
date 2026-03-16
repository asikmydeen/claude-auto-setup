import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components

// core components
import StatsHeader from "components/Headers/StatsHeader.js";
import CardSalesValueAlternative from "components/Cards/Alternative/CardSalesValueAlternative.js";
import CardTotalOrders from "components/Cards/Charts/CardTotalOrders.js";
import CardSalesValueDots from "components/Cards/Charts/CardSalesValueDots.js";
import CardAudienceOverview from "components/Cards/Charts/CardAudienceOverview.js";
import CardAffiliateTraffic from "components/Cards/Charts/CardAffiliateTraffic.js";
import CardProductComparison from "components/Cards/Charts/CardProductComparison.js";

import componentStyles from "assets/theme/views/admin/alternative-dashboard.js";

const useStyles = makeStyles(componentStyles);

function Charts() {
  const classes = { ...useStyles() };
  return (
    <>
      <StatsHeader section="Charts" subsection="Charts" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12} xl={6}>
            <CardSalesValueAlternative />
          </Grid>
          <Grid item xs={12} xl={6}>
            <CardTotalOrders />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} xl={6}>
            <CardSalesValueDots />
          </Grid>
          <Grid item xs={12} xl={6}>
            <CardAudienceOverview />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} xl={6}>
            <CardAffiliateTraffic />
          </Grid>
          <Grid item xs={12} xl={6}>
            <CardProductComparison />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Charts;
