import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.querySelector('main');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Descubra Produtos Incríveis</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">Encontre exatamente o que você procura</p>
          <Button 
            onClick={scrollToProducts}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 text-lg"
          >
            Ver Produtos
          </Button>
        </div>
      </div>
    </section>
  );
}
