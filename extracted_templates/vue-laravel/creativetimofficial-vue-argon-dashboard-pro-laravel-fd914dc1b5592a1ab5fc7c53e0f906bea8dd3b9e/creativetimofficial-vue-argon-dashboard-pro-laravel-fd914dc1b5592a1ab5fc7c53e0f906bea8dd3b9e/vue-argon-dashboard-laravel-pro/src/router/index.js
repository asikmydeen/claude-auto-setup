import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/dashboards/Landing.vue";
import Default from "../views/dashboards/Default.vue";
import Automotive from "../views/dashboards/Automotive.vue";
import SmartHome from "../views/dashboards/SmartHome.vue";
import VRDefault from "../views/dashboards/vr/VRDefault.vue";
import VRInfo from "../views/dashboards/vr/VRInfo.vue";
import CRM from "../views/dashboards/CRM.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Teams from "../views/pages/profile/Teams.vue";
import Projects from "../views/pages/profile/Projects.vue";
import General from "../views/pages/projects/General.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import NewProject from "../views/pages/projects/NewProject.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import SweetAlerts from "../views/pages/SweetAlerts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import Analytics from "../views/applications/analytics/Analytics.vue";
import EcommerceOverview from "../views/ecommerce/overview/Overview.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/EditProduct.vue";
import ProductPage from "../views/ecommerce/ProductPage.vue";
import ProductsList from "../views/ecommerce/ProductsList.vue";
import OrderDetails from "../views/ecommerce/Orders/OrderDetails";
import OrderList from "../views/ecommerce/Orders/OrderList";
import Referral from "../views/ecommerce/Referral";
import Reports from "../views/pages/Users/Reports.vue";
import NewUser from "../views/pages/Users/NewUser.vue";
import Settings from "../views/pages/Account/Settings.vue";
import Billing from "../views/pages/Account/Billing.vue";
import Invoice from "../views/pages/Account/Invoice.vue";
import Security from "../views/pages/Account/Security.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetBasic from "../views/auth/reset/Basic.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import ResetIllustration from "../views/auth/reset/Illustration.vue";
import VerificationBasic from "../views/auth/verification/Basic.vue";
import VerificationCover from "../views/auth/verification/Cover.vue";
import VerificationIllustration from "../views/auth/verification/Illustration.vue";
import SignupBasic from "../views/auth/signup/Basic.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import SignupIllustration from "../views/auth/signup/Illustration.vue";
import Error404 from "../views/auth/error/Error404.vue";
import Error500 from "../views/auth/error/Error500.vue";
import lockBasic from "../views/auth/lock/Basic.vue";
import lockCover from "../views/auth/lock/Cover.vue";
import lockIllustration from "../views/auth/lock/Illustration.vue";
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import UserProfile from '../views/examplesApi/UserProfile/EditUserProfile.vue';
import ListCategoryPage from '../views/examplesApi/CategoryManagement/ListCategoryPage.vue';
import AddCategoryPage from '../views/examplesApi/CategoryManagement/AddCategoryPage.vue';
import EditCategoryPage from '../views/examplesApi/CategoryManagement/EditCategoryPage.vue';
import ListUserPage from '../views/examplesApi/UserManagement/ListUserPage.vue';
import AddUserPage from '../views/examplesApi/UserManagement/AddUserPage.vue';
import EditUserPage from '../views/examplesApi/UserManagement/EditUserPage.vue';
import ListRolePage from '../views/examplesApi/RoleManagement/ListRolePage.vue';
import AddRolePage from '../views/examplesApi/RoleManagement/AddRolePage.vue';
import EditRolePage from '../views/examplesApi/RoleManagement/EditRolePage.vue';
import ListTagPage from '../views/examplesApi/TagManagement/ListTagPage.vue';
import AddTagPage from '../views/examplesApi/TagManagement/AddTagPage.vue';
import EditTagPage from '../views/examplesApi/TagManagement/EditTagPage.vue';
import ListItemPage from '../views/examplesApi/ItemManagement/ListItemPage.vue';
import AddItemPage from '../views/examplesApi/ItemManagement/AddItemPage.vue';
import EditItemPage from '../views/examplesApi/ItemManagement/EditItemPage.vue';
import auth from '../middleware/auth';
import guest from '../middleware/guest';
import admin from "../middleware/admin";
import admin_creator from "../middleware/admin_creator";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboards/dashboard-default"
  },
  {
    path: "/dashboards/dashboard-default",
    name: "Default",
    component: Default,
    meta: {
      middleware: auth
    }
  },
  {
    path: "/dashboards/landing",
    name: "Landing",
    component: Landing
  },
  {
    path: "/dashboards/automotive",
    name: "Automotive",
    component: Automotive
  },
  {
    path: "/dashboards/smart-home",
    name: "Smart Home",
    component: SmartHome
  },
  {
    path: "/dashboards/vr/vr-default",
    name: "VR Default",
    component: VRDefault
  },
  {
    path: "/dashboards/vr/vr-info",
    name: "VR Info",
    component: VRInfo
  },
  {
    path: "/dashboards/crm",
    name: "CRM",
    component: CRM
  },
  {
    path: "/examples/user-profile",
    name: "User Profile",
    component: UserProfile,
    meta: {
      middleware: auth
    }
  },
  {
    path: "/examples/role-management/list-roles",
    name: "Role Management",
    component: ListRolePage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/role-management/add-role",
    name: "Add Role",
    component: AddRolePage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/role-management/edit-role/:id",
    name: "Edit Role",
    component: EditRolePage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/user-management/list-users",
    name: "User Management",
    component: ListUserPage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/user-management/add-user",
    name: "User Add",
    component: AddUserPage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/user-management/edit-user/:id",
    name: "Edit User",
    component: EditUserPage,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/examples/category-management/list-categories",
    name: "Category Management",
    component: ListCategoryPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/category-management/add-category",
    name: "Category Add",
    component: AddCategoryPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/category-management/edit-category/:id",
    name: "Category Edit",
    component: EditCategoryPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/tag-management/list-tags",
    name: "Tag Management",
    component: ListTagPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/tag-management/add-tag",
    name: "Add Tag",
    component: AddTagPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/tag-management/edit-tag/:id",
    name: "Edit Tag",
    component: EditTagPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/item-management/list-items",
    name: "Item Management",
    component: ListItemPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/item-management/add-item",
    name: "Add Item",
    component: AddItemPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/examples/item-management/edit-item/:id",
    name: "Edit Item",
    component: EditItemPage,
    meta: {
      middleware: [auth, admin_creator]
    }
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview
  },
  {
    path: "/pages/profile/teams",
    name: "Teams",
    component: Teams
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects
  },
  {
    path: "/pages/projects/general",
    name: "General",
    component: General
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline
  },
  {
    path: "/pages/projects/new-project",
    name: "New Project",
    component: NewProject
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing
  },
  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets
  },
  {
    path: "/pages/sweet-alerts",
    name: "Sweet Alerts",
    component: SweetAlerts
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/applications/analytics",
    name: "Analytics",
    component: Analytics
  },
  {
    path: "/ecommerce/overview",
    name: "Overview",
    component: EcommerceOverview
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage
  },
  {
    path: "/ecommerce/products/products-list",
    name: "Products List",
    component: ProductsList
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList
  },
  {
    path: "/ecommerce/referral",
    name: "Referral",
    component: Referral
  },
  {
    path: "/pages/users/reports",
    name: "Reports",
    component: Reports
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice
  },
  {
    path: "/pages/account/Security",
    name: "Security",
    component: Security
  },
  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration
  },
  {
    path: "/authentication/reset/basic",
    name: "Reset Basic",
    component: ResetBasic
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover
  },
  {
    path: "/authentication/reset/illustration",
    name: "Reset Illustration",
    component: ResetIllustration
  },
  {
    path: "/authentication/lock/basic",
    name: "Lock Basic",
    component: lockBasic
  },
  {
    path: "/authentication/lock/cover",
    name: "Lock Cover",
    component: lockCover
  },
  {
    path: "/authentication/lock/illustration",
    name: "Lock Illustration",
    component: lockIllustration
  },
  {
    path: "/authentication/verification/basic",
    name: "Verification Basic",
    component: VerificationBasic
  },
  {
    path: "/authentication/verification/cover",
    name: "Verification Cover",
    component: VerificationCover
  },
  {
    path: "/authentication/verification/illustration",
    name: "Verification Illustration",
    component: VerificationIllustration
  },
  {
    path: "/authentication/signup/basic",
    name: "Signup Basic",
    component: SignupBasic
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover
  },
  {
    path: "/authentication/signup/illustration",
    name: "Signup Illustration",
    component: SignupIllustration
  },
  {
    path: "/authentication/error/error404",
    name: "Error Error404",
    component: Error404
  },
  {
    path: "/authentication/error/error500",
    name: "Error Error500",
    component: Error500
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: guest
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      middleware: guest
    }
  },
  {
    path: "/password/forgot",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      middleware: guest
    }
  },
  {
    path: "/password/reset",
    name: "Reset Password",
    component: ResetPassword,
    meta: {
      middleware: guest
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active"
});

// Creates a nextMiddleware() function which not only
// runs the default next() callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default next() callback is returned.
  if (!subsequentMiddleware)
    return context.next;

  return (...parameters) => {
    // Run the default Vue Router next() callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // nextMiddleware() callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
    const context = { from, next, to, router };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
