import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import App from '../App';
import ContactDetails from '../components/contactdetails';

// Define the root route
const rootRoute = createRootRoute({
  component: App,
});

// Define the contact route
const contactDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/:name',
  component: ContactDetails,
});


// Create the router instance
const router = createRouter({
  routeTree: rootRoute.addChildren([contactDetailRoute]),
});

console.log('router', router);

export default router;
