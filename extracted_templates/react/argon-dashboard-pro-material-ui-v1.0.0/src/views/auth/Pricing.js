import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// @material-ui/icons components
import Business from "@material-ui/icons/Business";
import Check from "@material-ui/icons/Check";

// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import CardPricing from "components/Cards/Pricing/CardPricing.js";
import CardPricingGradient from "components/Cards/Pricing/CardPricingGradient.js";
import componentStyles from "assets/theme/views/auth/pricing.js";
import cardGroupStyles from "assets/theme/components/cards/card-group.js";
import buttonsStyles from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardGroup = makeStyles(cardGroupStyles);
const useStylesButtons = makeStyles(buttonsStyles);

function Pricing() {
  const classes = {
    ...useStyles(),
    ...useStylesCardGroup(),
    ...useStylesButtons(),
  };
  const theme = useTheme();
  const tableRows = [
    {
      FIELD1: "IMAP/POP Support",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
    },
    {
      FIELD1: "Email Forwarding",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
    },
    {
      FIELD1: "Active Sync",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
    },
    {
      FIELD1: "Multiple domain hosting",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: "Limited to 1 domain only",
    },
    {
      FIELD1: "Additional storage upgrade",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
    },
    {
      FIELD1: "30MB Attachment Limit",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: "-",
    },
    {
      FIELD1: "Password protected / Expiry links",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: "-",
    },
    {
      FIELD1: "Unlimited Custom Apps",
      FIELD2: (
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color={theme.palette.success.main}
          component={Check}
        />
      ),
      FIELD3: "-",
    },
  ];
  return (
    <>
      <AuthHeader title="Choose the best plan for your business" />
      {/* Page content */}
      <Container
        component={Box}
        maxWidth="xl"
        marginTop="-8rem"
        paddingBottom="3rem"
        position="relative"
        zIndex="101"
      >
        <Box component={Grid} container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Box
              marginBottom="3rem"
              className={clsx(classes.cardGroup, classes.flexMdRow)}
            >
              <CardPricing />
              <CardPricingGradient />
            </Box>
          </Grid>
        </Box>
        <Box
          display="flex"
          paddingLeft="1rem"
          paddingRight="1rem"
          marginTop="3rem"
          className={classes.justifyContentLgCenter}
          color={theme.palette.white.main}
          alignItems="center"
        >
          <div>
            <Avatar className={classes.avatarRoot}>
              <Box
                component={Business}
                color={theme.palette.primary.main}
                width="1.5rem!important"
                height="1.5rem!important"
              />
            </Avatar>
          </div>
          <Grid item xs={12} lg={6}>
            <Box
              component="p"
              fontWeight="300"
              lineHeight="1.7"
              marginBottom="1rem"
              marginTop="1rem"
            >
              <strong>The Arctic Ocean</strong> freezes every winter and much of
              the sea-ice then thaws every summer, and that process will
              continue whatever.
            </Box>
          </Grid>
        </Box>
        <Grid container component={Box} justifyContent="center">
          <Grid item xs={12} lg={10}>
            <TableContainer component={Box} marginTop="3rem">
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell algin="left" className={classes.tableCellHead}>
                      Features
                    </TableCell>
                    <TableCell align="center" className={classes.tableCellHead}>
                      Bravo Pack
                    </TableCell>
                    <TableCell align="center" className={classes.tableCellHead}>
                      Alpha Pack
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((prop, key) => (
                    <TableRow key={key} className={classes.tableRowBody}>
                      <TableCell algin="left" className={classes.tableCellBody}>
                        {prop.FIELD1}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableCellBody}
                      >
                        {prop.FIELD2}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableCellBody}
                      >
                        {prop.FIELD3}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Pricing;
