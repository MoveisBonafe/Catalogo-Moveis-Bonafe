import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({ selectedCategory, onCategoryChange }: CategoryNavProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant="ghost"
              onClick={() => onCategoryChange(category.slug)}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.slug
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {category.displayName}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
