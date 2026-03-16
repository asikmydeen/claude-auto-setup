// core components
// admin pages
// // // // // admin dashboards
import AlternativeDashboard from "views/admin/Dashboards/AlternativeDashboard.js";
import Dashboard from "views/admin/Dashboards/Dashboard.js";
// // // // // admin examples
import Timeline from "views/admin/Examples/Timeline.js";
import Profile from "views/admin/Examples/Profile.js";
// // // // // admin components
import Buttons from "views/admin/Components/Buttons.js";
import Cards from "views/admin/Components/Cards.js";
import Grid from "views/admin/Components/Grid.js";
import Notifications from "views/admin/Components/Notifications.js";
import Icons from "views/admin/Components/Icons.js";
import Typography from "views/admin/Components/Typography.js";
// // // // // admin forms
import Elements from "views/admin/Forms/Elements.js";
import Components from "views/admin/Forms/Components.js";
import Validation from "views/admin/Forms/Validation.js";
// // // // // admin tables
import Tables from "views/admin/Tables/Tables.js";
import Sortable from "views/admin/Tables/Sortable.js";
import ReactBSTable from "views/admin/Tables/ReactBSTable.js";
// // // // // admin maps
import Google from "views/admin/Maps/Google.js";
import Vector from "views/admin/Maps/Vector.js";
// // // // // admin rest
import Widgets from "views/admin/Widgets.js";
import Charts from "views/admin/Charts.js";
import Calendar from "views/admin/Calendar.js";
// rtl pages
import RTL from "views/rtl/RTL.js";
// auth pages
import Lock from "views/auth/Lock.js";
import Login from "views/auth/Login.js";
import Pricing from "views/auth/Pricing.js";
import Register from "views/auth/Register.js";
// @material-ui/icons components
import BubbleChart from "@material-ui/icons/BubbleChart";
import Dns from "@material-ui/icons/Dns";
import Event from "@material-ui/icons/Event";
import FlashOn from "@material-ui/icons/FlashOn";
import House from "@material-ui/icons/House";
import ListAlt from "@material-ui/icons/ListAlt";
import Map from "@material-ui/icons/Map";
import Palette from "@material-ui/icons/Palette";
import PermMedia from "@material-ui/icons/PermMedia";
import PieChart from "@material-ui/icons/PieChart";
import Toc from "@material-ui/icons/Toc";
import WidgetsIcon from "@material-ui/icons/Widgets";

var routes = [
  {
    collapse: true,
    name: "Dashboards",
    icon: House,
    iconColor: "Primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: Dashboard,
        layout: "/admin",
      },
      {
        path: "/alternative-dashboard",
        name: "Alertnative",
        miniName: "A",
        component: AlternativeDashboard,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Examples",
    icon: PermMedia,
    iconColor: "Warning",
    state: "examplesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        miniName: "P",
        component: Pricing,
        layout: "/auth",
      },
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: Register,
        layout: "/auth",
      },
      {
        path: "/lock",
        name: "Lock",
        miniName: "L",
        component: Lock,
        layout: "/auth",
      },
      {
        path: "/timeline",
        name: "Timeline",
        miniName: "T",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/user-profile",
        name: "Profile",
        miniName: "P",
        component: Profile,
        layout: "/admin",
      },

      {
        path: "/rtl-support",
        name: "RTL Support",
        miniName: "P",
        component: RTL,
        layout: "/rtl",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    icon: Dns,
    iconColor: "Info",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        miniName: "B",
        component: Buttons,
        layout: "/admin",
      },
      {
        path: "/cards",
        name: "Cards",
        miniName: "C",
        component: Cards,
        layout: "/admin",
      },
      {
        path: "/grid",
        name: "Grid",
        miniName: "G",
        component: Grid,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        miniName: "N",
        component: Notifications,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        miniName: "I",
        component: Icons,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        miniName: "T",
        component: Typography,
        layout: "/admin",
      },
      {
        collapse: true,
        name: "Multi Level",
        miniName: "M",
        state: "multiCollapse",
        multiStates: ["componentsCollapse"],
        views: [
          {
            path: "#pablo",
            name: "Third level menu",
            component: () => {},
            miniName: "T",
            layout: "/",
          },
          {
            path: "#pablo",
            name: "Just another link",
            miniName: "J",
            component: () => {},
            layout: "/",
          },
          {
            path: "#pablo",
            name: "One last link",
            miniName: "O",
            component: () => {},
            layout: "/",
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    icon: ListAlt,
    iconColor: "ErrorLight",
    state: "formsCollapse",
    views: [
      {
        path: "/elements",
        name: "Elements",
        miniName: "E",
        component: Elements,
        layout: "/admin",
      },
      {
        path: "/components",
        name: "Components",
        miniName: "C",
        component: Components,
        layout: "/admin",
      },
      {
        path: "/validation",
        name: "Validation",
        miniName: "V",
        component: Validation,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    icon: Toc,
    iconColor: "Default",
    state: "tablesCollapse",
    views: [
      {
        path: "/tables",
        name: "Tables",
        miniName: "T",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/sortable",
        name: "Sortable",
        miniName: "S",
        component: Sortable,
        layout: "/admin",
      },
      {
        path: "/react-bs-table",
        name: "React BS Table",
        miniName: "R",
        component: ReactBSTable,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    icon: Map,
    iconColor: "Primary",
    state: "mapsCollapse",
    views: [
      {
        path: "/maps",
        name: "Google",
        miniName: "G",
        component: Google,
        layout: "/admin",
      },
      {
        path: "/vector",
        name: "Vector",
        miniName: "V",
        component: Vector,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: WidgetsIcon,
    iconColor: "Success",
    component: Widgets,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: PieChart,
    iconColor: "Info",
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: Event,
    iconColor: "Error",
    component: Calendar,
    layout: "/admin",
  },
  {
    divider: true,
  },
  {
    title: "Documentation",
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
    name: "Getting started",
    icon: FlashOn,
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
    name: "Foundation",
    icon: Palette,
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
    name: "Components",
    icon: Dns,
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/google-maps/argon-dashboard?ref=admui-admin-sidebar",
    name: "Plugins",
    icon: BubbleChart,
  },
];
export default routes;
