import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import "./styles.css";

// Handle SPA redirect from GitHub Pages 404.html
// The 404.html redirects to /?/<route> format
// We need to parse this and replace the URL before the router initializes
const handleGitHubPagesRedirect = () => {
  const l = window.location;
  if (l.search) {
    const query = l.search.slice(1); // Remove leading '?'
    if (query.startsWith('/')) {
      // This is a redirect from 404.html
      // Parse the route from the query string
      const route = query.replace(/~and~/g, '&');
      // Replace the URL with the intended route
      window.history.replaceState(null, '', '/sweet-krasnoyarsk' + route);
    }
  }
};

handleGitHubPagesRedirect();

const queryClient = new QueryClient();
const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
