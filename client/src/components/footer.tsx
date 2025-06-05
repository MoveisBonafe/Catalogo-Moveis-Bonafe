import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">StoreName</h3>
            <p className="text-sm">Encontre os melhores produtos com qualidade e preços incríveis. Sua satisfação é nossa prioridade.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Eletrônicos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roupas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Casa & Jardim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Esportes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entrega</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 StoreName. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
