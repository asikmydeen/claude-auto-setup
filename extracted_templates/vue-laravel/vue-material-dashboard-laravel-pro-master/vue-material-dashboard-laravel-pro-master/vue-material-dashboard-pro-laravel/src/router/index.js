import { createRouter, createWebHistory } from "vue-router";
import Default from "../views/dashboards/Default.vue";
import Sales from "../views/dashboards/Sales.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Projects from "../views/pages/profile/Projects.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/products/EditProduct.vue";
import ProductPage from "../views/ecommerce/products/ProductPage.vue";
import OrderDetails from "../views/ecommerce/orders/OrderDetails";
import OrderList from "../views/ecommerce/orders/OrderList";
import NewUser from "../views/pages/users/NewUser.vue";
import Settings from "../views/pages/account/Settings.vue";
import Billing from "../views/pages/account/Billing.vue";
import Invoice from "../views/pages/account/Invoice.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import PasswordForgot from "../views/PasswordForgot.vue";
import PasswordReset from "../views/PasswordReset.vue";
import UserProfile from "../views/examples-api/user-profile/UserProfile.vue";
import RolesList from "../views/examples-api/roles/RolesList.vue";
import EditRole from "../views/examples-api/roles/EditRole.vue";
import AddRole from "../views/examples-api/roles/AddRole.vue";
import UsersList from "../views/examples-api/users/UsersList.vue";
import EditUser from "../views/examples-api/users/edit-user/EditUser.vue";
import AddUser from "../views/examples-api/users/add-user/AddUser.vue";
import TagsList from "../views/examples-api/tags/TagsList.vue";
import AddTag from "../views/examples-api/tags/AddTag.vue";
import EditTag from "../views/examples-api/tags/EditTag.vue";
import CategoriesList from "../views/examples-api/categories/CategoriesList.vue";
import AddCategory from "../views/examples-api/categories/AddCategory.vue";
import EditCategory from "../views/examples-api/categories/EditCategory.vue";
import ItemsList from "../views/examples-api/items/ItemsList.vue";
import AddItem from "../views/examples-api/items/AddItem.vue";
import EditItem from "../views/examples-api/items/EditItem.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },
  {
    path: "/dashboards/dashboard-default",
    name: "Default",
    component: Default,
  },
  {
    path: "/dashboards/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview,
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects,
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing,
  },
  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts,
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets,
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard,
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables,
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage,
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails,
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList,
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser,
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover,
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration,
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover,
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authRequired: false,
      permission: null
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      authRequired: false,
      permission: null
    }
  },
  {
    path: "/password-forgot",
    name: "PasswordForgot",
    component: PasswordForgot,
    meta: {
      authRequired: false,
      permission: null
    }
  },
  {
    path: "/password-reset",
    name: "PasswordReset",
    component: PasswordReset,
    meta: {
      authRequired: false,
      permission: null
    }
  },
  {
    path: "/examples/user-profile",
    name: "User Profile",
    component: UserProfile,
    meta: {
      authRequired: true,
      permission: null
    }
  },
  {
    path: "/examples/roles-list",
    name: "Roles List",
    component: RolesList,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/add-role",
    name: "Add Role",
    component: AddRole,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/edit-role",
    name: "Edit Role",
    component: EditRole,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/users-list",
    name: "Users List",
    component: UsersList,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/add-user",
    name: "Add User",
    component: AddUser,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/edit-user",
    name: "Edit User",
    component: EditUser,
    meta: {
      authRequired: true,
      permission: ['admin']
    }
  },
  {
    path: "/examples/tags-list",
    name: "Tags List",
    component: TagsList,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/add-tag",
    name: "Add Tag",
    component: AddTag,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/edit-tag",
    name: "Edit Tag",
    component: EditTag,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/categories-list",
    name: "Categories List",
    component: CategoriesList,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/add-category",
    name: "Add Category",
    component: AddCategory,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/edit-category",
    name: "Edit Category",
    component: EditCategory,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/items-list",
    name: "Items List",
    component: ItemsList,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/add-item",
    name: "Add Item",
    component: AddItem,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
  {
    path: "/examples/edit-item",
    name: "Edit Item",
    component: EditItem,
    meta: {
      authRequired: true,
      permission: ['admin', 'creator']
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

//eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {

  const { authRequired, permission } = to.meta;

  const isLoggedIn = store.getters['auth/isLoggedIn'];

  if (authRequired) {

    //if trying to access a page that requires authentication but not logged in, redirect to login page
    if (!isLoggedIn) {
      return next({ name: 'Login', query: { returnUrl: to.path } });
    }


    //if trying to access a page that requires permission, redirect to dashboard
    if (permission) {
      try {
        await store.dispatch('profile/getProfile')
        const userPermission = (store.getters['profile/getUserProfile']).roles[0].name;
        if (!permission.includes(userPermission)) {
          return next({ name: 'Default', query: { returnUrl: to.path } });
        }
      }catch(error){
        try{
          store.dispatch('auth/logout');
        }finally{
          // eslint-disable-next-line no-unsafe-finally
          return next({name: "Login"});
        }
      }
    }

  }
  next();
})

export default router;
