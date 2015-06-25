import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import {RouteStore} from 'fluxible-router';
import routes from './routes';

// create new fluxible trackr instance
const trackr = new Fluxible({ component: Application });
const AppRouteStore = RouteStore.withStaticRoutes(routes);

// register stores
trackr.registerStore(AppRouteStore);
trackr.registerStore(ApplicationStore);

export default trackr;
