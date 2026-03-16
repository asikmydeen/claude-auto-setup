import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
// GeneralViews
import NotFound from "@/views/GeneralViews/NotFoundPage.vue";

// Example pages
import UserProfile from "@/views/Examples/UserProfile.vue";
import ListRolePage from "@/views/Examples/RoleManagement/ListRolePage.vue";
import EditRolePage from "@/views/Examples/RoleManagement/EditRolePage.vue";
import AddRolePage from "@/views/Examples/RoleManagement/AddRolePage.vue";
import ListUserPage from "@/views/Examples/UserManagement/ListUserPage.vue";
import EditUserPage from "@/views/Examples/UserManagement/EditUserPage.vue";
import AddUserPage from "@/views/Examples/UserManagement/AddUserPage.vue";
import ListCategoryPage from "@/views/Examples/CategoryManagement/ListCategoryPage.vue";
import EditCategoryPage from "@/views/Examples/CategoryManagement/EditCategoryPage.vue";
import AddCategoryPage from "@/views/Examples/CategoryManagement/AddCategoryPage.vue";
// Tag Management
import ListTagPage from "@/views/Examples/TagManagement/ListTagPage.vue";
import EditTagPage from "@/views/Examples/TagManagement/EditTagPage";
import AddTagPage from "@/views/Examples/TagManagement/AddTagPage.vue";
// Item Management
import ListItemPage from "@/views/Examples/ItemManagement/ListItemPage.vue";
import AddItemPage from "@/views/Examples/ItemManagement/AddItemPage.vue";
import EditItemPage from "@/views/Examples/ItemManagement/EditItemPage";

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Calendar/Calendar.vue");
// Charts
const Charts = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Charts.vue");

// Components pages
const Buttons = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Buttons.vue");
const Cards = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Cards.vue");
const GridSystem = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/GridSystem.vue"
  );
const Notifications = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/Notifications.vue"
  );
const Icons = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Icons.vue");
const Typography = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/Typography.vue"
  );

// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Dashboard.vue");
const AlternativeDashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "@/views/Dashboard/AlternativeDashboard.vue"
  );
const Widgets = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Widgets.vue");

// Forms pages
const FormElements = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormElements.vue");
const FormComponents = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormComponents.vue");
const FormValidation = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormValidation.vue");

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Maps/GoogleMaps.vue");
const VectorMaps = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Maps/VectorMaps.vue");

// Pages
const User = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/UserProfile.vue");
const Pricing = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Pricing.vue");
const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/TimeLinePage.vue");
const Login = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Register.vue");
const Lock = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Lock.vue");

const PasswordReset = () =>
  import(/* webpackChunkName: "password" */ "@/views/Password/Reset.vue");
const PasswordEmail = () =>
  import(/* webpackChunkName: "password" */ "@/views/Password/Email.vue");

// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/RegularTables.vue");
const SortableTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/SortableTables.vue");
const PaginatedTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/PaginatedTables.vue");

//import middleware
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import admin from "@/middleware/admin";
import admin_creator from "@/middleware/admin_creator";

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      component: Buttons
    },
    {
      path: "cards",
      name: "Cards",
      component: Cards
    },
    {
      path: "grid-system",
      name: "Grid System",
      component: GridSystem
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography
    }
  ]
};
let examplesMenu = {
  path: "/examples",
  component: DashboardLayout,
  name: "Examples",
  children: [
    {
      path: "user-profile",
      name: "User Profile",
      components: { default: UserProfile },
      meta: { middleware: auth }
    },
    {
      path: "role-management/list-roles",
      name: "List Roles",
      components: { default: ListRolePage },
      meta: { middleware: admin }
    },
    {
      path: "role-management/add-role",
      name: "Add Role",
      components: { default: AddRolePage },
      meta: { middleware: admin }
    },
    {
      path: "role-management/edit-role/:id",
      name: "Edit Role",
      components: { default: EditRolePage },
      meta: { middleware: admin }
    },
    {
      path: "user-management/list-users",
      name: "List Users",
      components: { default: ListUserPage },
      meta: { middleware: admin }
    },
    {
      path: "user-management/add-user",
      name: "Add User",
      components: { default: AddUserPage },
      meta: { middleware: admin }
    },
    {
      path: "user-management/edit-user/:id",
      name: "Edit User",
      components: { default: EditUserPage },
      meta: { middleware: admin }
    },
    {
      path: "category-management/list-categories",
      name: "List Categories",
      components: { default: ListCategoryPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "category-management/add-category",
      name: "Add Category",
      components: { default: AddCategoryPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "category-management/edit-category/:id",
      name: "Edit Category",
      components: { default: EditCategoryPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "tag-management/list-tags",
      name: "List Tags",
      components: { default: ListTagPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "tag-management/add-tag",
      name: "Add Tag",
      components: { default: AddTagPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "tag-management/edit-tag/:id",
      name: "Edit Tag",
      components: { default: EditTagPage },
      meta: { middleware: admin_creator }
    },
    {
      path: "item-management/list-items",
      name: "List Items",
      components: { default: ListItemPage },
      meta: { middleware: auth }
    },
    {
      path: "item-management/add-item",
      name: "Add Item",
      components: { default: AddItemPage },
      meta: { middleware: auth }
    },
    {
      path: "item-management/edit-item/:id",
      name: "Edit Item",
      components: { default: EditItemPage },
      meta: { middleware: auth }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/elements",
  name: "Forms",
  children: [
    {
      path: "elements",
      name: "Form elements",
      component: FormElements
    },
    {
      path: "components",
      name: "Form components",
      component: FormComponents
    },
    {
      path: "validation",
      name: "Form validation",
      component: FormValidation
    }
  ]
};

let tablesMenu = {
  path: "/tables",
  component: DashboardLayout,
  redirect: "/table/regular",
  name: "Tables menu",
  children: [
    {
      path: "regular",
      name: "Tables",
      component: RegularTables
    },
    {
      path: "sortable",
      name: "Sortable",
      component: SortableTables
    },
    {
      path: "paginated",
      name: "Paginated Tables",
      component: PaginatedTables
    }
  ]
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
      component: GoogleMaps
    },
    {
      path: "vector",
      name: "Vector Map",
      component: VectorMaps
    }
  ]
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
      component: User
    },
    {
      path: "timeline",
      name: "Timeline Page",
      component: TimeLine
    }
  ]
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
      meta: { middleware: guest }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { middleware: guest }
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
      component: Pricing
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  componentsMenu,
  examplesMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  {
    path: "/",
    component: DashboardLayout,
    name: "Dashboard layout",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { middleware: auth }
      },
      {
        path: "alternative",
        name: "Alternative",
        component: AlternativeDashboard,
        meta: {
          navbarType: "light"
        }
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar
      },
      {
        path: "charts",
        name: "Charts",
        component: Charts
      },
      {
        path: "widgets",
        name: "Widgets",
        component: Widgets
      }
    ]
  },
  authPages
];

export default routes;
