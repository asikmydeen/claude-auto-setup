import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fade from "@material-ui/core/Fade";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Notifications from "@material-ui/icons/Notifications";
import ThumbUp from "@material-ui/icons/ThumbUp";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import hexToRgb from "assets/theme/hex-to-rgb.js";
import componentStyles from "assets/theme/views/admin/notifications.js";
import componentStylesButtons from "assets/theme/components/button.js";
import componentStylesSnackbar from "assets/theme/components/snackbar.js";
import componentStylesDialog from "assets/theme/components/dialog.js";
const useStyles = makeStyles(componentStyles);
const useStylesDialog = makeStyles(componentStylesDialog);
const useStylesSnackbar = makeStyles(componentStylesSnackbar);
const useStylesButtons = makeStyles(componentStylesButtons);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const NotificationsView = () => {
  const classes = {
    ...useStyles(),
    ...useStylesButtons(),
    ...useStylesSnackbar(),
    ...useStylesDialog(),
  };
  const theme = useTheme();
  const [alert, setalert] = React.useState(false);
  const [openAlertDefault, setOpenAlertDefault] = React.useState(false);
  const handleClickAlertDefault = () => {
    setOpenAlertDefault(true);
  };
  const handleCloseAlertDefault = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertDefault(false);
  };
  const [openAlertPrimary, setOpenAlertPrimary] = React.useState(false);
  const handleClickAlertPrimary = () => {
    setOpenAlertPrimary(true);
  };
  const handleCloseAlertPrimary = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertPrimary(false);
  };
  const [openAlertSecondary, setOpenAlertSecondary] = React.useState(false);
  const handleClickAlertSecondary = () => {
    setOpenAlertSecondary(true);
  };
  const handleCloseAlertSecondary = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSecondary(false);
  };
  const [openAlertInfo, setOpenAlertInfo] = React.useState(false);
  const handleClickAlertInfo = () => {
    setOpenAlertInfo(true);
  };
  const handleCloseAlertInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertInfo(false);
  };
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);
  const handleClickAlertSuccess = () => {
    setOpenAlertSuccess(true);
  };
  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSuccess(false);
  };
  const [openAlertWarning, setOpenAlertWarning] = React.useState(false);
  const handleClickAlertWarning = () => {
    setOpenAlertWarning(true);
  };
  const handleCloseAlertWarning = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertWarning(false);
  };
  const [openAlertError, setOpenAlertError] = React.useState(false);
  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };
  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };
  const basicAlert = () => {
    setalert(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Here's a message!"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        btnSize=""
        confirmBtnStyle={{
          marginRight: undefined,
          borderColor: undefined,
          boxShadow: undefined,
        }}
        text="A few words about this sweet alert ..."
      >
        A few words about this sweet alert ...
      </ReactBSAlert>
    );
  };
  const infoAlert = () => {
    setalert(
      <ReactBSAlert
        info
        style={{ display: "block", marginTop: "-100px" }}
        title="Info"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="info"
        confirmBtnText="Ok"
        btnSize=""
        confirmBtnStyle={{
          marginRight: undefined,
          borderColor: undefined,
          boxShadow: undefined,
        }}
      >
        A few words about this sweet alert ...
      </ReactBSAlert>
    );
  };
  const successAlert = () => {
    setalert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="success"
        confirmBtnText="Ok"
        btnSize=""
        confirmBtnStyle={{
          marginRight: undefined,
          borderColor: undefined,
          boxShadow: undefined,
        }}
      >
        A few words about this sweet alert ...
      </ReactBSAlert>
    );
  };
  const warningAlert = () => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Warning"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
        confirmBtnStyle={{
          marginRight: undefined,
          borderColor: undefined,
          boxShadow: undefined,
        }}
      >
        A few words about this sweet alert ...
      </ReactBSAlert>
    );
  };
  const questionAlert = () => {
    setalert(
      <ReactBSAlert
        custom
        style={{ display: "block", marginTop: "-100px" }}
        title="Question"
        customIcon={
          <div
            className="swal2-icon swal2-question swal2-animate-question-icon"
            style={{ display: "flex" }}
          >
            <span className="swal2-icon-text">?</span>
          </div>
        }
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="default"
        confirmBtnText="Ok"
        btnSize=""
      >
        A few words about this sweet alert ...
      </ReactBSAlert>
    );
  };
  const [openDefault, setOpenDefault] = React.useState(false);
  const handleClickOpenDefault = () => {
    setOpenDefault(true);
  };
  const handleCloseDefault = () => {
    setOpenDefault(false);
  };
  const [openNotification, setOpenNotification] = React.useState(false);
  const handleClickOpenNotification = () => {
    setOpenNotification(true);
  };
  const handleCloseNotification = () => {
    setOpenNotification(false);
  };
  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const [fadeDefault, setFadeDefault] = React.useState(true);
  const [showDefault, setShowDefault] = React.useState(true);
  const [fadePrimary, setFadePrimary] = React.useState(true);
  const [showPrimary, setShowPrimary] = React.useState(true);
  const [fadeSecondary, setFadeSecondary] = React.useState(true);
  const [showSecondary, setShowSecondary] = React.useState(true);
  const [fadeInfo, setFadeInfo] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(true);
  const [fadeSuccess, setFadeSuccess] = React.useState(true);
  const [showSuccess, setShowSuccess] = React.useState(true);
  const [fadeError, setFadeError] = React.useState(true);
  const [showError, setShowError] = React.useState(true);
  const [fadeWarning, setFadeWarning] = React.useState(true);
  const [showWarning, setShowWarning] = React.useState(true);
  const defaultSnackbarRootClasses = { root: classes.defaultSnackbar };
  const primarySnackbarRootClasses = { root: classes.primarySnackbar };
  const secondarySnackbarRootClasses = { root: classes.secondarySnackbar };
  const infoSnackbarRootClasses = { root: classes.infoSnackbar };
  const successSnackbarRootClasses = { root: classes.successSnackbar };
  const errorSnackbarRootClasses = { root: classes.errorSnackbar };
  const warningSnackbarRootClasses = { root: classes.warningSnackbar };
  return (
    <>
      {alert}
      <SimpleHeader section="Notifications" subsection="Components" />
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
          <Grid item xs={12} lg={8}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Alerts"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                {showDefault && (
                  <Fade in={fadeDefault} onExited={() => setShowDefault(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={defaultSnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeDefault(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Default!
                            </Box>
                            This is a default alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showPrimary && (
                  <Fade in={fadePrimary} onExited={() => setShowPrimary(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={primarySnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadePrimary(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Primary!
                            </Box>
                            This is a primary alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showSecondary && (
                  <Fade
                    in={fadeSecondary}
                    onExited={() => setShowSecondary(false)}
                  >
                    <SnackbarContent
                      elevation={0}
                      classes={secondarySnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeSecondary(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.dark.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Secondary!
                            </Box>
                            This is a secondary alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showInfo && (
                  <Fade in={fadeInfo} onExited={() => setShowInfo(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={infoSnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeInfo(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Info!
                            </Box>
                            This is a info alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showSuccess && (
                  <Fade in={fadeSuccess} onExited={() => setShowSuccess(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={successSnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeSuccess(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Success!
                            </Box>
                            This is a success alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showError && (
                  <Fade in={fadeError} onExited={() => setShowError(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={errorSnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeError(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Error!
                            </Box>
                            This is a error alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
                {showWarning && (
                  <Fade in={fadeWarning} onExited={() => setShowWarning(false)}>
                    <SnackbarContent
                      elevation={0}
                      classes={warningSnackbarRootClasses}
                      action={
                        <Box
                          component={IconButton}
                          padding="0!important"
                          onClick={() => setFadeWarning(false)}
                        >
                          <Box
                            component="span"
                            color={
                              "rgba(" +
                              hexToRgb(theme.palette.white.main) +
                              ",.6)"
                            }
                          >
                            ×
                          </Box>
                        </Box>
                      }
                      message={
                        <>
                          <Box
                            fontSize="1.25rem"
                            display="flex"
                            marginRight="1.25rem"
                            alignItems="center"
                          >
                            <Box
                              component={ThumbUp}
                              width="1.25rem!important"
                              height="1.25rem!important"
                            />
                          </Box>
                          <Box component="span">
                            <Box component="strong" marginRight=".5rem">
                              Warning!
                            </Box>
                            This is a warning alert—check it out!
                          </Box>
                        </>
                      }
                    />
                  </Fade>
                )}
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Modals"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Box marginBottom="1rem">
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={handleClickOpenDefault}
                      >
                        Default
                      </Button>
                    </Box>
                    <Dialog
                      open={openDefault}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCloseDefault}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <div className={classes.dialogHeader}>
                        <Typography
                          variant="h5"
                          component="h5"
                          className={classes.dialogTitle}
                        >
                          Type your modal title
                        </Typography>
                        <IconButton onClick={handleCloseDefault}>
                          <Clear />
                        </IconButton>
                      </div>
                      <DialogContent>
                        <Typography variant="body2" component="p">
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts. Separated they live in Bookmarksgrove
                          right at the coast of the Semantics, a large language
                          ocean.
                        </Typography>
                        <Typography variant="body2" component="p">
                          A small river named Duden flows by their place and
                          supplies it with the necessary regelialia. It is a
                          paradisematic country, in which roasted parts of
                          sentences fly into your mouth.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseDefault}
                          color="primary"
                          variant="contained"
                        >
                          Save changes
                        </Button>
                        <Button
                          component={Box}
                          onClick={handleCloseDefault}
                          color="primary"
                          marginLeft="auto!important"
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box marginBottom="1rem">
                      <Button
                        variant="contained"
                        fullWidth
                        classes={{
                          root: classes.buttonContainedWarning,
                        }}
                        onClick={handleClickOpenNotification}
                      >
                        Notification
                      </Button>
                    </Box>
                    <Dialog
                      open={openNotification}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCloseNotification}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      classes={{
                        paper: classes.dialogNotification,
                      }}
                    >
                      <div className={classes.dialogHeader}>
                        <Typography
                          variant="h5"
                          component="h5"
                          className={classes.dialogTitle}
                        >
                          Your attention is required
                        </Typography>
                        <IconButton onClick={handleCloseNotification}>
                          <Box
                            component={Clear}
                            color={theme.palette.white.main}
                          />
                        </IconButton>
                      </div>
                      <DialogContent>
                        <Box
                          textAlign="center"
                          paddingTop="1rem"
                          paddingBottom="1rem"
                        >
                          <Box
                            component={Notifications}
                            width="3em!important"
                            height="3em!important"
                          ></Box>
                          <Typography
                            variant="h4"
                            component="h4"
                            className={classes.dialogHeading}
                          >
                            You should read this!
                          </Typography>
                          <Typography variant="body2" component="p">
                            A small river named Duden flows by their place and
                            supplies it with the necessary regelialia.
                          </Typography>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseNotification}
                          color="secondary"
                          variant="contained"
                        >
                          Ok, got it
                        </Button>
                        <Button
                          component={Box}
                          onClick={handleCloseNotification}
                          color="secondary"
                          marginLeft="auto!important"
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box marginBottom="1rem">
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleClickOpenForm}
                      >
                        Form
                      </Button>
                    </Box>
                    <Dialog
                      maxWidth="xs"
                      open={openForm}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCloseForm}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <Box component={DialogContent} padding="0!important">
                        <Card className={classes.dialogCardForm}>
                          <CardHeader
                            className={classes.cardHeader}
                            title={
                              <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                                color={theme.palette.gray[600]}
                              >
                                Sign in with
                              </Box>
                            }
                            titleTypographyProps={{
                              component: Box,
                              textAlign: "center",
                              marginBottom: "1rem!important",
                              marginTop: ".5rem!important",
                              fontSize: "1rem!important",
                            }}
                            subheader={
                              <Box textAlign="center">
                                <Box
                                  component={Button}
                                  variant="contained"
                                  marginRight=".5rem!important"
                                  marginBottom=".5rem!important"
                                  className={classes.buttonWhite}
                                >
                                  <Box component="span" marginRight="4px">
                                    <Box
                                      alt="..."
                                      component="img"
                                      width="20px"
                                      className={classes.buttonImg}
                                      src={
                                        require("assets/img/icons/common/github.svg")
                                          .default
                                      }
                                    ></Box>
                                  </Box>
                                  <Box component="span" marginLeft=".75rem">
                                    Github
                                  </Box>
                                </Box>
                                <Button
                                  variant="contained"
                                  className={classes.buttonWhite}
                                >
                                  <Box component="span" marginRight="4px">
                                    <Box
                                      alt="..."
                                      component="img"
                                      width="20px"
                                      className={classes.buttonImg}
                                      src={
                                        require("assets/img/icons/common/google.svg")
                                          .default
                                      }
                                    ></Box>
                                  </Box>
                                  <Box component="span" marginLeft=".75rem">
                                    Google
                                  </Box>
                                </Button>
                              </Box>
                            }
                          ></CardHeader>
                          <CardContent
                            className={classes.dialogCardContentForm}
                          >
                            <Box
                              color={theme.palette.gray[600]}
                              textAlign="center"
                              marginBottom="1rem"
                              marginTop=".5rem"
                              fontSize="1rem"
                            >
                              <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                              >
                                Or sign in with credentials
                              </Box>
                            </Box>
                            <FormControl
                              variant="filled"
                              component={Box}
                              width="100%"
                              marginBottom="1rem!important"
                            >
                              <FilledInput
                                autoComplete="off"
                                type="email"
                                placeholder="Email"
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Email />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              variant="filled"
                              component={Box}
                              width="100%"
                              marginBottom="1rem!important"
                            >
                              <FilledInput
                                autoComplete="off"
                                type="password"
                                placeholder="Password"
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Lock />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControlLabel
                              value="end"
                              control={<Checkbox color="primary" />}
                              label="Remember me"
                              labelPlacement="end"
                              classes={{
                                root: classes.formControlLabelRoot,
                                label: classes.formControlLabelLabel,
                              }}
                            />
                            <Box
                              textAlign="center"
                              marginTop="1.5rem"
                              marginBottom="1.5rem"
                            >
                              <Button color="primary" variant="contained">
                                Sign in
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    </Dialog>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Notifications"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button variant="contained" onClick={handleClickAlertDefault}>
                    Default
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertDefault}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertDefault}
                  ContentProps={{
                    classes: defaultSnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertDefault}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Default!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickAlertPrimary}
                  >
                    Primary
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertPrimary}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertPrimary}
                  ContentProps={{
                    classes: primarySnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertPrimary}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Primary!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClickAlertSecondary}
                  >
                    Secondary
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertSecondary}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertSecondary}
                  ContentProps={{
                    classes: secondarySnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertSecondary}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Secondary!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedInfo,
                    }}
                    onClick={handleClickAlertInfo}
                  >
                    Info
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertInfo}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertInfo}
                  ContentProps={{
                    classes: infoSnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertInfo}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Info!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedSuccess,
                    }}
                    onClick={handleClickAlertSuccess}
                  >
                    Success
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertSuccess}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertSuccess}
                  ContentProps={{
                    classes: successSnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertSuccess}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Success!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedWarning,
                    }}
                    onClick={handleClickAlertWarning}
                  >
                    Warning
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertWarning}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertWarning}
                  ContentProps={{
                    classes: warningSnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertWarning}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Warning!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedError,
                    }}
                    onClick={handleClickAlertError}
                  >
                    Error
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openAlertError}
                  autoHideDuration={2000}
                  onClose={handleCloseAlertError}
                  ContentProps={{
                    classes: errorSnackbarRootClasses,
                    elevation: 1,
                  }}
                  action={
                    <Box
                      component={IconButton}
                      padding="0!important"
                      onClick={handleCloseAlertError}
                    >
                      <Box
                        component="span"
                        color={
                          "rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"
                        }
                      >
                        ×
                      </Box>
                    </Box>
                  }
                  message={
                    <>
                      <Box
                        fontSize="1.25rem"
                        display="flex"
                        marginRight="1.25rem"
                        alignItems="center"
                      >
                        <Box
                          component={ThumbUp}
                          width="1.25rem!important"
                          height="1.25rem!important"
                        />
                      </Box>
                      <Box component="span">
                        <Box component="strong" marginRight=".5rem">
                          Error!
                        </Box>
                        This is a default alert—check it out!
                      </Box>
                    </>
                  }
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Sweet alerts"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={basicAlert}
                  >
                    Basic alert
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedInfo,
                    }}
                    onClick={infoAlert}
                  >
                    Info alert
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedSuccess,
                    }}
                    onClick={successAlert}
                  >
                    Success alert
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.buttonContainedWarning,
                    }}
                    onClick={warningAlert}
                  >
                    Warning alert
                  </Button>
                </Box>
                <Box
                  display="inline-block"
                  marginRight="1rem"
                  marginBottom="1rem"
                >
                  <Button variant="contained" onClick={questionAlert}>
                    Question
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotificationsView;
