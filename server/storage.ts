import { 
  products, 
  categories, 
  cartItems,
  type Product, 
  type InsertProduct,
  type Category,
  type InsertCategory,
  type CartItem,
  type InsertCartItem
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentCartId: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentCartId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      { name: "all", slug: "all", displayName: "Todos" },
      { name: "electronics", slug: "electronics", displayName: "Eletrônicos" },
      { name: "clothing", slug: "clothing", displayName: "Roupas" },
      { name: "home", slug: "home", displayName: "Casa & Jardim" },
      { name: "sports", slug: "sports", displayName: "Esportes" },
      { name: "books", slug: "books", displayName: "Livros" },
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });

    // Seed products
    const productsData = [
      {
        name: "Fone de Ouvido Bluetooth Premium",
        description: "Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas e qualidade de som premium. Perfeito para música, calls e uso diário.",
        price: "299.90",
        originalPrice: "399.90",
        category: "electronics",
        brand: "TechSound",
        rating: "4.9",
        reviewCount: 127,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: true,
      },
      {
        name: "Tênis Casual Branco",
        description: "Tênis casual confortável para uso diário, feito com materiais de alta qualidade e design moderno.",
        price: "189.99",
        originalPrice: null,
        category: "clothing",
        brand: "StyleWalk",
        rating: "4.2",
        reviewCount: 89,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: false,
      },
      {
        name: "Notebook Ultra Slim 15\"",
        description: "Laptop ultrabook com processador Intel Core i7, 16GB RAM, SSD 512GB. Ideal para trabalho e estudos.",
        price: "2499.90",
        originalPrice: "2899.90",
        category: "electronics",
        brand: "TechPro",
        rating: "4.8",
        reviewCount: 203,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: true,
      },
      {
        name: "Relógio Clássico Couro",
        description: "Relógio elegante com pulseira de couro genuíno e movimento quartzo suíço. Perfeito para ocasiões especiais.",
        price: "459.90",
        originalPrice: null,
        category: "clothing",
        brand: "ClassicTime",
        rating: "4.5",
        reviewCount: 45,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: false,
      },
      {
        name: "Câmera Digital DSLR",
        description: "Câmera DSLR profissional com sensor de 24MP, gravação 4K e lente kit 18-55mm incluída.",
        price: "1899.90",
        originalPrice: "2299.90",
        category: "electronics",
        brand: "PhotoPro",
        rating: "4.7",
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: true,
      },
      {
        name: "Kit Livros Bestsellers",
        description: "Coleção com os 5 livros mais vendidos do ano. Inclui ficção, não-ficção e desenvolvimento pessoal.",
        price: "89.90",
        originalPrice: "129.90",
        category: "books",
        brand: "BookCollection",
        rating: "4.3",
        reviewCount: 78,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: false,
      },
      {
        name: "Smartphone Pro Max 128GB",
        description: "Smartphone flagship com câmera tripla de 108MP, tela AMOLED 6.7\", processador octa-core e 5G.",
        price: "3299.90",
        originalPrice: null,
        category: "electronics",
        brand: "MobileTech",
        rating: "4.9",
        reviewCount: 412,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: true,
      },
      {
        name: "Tênis Running Performance",
        description: "Tênis para corrida com tecnologia de amortecimento avançada, ideal para longas distâncias.",
        price: "249.90",
        originalPrice: "329.90",
        category: "sports",
        brand: "RunFast",
        rating: "4.4",
        reviewCount: 67,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"],
        inStock: true,
        featured: false,
      },
    ];

    productsData.forEach(prod => {
      const product: Product = { ...prod, id: this.currentProductId++ };
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === "all") {
      return this.getProducts();
    }
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm))
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
    
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      return { ...item, product };
    });
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertItem.productId && item.sessionId === insertItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentCartId++;
    const cartItem: CartItem = { ...insertItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries()).filter(
      ([_, item]) => item.sessionId === sessionId
    );
    
    itemsToRemove.forEach(([id]) => {
      this.cartItems.delete(id);
    });
  }
}

export const storage = new MemStorage();
