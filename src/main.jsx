import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { Router } from "./router/Router.jsx";
import { AuthProvider } from "./authProvider/AuthProvider.jsx";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-zinc-900 text-white border border-gray-700 shadow-xl",
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
