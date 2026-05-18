import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/react-start'
import * as React from 'react'
import './styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <Meta />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
