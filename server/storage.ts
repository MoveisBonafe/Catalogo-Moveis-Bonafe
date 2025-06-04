import { products, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getProduct(id: number): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private currentId: number;

  constructor() {
    this.products = new Map();
    this.currentId = 1;
    this.initializeWithSampleData();
  }

  private initializeWithSampleData() {
    const sampleProducts = [
      {
        name: "Sofá Moderno Cinza",
        description: "Sofá de 3 lugares em tecido cinza claro com pés de madeira maciça. Design contemporâneo e muito confortável.",
        price: 2899.99,
        category: "Sofás",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
        colors: ["Cinza", "Bege", "Azul Marinho"]
      },
      {
        name: "Mesa de Jantar Rústica",
        description: "Mesa em madeira de demolição com capacidade para 6 pessoas. Acabamento natural preservando a textura original.",
        price: 1599.99,
        category: "Mesas",
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&q=80",
        colors: ["Natural", "Mogno"]
      },
      {
        name: "Cadeira Eames Moderna",
        description: "Cadeira inspirada no design clássico Eames com assento ergonômico e base giratória cromada.",
        price: 699.99,
        category: "Cadeiras",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80",
        colors: ["Branco", "Preto", "Vermelho"]
      },
      {
        name: "Estante Industrial",
        description: "Estante com estrutura em ferro e prateleiras de madeira maciça. Estilo industrial moderno.",
        price: 1299.99,
        category: "Estantes",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
        colors: ["Preto", "Cobre"]
      },
      {
        name: "Cama Box Queen",
        description: "Cama box queen size com colchão de molas ensacadas e cabeceira estofada em tecido.",
        price: 2199.99,
        category: "Camas",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
        colors: ["Bege", "Cinza Escuro"]
      },
      {
        name: "Rack para TV",
        description: "Rack suspenso para TV até 55 polegadas com compartimentos para equipamentos e cabo organizado.",
        price: 899.99,
        category: "Racks",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
        colors: ["Branco", "Preto", "Madeira"]
      }
    ];

    sampleProducts.forEach((product, index) => {
      const productWithId = { ...product, id: index + 1 };
      this.products.set(productWithId.id, productWithId);
    });
    this.currentId = sampleProducts.length + 1;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateProduct: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...existing, ...updateProduct };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
