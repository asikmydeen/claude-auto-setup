<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import Notifications from "svelte-notifications";
  import CustomNotification from "./components/NotificationPlugin/CustomNotification.svelte";
  console.log = console.warn = console.error = () => {};
</script>

<Notifications item={CustomNotification}>
  <Router {routes} />
</Notifications>
