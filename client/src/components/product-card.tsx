import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { type Product } from "@shared/schema";
import { defaultColors } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  showActions?: boolean;
}

export function ProductCard({ 
  product, 
  onView, 
  onEdit, 
  onDelete, 
  showActions = false 
}: ProductCardProps) {
  const mainImage = product.image || "/placeholder-furniture.jpg";
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onView(product)}
    >
      <div className="relative">
        <img 
          src={mainImage}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {product.colors.slice(0, 4).map((colorValue) => {
              const color = defaultColors.find(c => c.value === colorValue);
              return (
                <div
                  key={colorValue}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-primary transition-colors cursor-pointer"
                  style={{ backgroundColor: color?.hex || '#gray' }}
                  title={color?.name}
                />
              );
            })}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-medium">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
              className="text-primary hover:text-primary-dark"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            {showActions && onEdit && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            
            {showActions && onDelete && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
