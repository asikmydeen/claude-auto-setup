import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// @material-ui/lab components
// @material-ui/icons components

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import CardLightTableTables from "components/Cards/Tables/CardLightTableTables.js";
import CardInlineActions from "components/Cards/Tables/CardInlineActions.js";
import CardInlineActionsStripped from "components/Cards/Tables/CardInlineActionsStripped.js";
import CardCheckboxes from "components/Cards/Tables/CardCheckboxes.js";
import CardCheckboxesColors from "components/Cards/Tables/CardCheckboxesColors.js";
import CardTranslucentTableTables from "components/Cards/Tables/CardTranslucentTableTables.js";
import CardDarkTableTables from "components/Cards/Tables/CardDarkTableTables.js";

import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Tables = () => {
  const classes = useStyles();
  return (
    <>
      <SimpleHeader section="Tables" subsection="Tables" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <CardLightTableTables />
        <CardInlineActions />
        <CardInlineActionsStripped />
        <CardCheckboxes />
        <CardCheckboxesColors />
        <CardTranslucentTableTables />
        <CardDarkTableTables />
      </Container>
    </>
  );
};

export default Tables;
