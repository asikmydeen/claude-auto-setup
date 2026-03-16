import DashboardLayout from "src/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "src/pages/Dashboard/Pages/AuthLayout.vue";
// GeneralViews
import NotFound from "src/pages/GeneralViews/NotFoundPage.vue";

// Page Headers
import CalendarHeader from "src/pages/Dashboard/Calendar/CalendarHeader";
const DashboardHeader = () =>
  import(
    /* webpackChunkName: "dashboard" */ "src/pages/Dashboard/Dashboard/DashboardHeader.vue"
  );
import DefaultHeader from "src/pages/Dashboard/DefaultHeader";
import SweetAlertHeader from "src/pages/Dashboard/Components/Headers/SweetAlertHeader";
import VectorMapsHeader from "src/pages/Dashboard/Maps/VectorMapsHeader";

// Example pages
import UserProfile from "@/pages/Dashboard/Examples/UserProfile.vue";

// Role Management
import ListRolePage from "@/pages/Dashboard/Examples/RoleManagement/ListRolePage.vue";
import AddRolePage from "@/pages/Dashboard/Examples/RoleManagement/AddRolePage.vue";
import EditRolePage from "@/pages/Dashboard/Examples/RoleManagement/EditRolePage.vue";

// User Management
import ListUserPage from "@/pages/Dashboard/Examples/UserManagement/ListUserPage.vue";
import AddUserPage from "@/pages/Dashboard/Examples/UserManagement/AddUserPage.vue";
import EditUserPage from "@/pages/Dashboard/Examples/UserManagement/EditUserPage.vue";

// Category Management
import ListCategoryPage from "@/pages/Dashboard/Examples/CategoryManagement/ListCategoryPage.vue";
import AddCategoryPage from "@/pages/Dashboard/Examples/CategoryManagement/AddCategoryPage.vue";
import EditCategoryPage from "@/pages/Dashboard/Examples/CategoryManagement/EditCategoryPage.vue";

// Tag Management
import ListTagPage from "@/pages/Dashboard/Examples/TagManagement/ListTagPage.vue";
import AddTagPage from "@/pages/Dashboard/Examples/TagManagement/AddTagPage.vue";
import EditTagPage from "@/pages/Dashboard/Examples/TagManagement/EditTagPage.vue";

// Item Management
import ListItemPage from "@/pages/Dashboard/Examples/ItemManagement/ListItemPage.vue";
import AddItemPage from "@/pages/Dashboard/Examples/ItemManagement/AddItemPage.vue";
import EditItemPage from "@/pages/Dashboard/Examples/ItemManagement/EditItemPage.vue";

// Calendar
const Calendar = () =>
  import(
    /* webpackChunkName: "calendar" */ "src/pages/Dashboard/Calendar/CalendarRoute.vue"
  );
// Charts
const Charts = () =>
  import(/* webpackChunkName: "charts" */ "src/pages/Dashboard/Charts.vue");

// Components pages
const Buttons = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Buttons.vue"
  );
const GridSystem = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/GridSystem.vue"
  );
const Panels = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Panels.vue"
  );
const SweetAlert = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/SweetAlert.vue"
  );
const Notifications = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Notifications.vue"
  );
const Icons = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Icons.vue"
  );
const Typography = () =>
  import(
    /* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Typography.vue"
  );

// Dashboard pages
const Dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "src/pages/Dashboard/Dashboard/Dashboard.vue"
  );
import Widgets from "src/pages/Dashboard/Widgets.vue";

// Forms pages
const RegularForms = () => import("src/pages/Dashboard/Forms/RegularForms.vue");
const ExtendedForms = () =>
  import("src/pages/Dashboard/Forms/ExtendedForms.vue");
const ValidationForms = () =>
  import("src/pages/Dashboard/Forms/ValidationForms.vue");
const Wizard = () => import("src/pages/Dashboard/Forms/Wizard.vue");

// Maps pages
const GoogleMaps = () =>
  import(
    /* webpackChunkName: "maps" */ "src/pages/Dashboard/Maps/GoogleMaps.vue"
  );
const FullScreenMap = () =>
  import(
    /* webpackChunkName: "maps" */ "src/pages/Dashboard/Maps/FullScreenMap.vue"
  );
const VectorMaps = () =>
  import(
    /* webpackChunkName: "maps" */ "src/pages/Dashboard/Maps/VectorMaps.vue"
  );

// Pages
const User = () =>
  import(
    /* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/UserProfile.vue"
  );
const Pricing = () =>
  import(
    /* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/Pricing.vue"
  );
const TimeLine = () =>
  import(
    /* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/TimeLinePage.vue"
  );
const Login = () =>
  import(/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Login.vue");
const Register = () =>
  import(
    /* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Register.vue"
  );
const Lock = () =>
  import(/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Lock.vue");
const PasswordReset = () =>
  import(/* webpackChunkName: "password" */ "src/pages/Dashboard/Password/Reset.vue");
const PasswordEmail = () =>
  import(/* webpackChunkName: "password" */ "src/pages/Dashboard/Password/Email.vue");

// TableList pages
const RegularTables = () =>
  import(
    /* webpackChunkName: "tables" */ "src/pages/Dashboard/Tables/RegularTables.vue"
  );
const ExtendedTables = () =>
  import(
    /* webpackChunkName: "tables" */ "src/pages/Dashboard/Tables/ExtendedTables.vue"
  );
const PaginatedTables = () =>
  import(
    /* webpackChunkName: "tables" */ "src/pages/Dashboard/Tables/PaginatedTables.vue"
  );

//import middleware
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons, header: DefaultHeader },
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem, header: DefaultHeader },
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels, header: DefaultHeader },
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert, header: SweetAlertHeader },
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications, header: DefaultHeader },
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons, header: DefaultHeader },
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography, header: DefaultHeader },
    },
  ],
};
let examplesMenu = {
  path: "/examples",
  component: DashboardLayout,
  name: "Examples",
  children: [
    {
      path: "user-profile",
      name: "User Profile",
      components: { default: UserProfile, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "role-management/list-roles",
      name: "List Roles",
      components: { default: ListRolePage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "role-management/add-role",
      name: "Add Role",
      components: { default: AddRolePage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "role-management/edit-role/:id",
      name: "Edit Role",
      components: { default: EditRolePage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "user-management/list-users",
      name: "List Users",
      components: { default: ListUserPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "user-management/add-user",
      name: "Add User",
      components: { default: AddUserPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "user-management/edit-user/:id",
      name: "Edit User",
      components: { default: EditUserPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "category-management/list-categories",
      name: "List Categories",
      components: { default: ListCategoryPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "category-management/add-category",
      name: "Add Category",
      components: { default: AddCategoryPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "category-management/edit-category/:id",
      name: "Edit Category",
      components: { default: EditCategoryPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "tag-management/list-tags",
      name: "List Tags",
      components: { default: ListTagPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "tag-management/add-tag",
      name: "Add Tag",
      components: { default: AddTagPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "tag-management/edit-tag/:id",
      name: "Edit Tag",
      components: { default: EditTagPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "item-management/list-items",
      name: "List Items",
      components: { default: ListItemPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "item-management/add-item",
      name: "Add Item",
      components: { default: AddItemPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
    {
      path: "item-management/edit-item/:id",
      name: "Edit Item",
      components: { default: EditItemPage, header: DefaultHeader },
      meta: { middleware: auth },
    },
  ],
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms, header: DefaultHeader },
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms, header: DefaultHeader },
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms, header: DefaultHeader },
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard, header: DefaultHeader },
    },
  ],
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables, header: DefaultHeader },
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables, header: DefaultHeader },
    },
    {
      path: "paginated",
      name: "Paginated Tables",
      components: { default: PaginatedTables, header: DefaultHeader },
    },
  ],
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps, header: DefaultHeader },
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
      },
      components: { default: FullScreenMap },
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps, header: VectorMapsHeader },
    },
  ],
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User, header: DefaultHeader },
    },
    {
      path: "timeline",
      name: "Timeline Page",
      components: { default: TimeLine, header: DefaultHeader },
    },
  ],
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { middleware: guest },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { middleware: guest },
    },
    {
      path: "/password/reset",
      name: "PasswordReset",
      component: PasswordReset,
      meta: { middleware: guest }
    },
    {
      path: "/password/email",
      name: "PasswordEmail",
      component: PasswordEmail,
      meta: { middleware: guest }
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock,
    },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
  },
  componentsMenu,
  examplesMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    name: "Dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard, header: DashboardHeader },
        meta: { middleware: auth },
      },
      {
        path: "calendar",
        name: "Calendar",
        components: { default: Calendar, header: CalendarHeader },
      },
      {
        path: "charts",
        name: "Charts",
        components: { default: Charts, header: DefaultHeader },
      },
      {
        path: "widgets",
        name: "Widgets",
        components: { default: Widgets, header: DefaultHeader },
      },
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
