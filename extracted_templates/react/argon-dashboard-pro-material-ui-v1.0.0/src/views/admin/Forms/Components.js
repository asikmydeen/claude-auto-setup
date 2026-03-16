import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// plugin for text editor
import Quill from "quill";
// plugin for drag-and-drop files
import Dropzone from "dropzone";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
import Autocomplete from "@material-ui/lab/Autocomplete";
// @material-ui/icons components
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import LocationOn from "@material-ui/icons/LocationOn";
import Visibility from "@material-ui/icons/Visibility";
import CreditCard from "@material-ui/icons/CreditCard";
import Public from "@material-ui/icons/Public";
import Call from "@material-ui/icons/Call";
import DateRange from "@material-ui/icons/DateRange";
import Delete from "@material-ui/icons/Delete";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TagsInput from "components/TagsInput/TagsInput.js";

import componentStyles from "assets/theme/views/admin/components.js";
import componentStylesButtons from "assets/theme/components/button.js";
import componentStylesSwitch from "assets/theme/components/switch.js";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(componentStylesButtons);
const useStylesSwitch = makeStyles(componentStylesSwitch);

const dropdownOptions = [
  { value: 1, label: "Alerts" },
  { value: 2, label: "Badges" },
  { value: 3, label: "Buttons" },
  { value: 4, label: "Forms" },
  { value: 5, label: "Modals" },
];

const Components = () => {
  const classes = {
    ...useStyles(),
    ...useStylesButtons(),
    ...useStylesSwitch(),
  };
  const theme = useTheme();
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sliderSingle, setSliderSingle] = React.useState(100.0);
  const [sliderDouble, setSliderDouble] = React.useState([200.0, 400.0]);
  const [tagsInputState, setTagsInputState] = React.useState([
    "Bucharest",
    "Cluj",
    "Iasi",
    "Timisoara",
    "Piatra Neamt",
  ]);
  const handleTagsinput = (tagsinput) => {
    setTagsInputState(tagsinput);
  };
  // quill init
  React.useEffect(() => {
    if (
      document.querySelector('[data-toggle="quill"]').className !==
      "ql-container ql-snow"
    ) {
      new Quill(document.querySelector('[data-toggle="quill"]'), {
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["link", "blockquote", "code", "image"],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
          ],
        },
        placeholder: "Quill WYSIWYG",
        theme: "snow",
      });
    }
  }, []);
  // single file drag-and-drop dropzone init
  React.useEffect(() => {
    if (
      !document
        .getElementById("dropzone-single")
        .classList.contains("dz-clickable")
    ) {
      Dropzone.autoDiscover = false;
      // this variable is to delete the previous image from the dropzone state
      // it is just to make the HTML DOM a bit better, and keep it light
      let currentSingleFile = undefined;
      // single dropzone file - accepts only images
      let singleDropzone = new Dropzone(
        document.getElementById("dropzone-single"),
        {
          url: "/",
          thumbnailWidth: null,
          thumbnailHeight: null,
          previewsContainer: document.getElementsByClassName(
            "dz-preview-single"
          )[0],
          previewTemplate: document.getElementsByClassName(
            "dz-preview-single"
          )[0].innerHTML,
          maxFiles: 1,
          acceptedFiles: "image/*",
          init: function () {
            this.on("addedfile", function (file) {
              if (currentSingleFile) {
                this.removeFile(currentSingleFile);
              }
              currentSingleFile = file;
            });
          },
        }
      );
      document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
      return function cleanup() {
        singleDropzone.destroy();
      };
    }
  }, []);
  // multiple file drag-and-drop dropzone init
  React.useEffect(() => {
    if (
      !document
        .getElementById("dropzone-multiple")
        .classList.contains("dz-clickable")
    ) {
      Dropzone.autoDiscover = false;
      // this variable is to delete the previous image from the dropzone state
      // it is just to make the HTML DOM a bit better, and keep it light
      let currentMultipleFile = undefined;
      // multiple dropzone file - accepts any type of file
      new Dropzone(document.getElementById("dropzone-multiple"), {
        url: "https://",
        thumbnailWidth: null,
        thumbnailHeight: null,
        previewsContainer: document.getElementsByClassName(
          "dz-preview-multiple"
        )[0],
        previewTemplate: document.getElementsByClassName(
          "dz-preview-multiple"
        )[0].innerHTML,
        maxFiles: null,
        acceptedFiles: null,
        init: function () {
          this.on("addedfile", function (file) {
            if (currentMultipleFile) {
            }
            currentMultipleFile = file;
          });
        },
      });
      document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
    }
  }, []);
  // react-datetime change handler for range pickers
  const handleReactDatetimeChange = (who, date) => {
    if (
      startDate &&
      who === "endDate" &&
      new Date(startDate._d + "") > new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else if (
      endDate &&
      who === "startDate" &&
      new Date(endDate._d + "") < new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else {
      if (who === "startDate") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };
  // this function adds on the day tag of the date picker
  // middle-date className which means that this day will have no border radius
  // start-date className which means that this day will only have left border radius
  // end-date className which means that this day will only have right border radius
  // this way, the selected dates will look nice and will only be rounded at the ends
  const getClassNameReactDatetimeDays = (date) => {
    if (startDate && endDate) {
    }
    if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
      if (
        new Date(endDate._d + "") > new Date(date._d + "") &&
        new Date(startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };
  return (
    <>
      <SimpleHeader section="Components" subsection="Forms" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        {/* Table */}
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
                title="Input groups"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        placeholder="Your name"
                        startAdornment={
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="email"
                        placeholder="Email address"
                        startAdornment={
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        placeholder="Location"
                        endAdornment={
                          <InputAdornment position="end">
                            <LocationOn />
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="password"
                        placeholder="Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <Visibility />
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        placeholder="Payment method"
                        startAdornment={
                          <InputAdornment position="start">
                            <CreditCard />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <Box fontSize=".875rem">USD</Box>
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        placeholder="Phone number"
                        startAdornment={
                          <InputAdornment position="start">
                            <Public />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <Call />
                          </InputAdornment>
                        }
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Dropdowns"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Autocomplete
                  id="combo-box-demo"
                  options={dropdownOptions}
                  getOptionLabel={(option) => option.label}
                  closeIcon={null}
                  popupIcon={
                    <Box
                      component={KeyboardArrowDown}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    />
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Combo box"
                      variant="outlined"
                    />
                  )}
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Datepicker"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <FormLabel>Datepicker</FormLabel>
                      <ReactDatetime
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Date Picker Here",
                          className: "",
                        }}
                        renderInput={(dateInputProps, open, close) => (
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <OutlinedInput
                              onBlur={close}
                              onFocus={open}
                              {...dateInputProps}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Box
                                    component={DateRange}
                                    marginRight=".5rem"
                                  />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <FormLabel>Start date</FormLabel>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Date Picker Here",
                          className: "",
                        }}
                        value={startDate}
                        timeFormat={false}
                        onChange={(e) =>
                          handleReactDatetimeChange("startDate", e)
                        }
                        renderDay={(props, currentDate) => {
                          let classes = props.className;
                          classes += getClassNameReactDatetimeDays(currentDate);
                          return (
                            <td {...props} className={classes}>
                              {currentDate.date()}
                            </td>
                          );
                        }}
                        renderInput={(dateInputProps) => (
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <OutlinedInput
                              {...dateInputProps}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Box
                                    component={DateRange}
                                    marginRight=".5rem"
                                  />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormGroup>
                      <FormLabel>End date</FormLabel>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Date Picker Here",
                          className: "",
                        }}
                        value={endDate}
                        timeFormat={false}
                        onChange={(e) =>
                          handleReactDatetimeChange("endDate", e)
                        }
                        renderDay={(props, currentDate) => {
                          let classes = props.className;
                          classes += getClassNameReactDatetimeDays(currentDate);
                          return (
                            <td {...props} className={classes}>
                              {currentDate.date()}
                            </td>
                          );
                        }}
                        renderInput={(dateInputProps) => (
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <OutlinedInput
                              {...dateInputProps}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Box
                                    component={DateRange}
                                    marginRight=".5rem"
                                  />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Text editor"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <div
                  data-quill-placeholder="Quill WYSIWYG"
                  data-toggle="quill"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Tags"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <TagsInput
                  className="bootstrap-tagsinput"
                  onChange={handleTagsinput}
                  tagProps={{ className: "tag badge mr-1" }}
                  value={tagsInputState}
                  inputProps={{
                    className: "",
                    placeholder: "",
                  }}
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Toggle buttons"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Switch name="checkedA" color="primary" />{" "}
                <Switch name="checkedA" color="primary" defaultChecked />{" "}
                <Switch name="checkedA" defaultChecked />{" "}
                <Switch
                  name="checkedA"
                  defaultChecked
                  classes={{
                    thumb: classes.errorSwitchThumb,
                    track: classes.errorSwitchTrack,
                    checked: classes.checkedSwitch,
                  }}
                />{" "}
                <Switch
                  name="checkedA"
                  defaultChecked
                  classes={{
                    thumb: classes.warningSwitchThumb,
                    track: classes.warningSwitchTrack,
                    checked: classes.checkedSwitch,
                  }}
                />{" "}
                <Switch
                  name="checkedA"
                  defaultChecked
                  classes={{
                    thumb: classes.successSwitchThumb,
                    track: classes.successSwitchTrack,
                    checked: classes.checkedSwitch,
                  }}
                />{" "}
                <Switch
                  name="checkedA"
                  defaultChecked
                  classes={{
                    thumb: classes.infoSwitchThumb,
                    track: classes.infoSwitchTrack,
                    checked: classes.checkedSwitch,
                  }}
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Sliders"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Slider
                  min={100.0}
                  max={500.0}
                  step={0.01}
                  value={sliderSingle}
                  onChange={(event, value) => setSliderSingle(value)}
                />
                <Grid container component={Box} marginTop="1rem">
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      fontSize=".75rem"
                      fontWeight="500"
                      color={theme.palette.white.main}
                      borderRadius="10px"
                      padding=".4em .8em .3em .85em"
                      className={classes.sliderBadge}
                    >
                      {sliderSingle.toFixed(2)}
                    </Box>
                  </Grid>
                </Grid>
                <Box marginTop="3rem"></Box>
                <Slider
                  min={100.0}
                  max={500.0}
                  value={sliderDouble}
                  step={0.01}
                  onChange={(event, value) => setSliderDouble(value)}
                />
                <Grid container component={Box} marginTop="1rem">
                  <Grid item xs={6}>
                    <Box
                      component="span"
                      fontSize=".75rem"
                      fontWeight="500"
                      color={theme.palette.white.main}
                      borderRadius="10px"
                      padding=".4em .8em .3em .85em"
                      className={classes.sliderBadge}
                    >
                      {sliderDouble[0].toFixed(2)}
                    </Box>
                  </Grid>
                  <Grid item xs={6} component={Box} textAlign="right">
                    <Box
                      component="span"
                      fontSize=".75rem"
                      fontWeight="500"
                      color={theme.palette.white.main}
                      borderRadius="10px"
                      padding=".4em .8em .3em .85em"
                      className={classes.sliderBadge}
                    >
                      {sliderDouble[1].toFixed(2)}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Dropzone"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <div
                  className="dropzone dropzone-single mb-3"
                  id="dropzone-single"
                >
                  <div className="fallback">
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="projectCoverUploads"
                        type="file"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="projectCoverUploads"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="dz-preview dz-preview-single">
                    <div className="dz-preview-cover">
                      <img
                        alt="..."
                        className="dz-preview-img"
                        data-dz-thumbnail=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  id="dropzone-multiple"
                  className="dropzone dropzone-multiple"
                  data-toggle="dropzone"
                  data-dropzone-multiple
                  data-dropzone-url="http://"
                >
                  <div className="fallback">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFileUploadMultiple"
                        multiple
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileUploadMultiple"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <List className="dz-preview dz-preview-multiple">
                    <ListItem>
                      <Grid container component={Box} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar
                            src="..."
                            alt="..."
                            classes={{
                              root: classes.dropzoneAvatarRoot,
                              img: classes.dropzoneAvatarImg,
                            }}
                            imgProps={{
                              "data-dz-thumbnail": true,
                            }}
                          ></Avatar>
                        </Grid>
                        <Grid
                          item
                          component={Box}
                          maxWidth="100%"
                          flexBasis="0"
                          flexGrow="1"
                        >
                          <Typography
                            variant="h4"
                            component="h4"
                            data-dz-name
                          ></Typography>
                          <Box
                            component="p"
                            marginBottom="0"
                            fontWeight="300"
                            lineHeight="1.7"
                            fontSize="1rem"
                            marginTop="0"
                            data-dz-size
                          >
                            ...
                          </Box>
                        </Grid>
                        <Grid item xs="auto">
                          <Button
                            size="small"
                            data-dz-remove
                            classes={{
                              root:
                                classes.buttonContainedError +
                                " " +
                                classes.buttonIconOnly,
                            }}
                          >
                            <Box
                              component={Delete}
                              position="relative"
                              top="-2px"
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Components;
