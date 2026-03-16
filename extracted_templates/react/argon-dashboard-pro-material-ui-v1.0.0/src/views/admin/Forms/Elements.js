import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
// @material-ui/icons components
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/elements.js";
import componentStylesForms from "assets/theme/components/forms.js";

const useStyles = makeStyles(componentStyles);
const useStylesForms = makeStyles(componentStylesForms);

const Elements = () => {
  const classes = { ...useStyles(), ...useStylesForms() };
  const theme = useTheme();
  return (
    <>
      <SimpleHeader section="Elements" subsection="Forms" />
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
            title="Form group in grid"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={4}>
                <FormGroup>
                  <FormLabel>One of three cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of three cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormGroup>
                  <FormLabel>One of three cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of three cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormGroup>
                  <FormLabel>One of three cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of three cols"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <FormGroup>
                  <FormLabel>One of four cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of four cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormGroup>
                  <FormLabel>One of four cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of four cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormGroup>
                  <FormLabel>One of four cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of four cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormGroup>
                  <FormLabel>One of four cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of four cols"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FormLabel>One of two cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of two cols"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FormLabel>One of two cols</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="One of two cols"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid
          container
          component={Box}
          marginBottom="39px"
          justifyContent="center"
        >
          <Grid item xs={12} lg={6}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Form controls"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <FormGroup>
                  <FormLabel>Email address</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="email"
                    placeholder="Default input"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Example select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select defaultValue={1} IconComponent={KeyboardArrowDown}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Example multiple select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      multiple
                      defaultValue={[1]}
                      IconComponent={KeyboardArrowDown}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Example textarea</FormLabel>
                  <OutlinedInput fullWidth multiline rows="4" />
                </FormGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="HTML5 inputs"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Text
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      defaultValue="John Snow"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Search
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="search"
                      defaultValue="Tell me your secret ..."
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Email
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="email"
                      defaultValue="argon@example.com"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Url
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="url"
                      defaultValue="https://www.creative-tim.com"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Phone
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="tel"
                      defaultValue="40-(770)-888-444"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Password
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="password"
                      defaultValue="password"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Number
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput fullWidth type="number" defaultValue={23} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Datetime
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="datetime-local"
                      defaultValue="2021-11-23T10:30:00"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Date
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="date"
                      defaultValue="2021-11-23"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Month
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="month"
                      defaultValue="2021-11"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Week
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="week"
                      defaultValue="2021-W23"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Time
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="time"
                      defaultValue="10:30:00"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  marginBottom="1.5rem"
                >
                  <Grid item xs={12} md={2}>
                    <FormLabel component={Box} marginBottom="0!important">
                      Color
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <OutlinedInput
                      fullWidth
                      type="color"
                      defaultValue={theme.palette.primary.main}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
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
                <FormGroup>
                  <FormLabel>Large input</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="text"
                    className={classes.inputLarge}
                    placeholder="Large input"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Default input</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="text"
                    placeholder="Default input"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Small input</FormLabel>
                  <OutlinedInput
                    fullWidth
                    type="text"
                    className={classes.inputSmall}
                    placeholder="Small input"
                  />
                </FormGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Text inputs"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <FormGroup>
                  <FormLabel>Basic textarea</FormLabel>
                  <OutlinedInput fullWidth multiline rows="4" />
                </FormGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Select"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <FormGroup>
                  <FormLabel>Basic select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select defaultValue={1} IconComponent={KeyboardArrowDown}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Disabled basic select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      defaultValue={1}
                      IconComponent={KeyboardArrowDown}
                      disabled
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Multiple select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      multiple
                      defaultValue={[1]}
                      IconComponent={KeyboardArrowDown}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Disabled multiple select</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      multiple
                      defaultValue={[1]}
                      IconComponent={KeyboardArrowDown}
                      disabled
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="File browser"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <FormGroup>
                  <OutlinedInput
                    fullWidth
                    type="file"
                    placeholder="Default input"
                    endAdornment={
                      <InputAdornment position="end">Browse</InputAdornment>
                    }
                  />
                </FormGroup>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Checkboxes and radios"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Unchecked"
                      labelPlacement="end"
                      classes={{
                        root: classes.formControlCheckboxLabelRoot,
                        label: classes.formControlCheckboxLabelLabel,
                      }}
                    />
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" defaultChecked />}
                      label="Checked"
                      labelPlacement="end"
                      classes={{
                        root: classes.formControlCheckboxLabelRoot,
                        label: classes.formControlCheckboxLabelLabel,
                      }}
                    />
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" disabled />}
                      label="Unchecked"
                      labelPlacement="end"
                      classes={{
                        root: classes.formControlCheckboxLabelRoot,
                        label: classes.formControlCheckboxLabelLabel,
                      }}
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox color="primary" defaultChecked disabled />
                      }
                      label="Checked"
                      labelPlacement="end"
                      classes={{
                        root: classes.formControlCheckboxLabelRoot,
                        label: classes.formControlCheckboxLabelLabel,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioGroup
                      aria-label="gender"
                      name="example-radio"
                      defaultValue="2"
                      className={classes.mb0}
                    >
                      <FormControlLabel
                        control={<Radio color="primary" />}
                        label="Unchecked"
                        value="1"
                        labelPlacement="end"
                        classes={{
                          root: classes.formControlCheckboxLabelRoot,
                          label: classes.formControlCheckboxLabelLabel,
                        }}
                      />
                      <FormControlLabel
                        control={<Radio color="primary" />}
                        label="Checked"
                        labelPlacement="end"
                        value="2"
                        classes={{
                          root: classes.formControlCheckboxLabelRoot,
                          label: classes.formControlCheckboxLabelLabel,
                        }}
                      />
                    </RadioGroup>
                    <RadioGroup
                      aria-label="gender-2"
                      name="example-radio-2"
                      defaultValue="2"
                    >
                      <FormControlLabel
                        control={<Radio color="primary" disabled />}
                        label="Unchecked"
                        value="1"
                        labelPlacement="end"
                        classes={{
                          root: classes.formControlCheckboxLabelRoot,
                          label: classes.formControlCheckboxLabelLabel,
                        }}
                      />
                      <FormControlLabel
                        control={<Radio color="primary" disabled />}
                        label="Checked"
                        labelPlacement="end"
                        value="2"
                        classes={{
                          root: classes.formControlCheckboxLabelRoot,
                          label: classes.formControlCheckboxLabelLabel,
                        }}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Elements;
