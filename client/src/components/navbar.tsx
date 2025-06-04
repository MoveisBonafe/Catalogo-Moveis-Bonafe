import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Store, Settings } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = location.startsWith("/admin");

  return (
    <nav className="bg-white shadow-lg border-b-2 border-primary sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground">
                <span className="text-primary">Móveis</span>Design
              </h1>
            </Link>
            
            {/* Mostrar navegação completa apenas no admin */}
            {isAdmin && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <Button 
                      variant="secondary"
                      className="font-medium"
                    >
                      <Store className="w-4 h-4 mr-2" />
                      Ver Catálogo
                    </Button>
                  </Link>
                  <Button 
                    variant="default"
                    className="font-medium"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Administração
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Menu mobile apenas no admin */}
          {isAdmin && (
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Store className="w-4 h-4 mr-2" />
                        Ver Catálogo
                      </Button>
                    </Link>
                    <Button 
                      variant="default"
                      className="w-full justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Administração
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
