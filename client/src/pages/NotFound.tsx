import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-bonafe-yellow mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe.
        </p>
        <Button onClick={() => window.location.href = "/"}>
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Catálogo
        </Button>
      </div>
    </div>
  );
}