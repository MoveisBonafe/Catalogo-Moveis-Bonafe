import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@shared/schema";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
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
            className={`text-sm ${
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

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-8 w-8 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-2 capitalize">{product.category}</p>
                <div className="flex items-center mb-2">
                  {renderStars(parseFloat(product.rating || "0"))}
                  <span className="text-xs text-slate-500 ml-1">({product.reviewCount})</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">{product.description}</p>
              </div>
              
              <div className="flex flex-col justify-between items-end">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-slate-800">
                      R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}
                    </span>
                    {discountPercentage && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      R$ {parseFloat(product.originalPrice).toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending || !product.inStock}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
          {discountPercentage && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-slate-500 mb-2 capitalize">{product.category}</p>
          <div className="flex items-center mb-2">
            {renderStars(parseFloat(product.rating || "0"))}
            <span className="text-xs text-slate-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-slate-800">
                R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through ml-2">
                  R$ {parseFloat(product.originalPrice).toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={addToCart.isPending || !product.inStock}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
