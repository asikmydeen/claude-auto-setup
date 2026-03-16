import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/vector.js";

const useStyles = makeStyles(componentStyles);

let mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const Maps = () => {
  const classes = useStyles();
  return (
    <>
      <SimpleHeader section="Vector maps" subsection="Maps" />
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
              <CardContent>
                <VectorMap
                  containerClassName="vector-map"
                  containerStyle={{
                    width: "100%",
                    height: "600px",
                  }}
                  map={"world_mill"}
                  zoomOnScroll={false}
                  scaleColors={["#f00", "#0071A4"]}
                  normalizeFunction="polynomial"
                  hoverOpacity={0.7}
                  hoverColor={false}
                  backgroundColor="transparent"
                  regionStyle={{
                    initial: {
                      fill: "#e9ecef",
                      "fill-opacity": 0.8,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 1,
                    },
                    hover: {
                      fill: "#dee2e6",
                      "fill-opacity": 0.8,
                      cursor: "pointer",
                    },
                    selected: {
                      fill: "yellow",
                    },
                    selectedHover: {},
                  }}
                  markerStyle={{
                    initial: {
                      fill: "#fb6340",
                      "stroke-width": 0,
                    },
                    hover: {
                      fill: "#11cdef",
                      "stroke-width": 0,
                    },
                  }}
                  markers={[
                    {
                      latLng: [41.9, 12.45],
                      name: "Vatican City",
                    },
                    {
                      latLng: [43.73, 7.41],
                      name: "Monaco",
                    },
                    {
                      latLng: [35.88, 14.5],
                      name: "Malta",
                    },
                    {
                      latLng: [1.3, 103.8],
                      name: "Singapore",
                    },
                    {
                      latLng: [1.46, 173.03],
                      name: "Kiribati",
                    },
                    {
                      latLng: [-21.13, -175.2],
                      name: "Tonga",
                    },
                    {
                      latLng: [15.3, -61.38],
                      name: "Dominica",
                    },
                    {
                      latLng: [-20.2, 57.5],
                      name: "Mauritius",
                    },
                    {
                      latLng: [26.02, 50.55],
                      name: "Bahrain",
                    },
                  ]}
                  series={{
                    regions: [
                      {
                        values: mapData,
                        scale: ["#ced4da", "#adb5bd"],
                        normalizeFunction: "polynomial",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Maps;
