import Header from "@/components/header";
import Hero from "@/components/hero";
import CategoryNav from "@/components/category-nav";
import ProductGrid from "@/components/product-grid";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <CategoryNav 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid 
          category={selectedCategory} 
          searchQuery={searchQuery} 
        />
      </main>
      <Footer />
    </div>
  );
}
