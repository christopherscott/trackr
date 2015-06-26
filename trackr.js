import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import { RouteStore } from 'fluxible-router';
import routes from './routes';

// 1. create route store
const AppRouteStore = RouteStore.withStaticRoutes(routes);

// 2. create new fluxible trackr instance
const trackr = new Fluxible({ component: Application });

// 3. register stores
trackr.registerStore(AppRouteStore);
trackr.registerStore(ApplicationStore);

export default trackr;
