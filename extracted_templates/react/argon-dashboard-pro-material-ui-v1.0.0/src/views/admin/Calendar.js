import React from "react";
// nodejs library that concatenates classes
import clsx from "clsx";
// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
// @material-ui/icons components
import Check from "@material-ui/icons/Check";
import Home from "@material-ui/icons/Home";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
// core components
import componentStyles from "assets/theme/views/admin/calendar.js";
import componentStylesButtons from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(componentStylesButtons);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

let calendar;

let today = new Date();
let y = today.getFullYear();
let m = today.getMonth();
let d = today.getDate();

const eventsArray = [
  {
    id: 1,
    title: "Call with Dave",
    start: new Date(y, m, 1),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 2,
    title: "Lunch meeting",
    start: new Date(y, m, d - 1, 10, 30),
    allDay: true,
    className: "bg-orange",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 3,
    title: "All day conference",
    start: new Date(y, m, d + 7, 12, 0),
    allDay: true,
    className: "bg-green",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 4,
    title: "Meeting with Mary",
    start: new Date(y, m, d - 2),
    allDay: true,
    className: "bg-blue",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 5,
    title: "Winter Hackaton",
    start: new Date(y, m, d + 1, 19, 0),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 6,
    title: "Digital event",
    start: new Date(y, m, 21),
    allDay: true,
    className: "bg-warning",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 7,
    title: "Marketing event",
    start: new Date(y, m, 21),
    allDay: true,
    className: "bg-purple",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 8,
    title: "Dinner with Family",
    start: new Date(y, m, 19),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 9,
    title: "Black Friday",
    start: new Date(y, m, 23),
    allDay: true,
    className: "bg-blue",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },

  {
    id: 10,
    title: "Cyber Week",
    start: new Date(y, m, 2),
    allDay: true,
    className: "bg-yellow",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];

const CalendarView = () => {
  const classes = { ...useStyles(), ...useStylesButtons() };
  const [events, setEvents] = React.useState(eventsArray);
  const [alert, setAlert] = React.useState(null);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalChange, setModalChange] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [radios, setRadios] = React.useState(null);
  const [eventId, setEventId] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  // eslint-disable-next-line
  const [event, setEvent] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(null);
  const calendarRef = React.useRef(null);
  React.useEffect(() => {
    createCalendar();
    // eslint-disable-next-line
  }, []);
  const createCalendar = () => {
    calendar = new Calendar(calendarRef.current, {
      plugins: [interaction, dayGridPlugin],
      initialView: "dayGridMonth",
      selectable: true,
      editable: true,
      events: events,
      headerToolbar: "",
      // Add new event
      select: (info) => {
        setModalAdd(true);
        setStartDate(info.startStr);
        setEndDate(info.endStr);
        setRadios("bg-info");
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        setEventId(event.id);
        setEventTitle(event.title);
        setEventDescription(event.extendedProps.description);
        setRadios("bg-info");
        setEvent(event);
        setModalChange(true);
      },
    });
    calendar.render();
    setCurrentDate(calendar.view.title);
  };
  const changeView = (newView) => {
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };
  const addNewEvent = () => {
    var newEvents = events;
    newEvents.push({
      title: eventTitle,
      start: startDate,
      end: endDate,
      className: radios,
      id: events[events.length - 1] + 1,
    });
    calendar.addEvent({
      title: eventTitle,
      start: startDate,
      end: endDate,
      className: radios,
      id: events[events.length - 1] + 1,
    });
    setModalAdd(false);
    setEvents(newEvents);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle("");
  };
  const changeEvent = () => {
    var newEvents = events.map((prop) => {
      if (prop.id + "" === eventId + "") {
        setEvent(undefined);
        calendar.getEventById(eventId).remove();
        let saveNewEvent = {
          ...prop,
          title: eventTitle,
          className: radios,
          description: eventDescription,
        };
        calendar.addEvent(saveNewEvent);
        return {
          ...prop,
          title: eventTitle,
          className: radios,
          description: eventDescription,
        };
      } else {
        return prop;
      }
    });
    setModalChange(false);
    setEvents(newEvents);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
    setEventId(undefined);
    setEvent(undefined);
  };
  const deleteEventSweetAlert = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
          setAlert(false);
          setRadios("bg-info");
          setEventTitle("");
          setEventDescription("");
          setEventId(undefined);
        }}
        onCancel={() => deleteEvent()}
        confirmBtnCssClass="btn-secondary"
        cancelBtnBsStyle="danger"
        confirmBtnText="Cancel"
        cancelBtnText="Yes, delete it"
        showCancel
        btnSize=""
      >
        You won't be able to revert this!
      </ReactBSAlert>
    );
  };
  const deleteEvent = () => {
    event.remove();
    var newEvents = events.filter((prop) => prop.id + "" !== eventId);
    setEvent(undefined);
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="primary"
        confirmBtnText="Ok"
        btnSize=""
      >
        Event deleted!
      </ReactBSAlert>
    );
    setModalChange(false);
    setEvents(newEvents);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
    setEventId(undefined);
    setEvent(undefined);
  };

  return (
    <>
      {alert}
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Grid
            container
            component={Box}
            alignItems="center"
            paddingTop="1.5rem"
            paddingBottom="1.5rem"
          >
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h2"
                component="h6"
                className={clsx(
                  classes.displayInlineBlock,
                  classes.mb0,
                  classes.textWhite
                )}
              >
                {currentDate}
              </Typography>
              <Breadcrumbs
                separator="-"
                aria-label="breadcrumb"
                classes={{
                  root: classes.breadcrumbRoot,
                  li: classes.breadcrumbLi,
                  ol: classes.breadcrumbOl,
                  separator: classes.breadcrumbSeparator,
                }}
              >
                <Link
                  color="inherit"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <Box
                    component={Home}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    position="relative"
                  />
                </Link>
                <Link
                  color="inherit"
                  href="/getting-started/installation/"
                  onClick={(e) => e.preventDefault()}
                >
                  Calendar
                </Link>
                <Typography
                  component="span"
                  className={classes.breadcrumbActive}
                >
                  {currentDate}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.textLgRight}>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
                onClick={() => {
                  calendar.prev();
                }}
              >
                <NavigateBefore />
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
                onClick={() => {
                  calendar.next();
                }}
              >
                <NavigateNext />
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
                onClick={() => changeView("dayGridMonth")}
              >
                Month
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
                onClick={() => changeView("dayGridWeek")}
              >
                Week
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
                onClick={() => changeView("dayGridDay")}
              >
                Day
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader
                className={classes.cardHeader}
                title="Calendar"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              ></CardHeader>
              <CardContent className={classes.p0}>
                <div
                  className="calendar"
                  data-toggle="calendar"
                  id="calendar"
                  ref={calendarRef}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={modalChange}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalChange(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FormGroup>
            <FormLabel>Event title</FormLabel>
            <FilledInput
              placeholder="Event Title"
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedInfo,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-info")}
                >
                  {radios === "bg-info" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedWarning,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-warning")}
                >
                  {radios === "bg-warning" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedError,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-danger")}
                >
                  {radios === "bg-danger" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedSuccess,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-success")}
                >
                  {radios === "bg-success" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  color="default"
                  classes={{
                    root: clsx(
                      classes.buttonContainedDefault,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-default")}
                >
                  {radios === "bg-default" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  color="primary"
                  classes={{
                    root: clsx(
                      classes.buttonContainedPrimary,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-primary")}
                >
                  {radios === "bg-primary" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FilledInput
              placeholder="Event Desctiption"
              type="text"
              multiline
              rows="4"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>
              <Box display="inline-block" marginRight=".5rem">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={changeEvent}
                >
                  Update
                </Button>
              </Box>
              <Button
                classes={{
                  root: classes.buttonContainedError,
                }}
                variant="contained"
                onClick={() => {
                  setModalChange(false);
                  deleteEventSweetAlert();
                }}
              >
                Delete
              </Button>
            </Box>
            <Button onClick={() => setModalChange(false)} color="primary">
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalAdd}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalAdd(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FormGroup>
            <FormLabel>Event title</FormLabel>
            <FilledInput
              placeholder="Event Title"
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedInfo,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-info")}
                >
                  {radios === "bg-info" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedWarning,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-warning")}
                >
                  {radios === "bg-warning" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedError,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-danger")}
                >
                  {radios === "bg-danger" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  classes={{
                    root: clsx(
                      classes.buttonContainedSuccess,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-success")}
                >
                  {radios === "bg-success" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  color="default"
                  classes={{
                    root: clsx(
                      classes.buttonContainedDefault,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-default")}
                >
                  {radios === "bg-default" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
              <Box display="inline-block" marginRight=".5rem">
                <IconButton
                  color="primary"
                  classes={{
                    root: clsx(
                      classes.buttonContainedPrimary,
                      classes.radioButton
                    ),
                  }}
                  onClick={() => setRadios("bg-primary")}
                >
                  {radios === "bg-primary" && (
                    <Box
                      width="1.25rem!important"
                      height="1.25rem!important"
                      component={Check}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FilledInput
              placeholder="Event Desctiption"
              type="text"
              multiline
              rows="4"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>
              <Button color="primary" variant="contained" onClick={addNewEvent}>
                Add event
              </Button>
            </Box>
            <Button onClick={() => setModalAdd(false)} color="primary">
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalendarView;
