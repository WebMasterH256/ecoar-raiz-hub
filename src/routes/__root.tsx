import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import React from "react";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  ),
});
