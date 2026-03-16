import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/google.js";

const useStyles = makeStyles(componentStyles);

const CustomMapWrapper = () => {
  const mapRef = React.useRef(null);
  const theme = useTheme();
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            { color: theme.palette.primary.main },
            { visibility: "on" },
          ],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Argon Dashboard PRO Material-UI!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Argon Dashboard PRO Material-UI</h2>' +
      "<p>A premium Admin for Material-UI, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  });
  return (
    <>
      <Box
        height="600px"
        position="relative"
        width="100%"
        overflow="hidden"
        borderRadius=".375rem"
        ref={mapRef}
      ></Box>
    </>
  );
};

const DefaultMapWrapper = () => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Argon Dashboard PRO Material-UI!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Argon Dashboard PRO Material-UI</h2>' +
      "<p>A premium Admin for Material-UI, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, []);
  return (
    <div
      style={{ height: `600px` }}
      className="map-canvas"
      id="map-default"
      ref={mapRef}
    />
  );
};

const Google = () => {
  const classes = useStyles();
  return (
    <>
      <SimpleHeader section="Google maps" subsection="Maps" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <CustomMapWrapper />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <DefaultMapWrapper />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Google;
