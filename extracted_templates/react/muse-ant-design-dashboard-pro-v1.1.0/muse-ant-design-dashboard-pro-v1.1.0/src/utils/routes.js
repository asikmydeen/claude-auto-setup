import DataTable from "../component/applications/DataTable";
import FullCalender from "../component/applications/FullCalender";
import Kanban from "../component/applications/Kanban";
import Wizard from "../component/applications/Wizard";
import Invoice from "../component/pages/account/Invoice";
import Settings from "../component/pages/account/Settings";
import Alerts from "../component/pages/Alerts";
import Billing from "../component/pages/Billing";
import ChartLine from "../component/pages/ChartLine";
import CRM from "../component/pages/CRM";
import OrderDetails from "../component/pages/ecommerce/order/OrderDetails";
import OrderList from "../component/pages/ecommerce/order/OrderList";
import EditProduct from "../component/pages/ecommerce/Products/EditProduct";
import NewProduct from "../component/pages/ecommerce/Products/NewProduct";
import ProductPage from "../component/pages/ecommerce/Products/ProductPage";
import Home from "../component/pages/Home";
import Notifications from "../component/pages/Notifications";
import Profile from "../component/pages/Profile";
import AllProject from "../component/pages/profile/AllProject";
import TimeLine from "../component/pages/projects/TimeLine";
import Rtl from "../component/pages/Rtl";
import NewUsers from "../component/pages/users/NewUsers";

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Default",
    component: Home,
  },
  {
    path: "/dashboard/crm",
    exact: true,
    name: "CRM",
    component: CRM,
  },
  {
    path: "/pages/profile/profile-overview",
    exact: true,
    name: "Profile Overview",
    component: Profile,
  },
  {
    path: "/pages/profile/all-projects",
    exact: true,
    name: "All Project",
    component: AllProject,
  },
  {
    path: "/pages/users/new-user",
    exact: true,
    name: "New User",
    component: NewUsers,
  },
  {
    path: "/pages/account/settings",
    exact: true,
    name: "Settings",
    component: Settings,
  },
  {
    path: "/pages/account/billing",
    exact: true,
    name: "Billing",
    component: Billing,
  },
  {
    path: "/pages/account/invoice",
    exact: true,
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/pages/projects/timeline",
    exact: true,
    name: "Timeline",
    component: TimeLine,
  },
  {
    path: "/pages/rtl",
    exact: true,
    name: "RTL",
    component: Rtl,
  },
  {
    path: "/pages/charts",
    exact: true,
    name: "Charts",
    component: ChartLine,
  },
  {
    path: "/pages/alerts",
    exact: true,
    name: "Alerts",
    component: Alerts,
  },
  {
    path: "/pages/notifications",
    exact: true,
    name: "Notification",
    component: Notifications,
  },
  {
    path: "/applications/kanban",
    exact: true,
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/applications/wizard",
    exact: true,
    name: "Wizard",
    component: Wizard,
  },
  {
    path: "/applications/data-table",
    exact: true,
    name: "DataTable",
    component: DataTable,
  },
  {
    path: "/applications/calendar",
    exact: true,
    name: "Calender",
    component: FullCalender,
  },
  {
    path: "/ecommerce/products/new-product",
    exact: true,
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/ecommerce/products/edit-product",
    exact: true,
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/ecommerce/products/product-page",
    exact: true,
    name: "Product Page",
    component: ProductPage,
  },
  {
    path: "/ecommerce/orders/order-list",
    exact: true,
    name: "Order List",
    component: OrderList,
  },
  {
    path: "/ecommerce/orders/order-details",
    exact: true,
    name: "Order List",
    component: OrderDetails,
  },
];

export default routes;
