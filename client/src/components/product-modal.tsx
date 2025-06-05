import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Detalhes do Produto
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg"
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
          
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">{product.name}</h3>
            <div className="flex items-center">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <span className="text-slate-500 ml-2">({product.reviewCount} avaliações)</span>
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
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    25% OFF
                  </span>
                </>
              )}
            </div>
            
            <p className="text-slate-600">{product.description}</p>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
