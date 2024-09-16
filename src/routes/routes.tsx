import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import App from '../App';
import FocusPage from '../components/focuspage';

// Define the root route
const rootRoute = createRootRoute({
  component: App,
});

// Define the contact route
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact/:name',
  component: FocusPage,
});

// Create the router instance
const router = createRouter({
  routeTree: rootRoute.addChildren([contactRoute]),
});

export default router;
