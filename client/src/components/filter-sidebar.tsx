import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FilterSidebar() {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Filter */}
          <div>
            <h4 className="font-medium mb-3">Preço</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="price-1" />
                <Label htmlFor="price-1" className="text-sm">Até R$ 50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-2" />
                <Label htmlFor="price-2" className="text-sm">R$ 50 - R$ 100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-3" />
                <Label htmlFor="price-3" className="text-sm">R$ 100 - R$ 200</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-4" />
                <Label htmlFor="price-4" className="text-sm">Acima de R$ 200</Label>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium mb-3">Avaliação</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-5" />
                <Label htmlFor="rating-5" className="text-sm flex items-center">
                  <span className="text-amber-400">★★★★★</span>
                  <span className="ml-1">(5 estrelas)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-4" />
                <Label htmlFor="rating-4" className="text-sm flex items-center">
                  <span className="text-amber-400">★★★★</span><span className="text-slate-300">★</span>
                  <span className="ml-1">(4+ estrelas)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-3" />
                <Label htmlFor="rating-3" className="text-sm flex items-center">
                  <span className="text-amber-400">★★★</span><span className="text-slate-300">★★</span>
                  <span className="ml-1">(3+ estrelas)</span>
                </Label>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="font-medium mb-3">Marca</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-1" />
                <Label htmlFor="brand-1" className="text-sm">TechSound</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-2" />
                <Label htmlFor="brand-2" className="text-sm">StyleWalk</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-3" />
                <Label htmlFor="brand-3" className="text-sm">TechPro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-4" />
                <Label htmlFor="brand-4" className="text-sm">ClassicTime</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
