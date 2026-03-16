import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// @material-ui/lab components
// @material-ui/icons components

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import CardLightTableSortable from "components/Cards/Sortable/CardLightTableSortable.js";
import CardTranslucentTableSortable from "components/Cards/Sortable/CardTranslucentTableSortable.js";
import CardDarkTableSortable from "components/Cards/Sortable/CardDarkTableSortable.js";

import componentStyles from "assets/theme/views/admin/sortable.js";

const useStyles = makeStyles(componentStyles);

const Sortable = () => {
  const classes = useStyles();
  return (
    <>
      <SimpleHeader section="Sortable Tables" subsection="Tables" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <CardLightTableSortable />
        <CardTranslucentTableSortable />
        <CardDarkTableSortable />
      </Container>
    </>
  );
};

export default Sortable;
