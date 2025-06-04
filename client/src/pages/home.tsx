import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";
import { ProductModal } from "@/components/product-modal";
import { categories, type Product } from "@shared/schema";
import { Search, ArrowDown } from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [, setLocation] = useLocation();
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Acesso discreto à administração com sequência de teclas
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const newSequence = [...keySequence, key].slice(-5); // Manter apenas os últimos 5
      setKeySequence(newSequence);

      // Sequência: "admin" para acessar a administração
      if (newSequence.join('') === 'admin') {
        setLocation('/gestao');
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence, setLocation]);

  const filteredProducts = (products as Product[]).filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="furniture-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Móveis que <span className="text-primary">Transformam</span> Ambientes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Descubra nossa coleção exclusiva de móveis modernos e funcionais para todos os ambientes da sua casa
          </p>
          <Button 
            size="lg" 
            className="text-lg font-semibold shadow-lg"
            onClick={scrollToCatalog}
          >
            <ArrowDown className="w-5 h-5 mr-2" />
            Ver Catálogo
          </Button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-sm sticky top-16 z-30" id="catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "secondary"}
                onClick={() => setSelectedCategory("all")}
                className="font-medium"
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  onClick={() => setSelectedCategory(category)}
                  className="font-medium"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar móveis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Nome A-Z</SelectItem>
                  <SelectItem value="name-desc">Nome Z-A</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={handleViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Nenhum produto encontrado
              </p>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou termo de busca
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-primary">Móveis</span>Design
              </h3>
              <p className="text-muted mb-4">
                Transformando ambientes com móveis de qualidade e design excepcional.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button 
                      className="text-muted hover:text-primary transition-colors duration-200"
                      onClick={() => {
                        setSelectedCategory(category);
                        scrollToCatalog();
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center">
                  <span className="text-primary mr-2">📞</span>
                  (11) 9999-9999
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✉️</span>
                  contato@moveisdesign.com
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">🕒</span>
                  Seg-Sex: 8h às 18h
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-muted mb-4">Receba novidades e ofertas especiais</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="rounded-r-none border-r-0 bg-background text-foreground"
                />
                <Button className="rounded-l-none">
                  📧
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-muted mt-8 pt-8 text-center text-muted">
            <p>© 2024 MóveisDesign. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
