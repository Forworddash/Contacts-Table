import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import App from '../App';
import ContactDetails from '../components/contactdetails';

const rootRoute = createRootRoute({
  component: App,
});

const contactDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/:name',
  component: ContactDetails,
});

// this creates the router instance
const router = createRouter({
  routeTree: rootRoute.addChildren([contactDetailRoute]),
});

export default router;
