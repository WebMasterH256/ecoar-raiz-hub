import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Projeto Reiniciado</h1>
      <p className="text-muted-foreground">O projeto foi limpo e está pronto para um novo começo.</p>
    </div>
  )
}
