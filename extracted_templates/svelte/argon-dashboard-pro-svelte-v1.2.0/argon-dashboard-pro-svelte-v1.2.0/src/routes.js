import Login from './views/public/login.svelte'
import PublicIndex from './views/public/index.svelte'
import PublicLayout from './views/public/layout.svelte'
import Lock from "./views/public/lock.svelte";
import Register from "./views/public/register.svelte";
import Pricing from "./views/public/pricing.svelte";

// Dashboard
import DashboardLayout from './views/dashboard/layout.svelte';
import DashboardIndex from './views/dashboard/index.svelte';
import Charts from './views/dashboard/charts.svelte';
import Widgets from './views/dashboard/widgets.svelte';
import Alternative from './views/dashboard/alternativeDashboard.svelte';
// pages
import TimeLinePage from './views/dashboard/pages/timeLinePage.svelte';
import UserProfile from './views/dashboard/pages/userProfile.svelte';
//components
import Buttons from "./views/dashboard/components/buttons.svelte";
import Cards from "./views/dashboard/components/cards.svelte";
import GridSystem from "./views/dashboard/components/gridSystem.svelte";
import Icons from "./views/dashboard/components/icons.svelte";
import Notifications from "./views/dashboard/components/notifications.svelte";
import Typography from "./views/dashboard/components/typography.svelte";
//forms
import FormElements from "./views/dashboard/Forms/formElements.svelte";
import FormComponents from "./views/dashboard/Forms/formComponents.svelte";
import FormValidation from "./views/dashboard/Forms/formValidation.svelte";
//tables
import RegularTables from "./views/dashboard/Tables/regularTables.svelte";
import PaginatedTables from "./views/dashboard/Tables/paginatedTables.svelte";
import SortableTables from "./views/dashboard/Tables/sortableTables.svelte";
//maps
import GoogleMaps from "./views/dashboard/Maps/googleMaps.svelte";
import VectorMaps from "./views/dashboard/Maps/vectorMaps.svelte";
//calendar
import Calendar from "./views/dashboard/calendar.svelte";

//404 page
import NotFoundPage from "./views/dashboard/NotFoundPage.svelte";
const routes = [{
        name: '/',
        component: PublicLayout,
        nestedRoutes: [
            { name: 'index', component: PublicIndex }
        ]
    },
    { name: 'login', component: Login, layout: PublicLayout },
    { name: 'lock', component: Lock, layout: PublicLayout },
    { name: 'register', component: Register, layout: PublicLayout },
    { name: 'pricing', component: Pricing, layout: PublicLayout },
    { name: '404', path: '404', component: NotFoundPage, layout: PublicLayout },
    {
        name: 'dashboard',
        component: DashboardLayout,
        nestedRoutes: [
            { name: 'index', component: DashboardIndex },
            { name: 'alternative', component: Alternative },
            { name: 'charts', component: Charts },
            { name: 'widgets', component: Widgets },
            { name: 'pages', component: TimeLinePage },
            { name: 'pages/user', component: UserProfile },
            { name: 'components', component: Buttons },
            { name: 'components/cards', component: Cards },
            { name: 'components/grid-system', component: GridSystem },
            { name: 'components/notifications', component: Notifications },
            { name: 'components/icons', component: Icons },
            { name: 'components/typography', component: Typography },
            { name: 'forms', component: FormElements },
            { name: 'forms/components', component: FormComponents },
            { name: 'forms/validation', component: FormValidation },
            { name: 'tables', component: RegularTables },
            { name: 'tables/sortable', component: SortableTables },
            { name: 'tables/paginated', component: PaginatedTables },
            { name: 'maps', component: GoogleMaps },
            { name: 'maps/vector', component: VectorMaps },
            { name: 'calendar', component: Calendar },
        ]
    }
]

export { routes }