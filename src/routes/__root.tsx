import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'
import './styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Projeto Reiniciado</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
      </body>
    </html>
  )
}
