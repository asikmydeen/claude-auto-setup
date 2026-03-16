import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// @material-ui/icons components
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/validation.js";
import componentStylesForms from "assets/theme/components/forms.js";

const useStyles = makeStyles(componentStyles);
const useStylesForms = makeStyles(componentStylesForms);

const Validation = () => {
  const classes = { ...useStyles(), ...useStylesForms() };
  const theme = useTheme();
  const [
    customStylesFirstNameValue,
    setCustomStylesFirstNameValue,
  ] = React.useState("Mark");
  const [
    customStylesFirstNameValidation,
    setCustomStylesFirstNameValidation,
  ] = React.useState(null);
  const [
    customStylesLastNameValue,
    setCustomStylesLastNameValue,
  ] = React.useState("Otto");
  const [
    customStylesLastNameValidation,
    setCustomStylesLastNameValidation,
  ] = React.useState(null);
  const [
    customStylesUsernameValue,
    setCustomStylesUsernameValue,
  ] = React.useState("");
  const [
    customStylesUsernameValidation,
    setCustomStylesUsernameValidation,
  ] = React.useState(null);
  const [customStylesCityValue, setCustomStylesCityValue] = React.useState("");
  const [
    customStylesCityValidation,
    setCustomStylesCityValidation,
  ] = React.useState(null);
  const [customStylesStateValue, setCustomStylesStateValue] = React.useState(
    ""
  );
  const [
    customStylesStateValidation,
    setCustomStylesStateValidation,
  ] = React.useState(null);
  const [customStylesZipValue, setCustomStylesZipValue] = React.useState("");
  const [
    customStylesZipValidation,
    setCustomStylesZipValidation,
  ] = React.useState(null);
  const [
    customStylesCheckboxValue,
    setCustomStylesCheckboxValue,
  ] = React.useState(false);
  const [
    customStylesCheckboxValidation,
    setCustomStylesCheckboxValidation,
  ] = React.useState(null);
  return (
    <>
      <SimpleHeader section="Validation" subsection="Forms" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        {/* Table */}
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="Custom styles"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Box
                  component="p"
                  marginBottom="0"
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1rem"
                  marginTop="0"
                  data-dz-size
                >
                  For custom form validation messages, you’ll need to add the
                  novalidate boolean attribute to your{" "}
                  <Box
                    color={theme.palette.error.light}
                    component="span"
                  >{`<form>`}</Box>
                  . This disables the browser default feedback tooltips, but
                  still provides access to the form validation APIs in
                  JavaScript.
                  <br />
                  <br />
                  When attempting to submit, you’ll see the{" "}
                  <Box color={theme.palette.error.light} component="span">
                    invalid
                  </Box>{" "}
                  and{" "}
                  <Box color={theme.palette.error.light} component="span">
                    valid
                  </Box>{" "}
                  styles applied to your form controls.
                </Box>
              </Grid>
            </Grid>
            <Box
              component={Divider}
              marginTop="2rem!important"
              marginBottom="2rem!important"
            />
            <form noValidate>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>First name</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="First name"
                      value={customStylesFirstNameValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesFirstNameValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesFirstNameValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesFirstNameValidation("invalid");
                        } else {
                          setCustomStylesFirstNameValidation("valid");
                        }
                        setCustomStylesFirstNameValue(event.target.value);
                      }}
                    />
                    {customStylesFirstNameValidation === "valid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.success.main + "!important"}
                      >
                        Looks good!
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Last name</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Last name"
                      value={customStylesLastNameValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesLastNameValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesLastNameValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesLastNameValidation("invalid");
                        } else {
                          setCustomStylesLastNameValidation("valid");
                        }
                        setCustomStylesLastNameValue(event.target.value);
                      }}
                    />
                    {customStylesLastNameValidation === "valid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.success.main + "!important"}
                      >
                        Looks good!
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Last name"
                      value={customStylesUsernameValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesUsernameValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesUsernameValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesUsernameValidation("invalid");
                        } else {
                          setCustomStylesUsernameValidation("valid");
                        }
                        setCustomStylesUsernameValue(event.target.value);
                      }}
                    />
                    {customStylesUsernameValidation === "invalid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.warning.main + "!important"}
                      >
                        Please choose a username.
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="City"
                      value={customStylesCityValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesCityValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesCityValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesCityValidation("invalid");
                        } else {
                          setCustomStylesCityValidation("valid");
                        }
                        setCustomStylesCityValue(event.target.value);
                      }}
                    />
                    {customStylesCityValidation === "invalid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.warning.main + "!important"}
                      >
                        Please provide a valid city.
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>State</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="State"
                      value={customStylesStateValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesStateValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesStateValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesStateValidation("invalid");
                        } else {
                          setCustomStylesStateValidation("valid");
                        }
                        setCustomStylesStateValue(event.target.value);
                      }}
                    />
                    {customStylesStateValidation === "invalid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.warning.main + "!important"}
                      >
                        Please provide a valid state.
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Zip</FormLabel>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Zip"
                      value={customStylesZipValue}
                      classes={{
                        notchedOutline: clsx({
                          [classes.borderWarning]:
                            customStylesZipValidation === "invalid",
                          [classes.borderSuccess]:
                            customStylesZipValidation === "valid",
                        }),
                      }}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setCustomStylesZipValidation("invalid");
                        } else {
                          setCustomStylesZipValidation("valid");
                        }
                        setCustomStylesZipValue(event.target.value);
                      }}
                    />
                    {customStylesZipValidation === "invalid" && (
                      <FormHelperText
                        component={Box}
                        color={theme.palette.warning.main + "!important"}
                      >
                        Please provide a valid zip.
                      </FormHelperText>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
              <FormGroup>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      color="primary"
                      value={customStylesCheckboxValue}
                      onChange={() => {
                        if (!customStylesCheckboxValue) {
                          setCustomStylesCheckboxValidation("valid");
                        }
                        setCustomStylesCheckboxValue(
                          !customStylesCheckboxValue
                        );
                      }}
                      classes={{
                        root: clsx({
                          [classes.textWarning]:
                            customStylesCheckboxValidation === "invalid",
                        }),
                      }}
                    />
                  }
                  label="Agree to terms and conditions"
                  labelPlacement="end"
                  classes={{
                    root: classes.formControlCheckboxLabelRoot,
                    label: clsx(classes.formControlCheckboxLabelLabel, {
                      [classes.textWarning]:
                        customStylesCheckboxValidation === "invalid",
                    }),
                  }}
                />
                {customStylesCheckboxValidation === "invalid" && (
                  <FormHelperText
                    component={Box}
                    marginTop="-.5rem!important"
                    marginLeft="1.875rem!important"
                    color={theme.palette.warning.main + "!important"}
                  >
                    You must agree before submitting.
                  </FormHelperText>
                )}
              </FormGroup>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  if (customStylesFirstNameValue === "") {
                    setCustomStylesFirstNameValidation("invalid");
                  } else {
                    setCustomStylesFirstNameValidation("valid");
                  }
                  if (customStylesLastNameValue === "") {
                    setCustomStylesLastNameValidation("invalid");
                  } else {
                    setCustomStylesLastNameValidation("valid");
                  }
                  if (customStylesUsernameValue === "") {
                    setCustomStylesUsernameValidation("invalid");
                  } else {
                    setCustomStylesUsernameValidation("valid");
                  }
                  if (customStylesCityValue === "") {
                    setCustomStylesCityValidation("invalid");
                  } else {
                    setCustomStylesCityValidation("valid");
                  }
                  if (customStylesStateValue === "") {
                    setCustomStylesStateValidation("invalid");
                  } else {
                    setCustomStylesStateValidation("valid");
                  }
                  if (customStylesZipValue === "") {
                    setCustomStylesZipValidation("invalid");
                  } else {
                    setCustomStylesZipValidation("valid");
                  }
                  if (!customStylesCheckboxValue) {
                    setCustomStylesCheckboxValidation("invalid");
                  } else {
                    setCustomStylesCheckboxValidation("valid");
                  }
                }}
              >
                Submit form
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="Browser defaults"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Box
                  component="p"
                  marginBottom="0"
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1rem"
                  marginTop="0"
                  data-dz-size
                >
                  Not interested in custom validation feedback messages or
                  writing JavaScript to change form behaviors? All good, you can
                  use the browser defaults. Try submitting the form below.
                  Depending on your browser and OS, you’ll see a slightly
                  different style of feedback.
                  <br />
                  <br />
                  While these feedback styles cannot be styled with CSS, you can
                  still customize the feedback text through JavaScript.
                </Box>
              </Grid>
            </Grid>
            <Box
              component={Divider}
              marginTop="2rem!important"
              marginBottom="2rem!important"
            />
            <form>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>First name</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="First name"
                      defaultValue="Mark"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Last name</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Last name"
                      defaultValue="Otto"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Last name"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="City"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>State</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="State"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Zip</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Zip"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <FormGroup>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="Agree to terms and conditions"
                  labelPlacement="end"
                  classes={{
                    root: classes.formControlCheckboxLabelRoot,
                    label: classes.formControlCheckboxLabelLabel,
                  }}
                />
              </FormGroup>
              <Button color="primary" variant="contained" type="submit">
                Submit form
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="Server side"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Box
                  component="p"
                  marginBottom="0"
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1rem"
                  marginTop="0"
                  data-dz-size
                >
                  We recommend using client side validation, but in case you
                  require server side, you can indicate invalid and valid form
                  fields with{" "}
                  <Box color={theme.palette.error.light} component="span">
                    classes.borderSuccess
                  </Box>{" "}
                  and{" "}
                  <Box color={theme.palette.error.light} component="span">
                    classes.borderWarning
                  </Box>
                  . Note that{" "}
                  <Box color={theme.palette.error.light} component="span">
                    theme.palette.error.light
                  </Box>{" "}
                  and{" "}
                  <Box color={theme.palette.error.light} component="span">
                    theme.palette.success.main
                  </Box>{" "}
                  are also supported.
                </Box>
              </Grid>
            </Grid>
            <Box
              component={Divider}
              marginTop="2rem!important"
              marginBottom="2rem!important"
            />
            <form noValidate>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>First name</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="First name"
                      defaultValue="Mark"
                      classes={{
                        notchedOutline: classes.borderSuccess,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.success.main + "!important"}
                    >
                      Looks good!
                    </FormHelperText>
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Last name</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Last name"
                      defaultValue="Otto"
                      classes={{
                        notchedOutline: classes.borderSuccess,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.success.main + "!important"}
                    >
                      Looks good!
                    </FormHelperText>
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Last name"
                      classes={{
                        notchedOutline: classes.borderWarning,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.warning.main + "!important"}
                    >
                      Please choose a username.
                    </FormHelperText>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid
                container
                component={Box}
                marginRight="-5px!important"
                marginLeft="-5px!important"
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  component={Box}
                  paddingRight="5px!important"
                  paddingLeft="5px!important"
                  marginBottom="1rem!important"
                >
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="City"
                      classes={{
                        notchedOutline: classes.borderWarning,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.warning.main + "!important"}
                    >
                      Please provide a valid city.
                    </FormHelperText>
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>State</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="State"
                      classes={{
                        notchedOutline: classes.borderWarning,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.warning.main + "!important"}
                    >
                      Please provide a valid state.
                    </FormHelperText>
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  component={Box}
                  paddingRight="-5px!important"
                  paddingLeft="-5px!important"
                  marginBottom="1rem"
                >
                  <FormGroup>
                    <FormLabel>Zip</FormLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      type="text"
                      placeholder="Zip"
                      classes={{
                        notchedOutline: classes.borderWarning,
                      }}
                    />

                    <FormHelperText
                      component={Box}
                      color={theme.palette.warning.main + "!important"}
                    >
                      Please provide a valid zip.
                    </FormHelperText>
                  </FormGroup>
                </Grid>
              </Grid>
              <FormGroup>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      color="primary"
                      classes={{
                        root: classes.textWarning,
                      }}
                    />
                  }
                  label="Agree to terms and conditions"
                  labelPlacement="end"
                  classes={{
                    root: classes.formControlCheckboxLabelRoot,
                    label: clsx(
                      classes.formControlCheckboxLabelLabel,
                      classes.textWarning
                    ),
                  }}
                />
                <FormHelperText
                  component={Box}
                  marginTop="-.5rem!important"
                  marginLeft="1.875rem!important"
                  color={theme.palette.warning.main + "!important"}
                >
                  You must agree before submitting.
                </FormHelperText>
              </FormGroup>
              <Button color="primary" variant="contained" type="submit">
                Submit form
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Validation;
