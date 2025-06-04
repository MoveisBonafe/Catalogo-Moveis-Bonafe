import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Phone, Share2, X } from "lucide-react";
import { type Product } from "@shared/schema";
import { defaultColors } from "@/lib/types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product) return null;

  const images = product.images.length > 0 ? product.images : ["/placeholder-furniture.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Carousel */}
          <div className="relative bg-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="relative h-96 lg:h-full">
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} - Imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={previousImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} - Miniatura ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer flex-shrink-0 transition-colors ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-gray-300 hover:border-primary"
                      }`}
                      onClick={() => selectImage(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="p-8 overflow-y-auto">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Descrição
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Cores Disponíveis
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((colorValue) => {
                    const color = defaultColors.find(c => c.value === colorValue);
                    return (
                      <Button
                        key={colorValue}
                        variant="outline"
                        size="sm"
                        className={`h-12 px-3 flex items-center gap-2 ${
                          selectedColor === colorValue
                            ? "border-primary bg-primary/10"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(colorValue)}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color?.hex }}
                        />
                        <span className="text-sm">{color?.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Especificações
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium text-foreground">{key}:</span>
                      <span className="text-muted-foreground ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
