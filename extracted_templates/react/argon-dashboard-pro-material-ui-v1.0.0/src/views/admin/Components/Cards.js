import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components

// core components
import StatsHeader from "components/Headers/StatsHeader.js";

import CardHeaderList from "components/Cards/Cards/CardHeaderList.js";
import CardButton from "components/Cards/Cards/CardButton.js";
import CardProfileCards from "components/Cards/Cards/CardProfileCards.js";
import CardHeaderComponent from "components/Cards/Cards/CardHeader.js";
import CardTeamMember from "components/Cards/Cards/CardTeamMember.js";
import CardTeamMemberInfo from "components/Cards/Cards/CardTeamMemberInfo.js";
import CardBlog from "components/Cards/Cards/CardBlog.js";
import CardTestimonial from "components/Cards/Cards/CardTestimonial.js";
import CardPricingGradientCards from "components/Cards/Cards/CardPricingGradientCards.js";
import CardHeaderAction from "components/Cards/Cards/CardHeaderAction.js";
import CardBgImage from "components/Cards/Cards/CardBgImage.js";
import CardPricingCards from "components/Cards/Cards/CardPricingCards.js";

import componentStyles from "assets/theme/views/admin/cards.js";
import componentStylesCardDeck from "assets/theme/components/cards/card-deck.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardDeck = makeStyles(componentStylesCardDeck);

function Cards() {
  const classes = { ...useStyles(), ...useStylesCardDeck() };
  return (
    <>
      <StatsHeader section="Cards" subsection="Components" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12} lg={4}>
            <CardHeaderList />
            <CardButton />
            <CardProfileCards />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardHeaderComponent />
            <CardTeamMember />
            <CardTeamMemberInfo />
            <CardBlog />
            <CardTestimonial />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardPricingGradientCards />
            <CardHeaderAction />
            <CardBgImage />
            <CardPricingCards />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Cards;
