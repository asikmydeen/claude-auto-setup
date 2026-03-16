import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Flight from "@material-ui/icons/Flight";
import LocationOn from "@material-ui/icons/LocationOn";
import TrendingUp from "@material-ui/icons/TrendingUp";
import School from "@material-ui/icons/School";
// core components
import UserRTLHeader from "components/Headers/UserRTLHeader.js";
import CardStatsGradient from "components/Cards/Widgets/CardStatsGradient.js";
import CardProgressTrack from "components/Cards/Dashboard/CardProgressTrack.js";

import componentStyles from "assets/theme/views/rtl/rtl.js";
import componentStylesCardImg from "assets/theme/components/card-img.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardImg = makeStyles(componentStylesCardImg);

function RTL() {
  const classes = { ...useStyles(), ...useStylesCardImg() };
  const theme = useTheme();
  return (
    <>
      <UserRTLHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Grid container>
              <Grid item xs={12} lg={6}>
                <CardStatsGradient
                  subtitle="إجمالي حركة المرور"
                  title="350,897"
                  icon={TrendingUp}
                  color="bgGradientSuccess"
                  footer={
                    <>
                      <Box
                        component="span"
                        fontSize=".875rem"
                        color={theme.palette.white.main}
                        marginRight=".5rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          component={ArrowUpward}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />{" "}
                        3.48%
                      </Box>
                      <Box
                        component="span"
                        whiteSpace="nowrap"
                        color={theme.palette.gray[400]}
                      >
                        منذ اخر شهر
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CardStatsGradient
                  subtitle="أداء"
                  title="49,65%"
                  icon={Flight}
                  color="bgGradientError"
                  footer={
                    <>
                      <Box
                        component="span"
                        fontSize=".875rem"
                        color={theme.palette.white.main}
                        marginRight=".5rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          component={ArrowUpward}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />{" "}
                        3.48%
                      </Box>
                      <Box
                        component="span"
                        whiteSpace="nowrap"
                        color={theme.palette.gray[400]}
                      >
                        منذ اخر شهر
                      </Box>
                    </>
                  }
                />
              </Grid>
            </Grid>
            <Card
              classes={{
                root: classes.cardRoot,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        تعديل الملف الشخصي
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          الإعدادات
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  display="flex"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  معلومات المستخدم
                </Box>
                <div>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          اسم المستخدم
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="اسم المستخدم"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          عنوان البريد الإلكتروني
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="email"
                            placeholder="jesse@example.com"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          الاسم
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="الاسم"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          الكنية
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="الكنية"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                />
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  display="flex"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  معلومات الاتصال
                </Box>
                <div>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          عنوان
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="عنوان"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          الكود
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="الكود"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          بلد
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="بلد"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          مدينة
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            type="text"
                            placeholder="مدينة"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                />
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  display="flex"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  عني
                </Box>
                <div>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel component={Box} display="flex!important">
                          عني
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={OutlinedInput}
                            autoComplete="off"
                            multiline
                            defaultValue="الجميلة."
                            rows="4"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <img
                alt="..."
                src={require("assets/img/theme/img-1-1000x600.jpg").default}
                className={classes.cardImgTop}
              />
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box
                    component="img"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                    alt="..."
                    maxWidth="140px"
                    borderRadius="50%"
                    position="absolute"
                    left="50%"
                    border={"3px solid " + theme.palette.white.main}
                    boxShadow={boxShadows.boxShadow + "!important"}
                    className={classes.profileImage}
                  />
                </Grid>
              </Box>
              <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
                subheader={
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootInfo }}
                    >
                      الاتصال
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootDark }}
                    >
                      رسالة
                    </Button>
                  </Box>
                }
              ></Box>
              <Box component={CardContent} paddingTop="0!important">
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="1rem 0"
                      justifyContent="center"
                      display="flex"
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          22
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          اصحاب
                        </Box>
                      </Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          10
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          الصور
                        </Box>
                      </Box>
                      <Box textAlign="center" padding=".875rem">
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          89
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          تعليقات
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">
                    Jessica Jones
                    <Box component="span" fontWeight="300">
                      , 27
                    </Box>
                  </Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component={LocationOn}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    ></Box>
                    Bucharest, Romania
                  </Box>
                  <Box
                    component={Typography}
                    variant="h5"
                    marginTop="2rem!important"
                  >
                    Solution Manager - Creative Tim Officer
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  >
                    <Box
                      component={School}
                      width="1.25rem!important"
                      height="1.25rem!important"
                      marginRight=".5rem"
                    ></Box>
                    University of Computer Science
                  </Box>
                </Box>
              </Box>
            </Card>
            <CardProgressTrack />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RTL;
