import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, ShoppingCart, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-slate-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">Produto não encontrado</h1>
              <p className="text-slate-600 mb-6">O produto que você está procurando não foi encontrado.</p>
              <Link href="/">
                <Button>Voltar para a loja</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart.mutate({
      productId: product.id,
      quantity,
    });
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < fullStars
                ? "text-amber-400"
                : i === fullStars && hasHalfStar
                ? "text-amber-400"
                : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg shadow-sm"
            />
            
            {product.images && product.images.length > 0 && (
              <div className="flex space-x-2 mt-4">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border-2 border-slate-200 hover:border-blue-500 cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                {renderStars(parseFloat(product.rating || "0"))}
                <span className="text-slate-500">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-slate-800">
                R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through">
                    R$ {parseFloat(product.originalPrice).toFixed(2).replace(".", ",")}
                  </span>
                  {discountPercentage && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </>
              )}
            </div>

            <p className="text-slate-600 text-lg">{product.description}</p>

            {product.brand && (
              <div>
                <span className="text-sm font-medium text-slate-500">Marca: </span>
                <span className="text-sm text-slate-700">{product.brand}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quantidade:
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700" 
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending || !product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addToCart.isPending ? "Adicionando..." : "Adicionar ao Carrinho"}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-red-600 font-medium">Produto fora de estoque</p>
              )}
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <Truck className="w-4 h-4 mr-2" />
                Frete grátis para compras acima de R$ 200
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                30 dias para troca e devolução
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
