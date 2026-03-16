import {
  CodeFilled,
  AppstoreFilled,
  DollarCircleFilled,
  LockFilled,
  ReadFilled,
  RocketFilled,
  SwitcherFilled,
  DashboardFilled,
} from "@ant-design/icons";
const menuItems = {
  items: [
    {
      id: "null0",
      title: "",
      className: "d-none",
      type: "group",
      children: [
        {
          id: "das",
          title: <span className="label">Dashboard</span>,
          type: "collapse",
          icon: (isSelected, color) => (
            <DashboardFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          children: [
            {
              id: "default",
              title: "Default",
              type: "item",
              url: "/dashboard",
            },
            {
              id: "crm",
              title: "CRM",
              type: "item",
              url: "/dashboard/crm",
            },
          ],
        },
      ],
    },
    {
      id: "page",
      title: "PAGES",
      type: "group",
      children: [
        {
          id: "pages",
          title: <span className="label">Pages</span>,
          type: "collapse",
          icon: (isSelected, color) => (
            <CodeFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          children: [
            {
              id: "profile",
              title: "Profile",
              type: "collapse",
              children: [
                {
                  id: "profile-overview",
                  title: "Profile Overview",
                  type: "item",
                  url: "/pages/profile/profile-overview",
                },
                {
                  id: "all-projects",
                  title: "All Projects",
                  type: "item",
                  url: "/pages/profile/all-projects",
                },
              ],
            },
            {
              id: "users",
              title: "Users",
              type: "collapse",
              children: [
                {
                  id: "new-user",
                  title: "New User",
                  type: "item",
                  url: "/pages/users/new-user",
                },
              ],
            },
            {
              id: "account",
              title: "Account",
              type: "collapse",
              children: [
                {
                  id: "settings",
                  title: "Settings",
                  type: "item",
                  url: "/pages/account/settings",
                },
                {
                  id: "billing",
                  title: "Billing",
                  type: "item",
                  url: "/pages/account/billing",
                },
                {
                  id: "invoice",
                  title: "Invoice",
                  type: "item",
                  url: "/pages/account/invoice",
                },
              ],
            },
            {
              id: "projects",
              title: "Projects",
              type: "collapse",
              children: [
                {
                  id: "timeline",
                  title: "Timeline",
                  type: "item",
                  url: "/pages/projects/timeline",
                },
              ],
            },
            {
              id: "pricing",
              title: "Pricing",
              type: "item",
              url: "/pages/pricing",
            },
            {
              id: "rtl",
              title: "RTL",
              type: "item",
              url: "/pages/rtl",
            },
            {
              id: "charts",
              title: "Charts",
              type: "item",
              url: "/pages/charts",
            },
            {
              id: "alerts",
              title: "Alerts",
              type: "item",
              url: "/pages/alerts",
            },
            {
              id: "notifications",
              title: "Notifications",
              type: "item",
              url: "/pages/notifications",
            },
          ],
        },
        {
          id: "applications",
          title: <span className="label">Applications</span>,
          type: "collapse",
          icon: (isSelected, color) => (
            <AppstoreFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          children: [
            {
              id: "kanban",
              title: "Kanban",
              type: "item",
              url: "/applications/kanban",
            },
            {
              id: "wizard",
              title: "Wizard",
              type: "item",
              url: "/applications/wizard",
            },
            {
              id: "data-table",
              title: "DataTable",
              type: "item",
              url: "/applications/data-table",
            },
            {
              id: "calendar",
              title: "Calendar",
              type: "item",
              url: "/applications/calendar",
            },
          ],
        },
        {
          id: "ecommerce",
          title: <span className="label">Ecommerce</span>,
          type: "collapse",
          icon: (isSelected, color) => (
            <DollarCircleFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          children: [
            {
              id: "products",
              title: "Products",
              type: "collapse",
              children: [
                {
                  id: "new-product",
                  title: "New Product",

                  type: "item",
                  url: "/ecommerce/products/new-product",
                },
                {
                  id: "edit-product",
                  title: "Edit Product",

                  type: "item",
                  url: "/ecommerce/products/edit-product",
                },
                {
                  id: "product-page",
                  title: "Product Page",

                  type: "item",
                  url: "/ecommerce/products/product-page",
                },
              ],
            },
            {
              id: "orders",
              title: "Orders",
              type: "collapse",
              children: [
                {
                  id: "order-list",
                  title: "Order List",

                  type: "item",
                  url: "/ecommerce/orders/order-list",
                },
                {
                  id: "order-details",
                  title: "Order Details",
                  type: "item",
                  url: "/ecommerce/orders/order-details",
                },
              ],
            },
          ],
        },
        {
          id: "authentication",
          title: <span className="label">Authentication</span>,
          type: "collapse",
          icon: (isSelected, color) => (
            <LockFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          children: [
            {
              id: "sign-up",
              title: "Sign Up",
              type: "collapse",
              children: [
                {
                  id: "basic",
                  title: "Basic",
                  type: "item",
                  url: "/authentication/sign-up/basic",
                },
                {
                  id: "cover",
                  title: "Cover",
                  type: "item",
                  url: "/authentication/sign-up/cover",
                },
                {
                  id: "illustration",
                  title: "Illustration",
                  type: "item",
                  url: "/authentication/sign-up/illustration",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "docs",
      title: "DOCS",
      type: "group",
      children: [
        {
          id: "getting-started",
          title: "Getting Started",
          type: "item",
          icon: (isSelected, color) => (
            <ReadFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          url: "http://digimonk.net:1618/overview",
          target: "_blank",
        },
        {
          id: "components",
          title: "Components",
          type: "item",
          icon: (isSelected, color) => (
            <RocketFilled
              className="icon"
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          url: "http://digimonk.net:1618/alert",
          target: "_blank",
        },
        {
          id: "changelog",
          title: "Changelog",
          type: "item",
          icon: (isSelected, color) => (
            <SwitcherFilled
              className="icon "
              style={{
                background: isSelected ? color : "",
              }}
            />
          ),
          url: "https://github.com/digimonktech/musedocs",
          target: "_blank",
        },
      ],
    },
  ],
};

export default menuItems;
