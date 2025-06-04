import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let products;
      if (search) {
        products = await storage.searchProducts(search as string);
      } else if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto" });
    }
  });

  // Create product
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Erro ao criar produto" });
    }
  });

  // Update product
  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Erro ao atualizar produto" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      
      res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar produto" });
    }
  });

  // GitHub file upload endpoint
  app.post("/api/upload", async (req, res) => {
    try {
      const { fileName, content, message } = req.body;
      
      if (!fileName || !content) {
        return res.status(400).json({ message: "Nome do arquivo e conteúdo são obrigatórios" });
      }

      const githubToken = process.env.GITHUB_TOKEN;
      const githubOwner = process.env.GITHUB_OWNER;
      const githubRepo = process.env.GITHUB_REPO;

      if (!githubToken || !githubOwner || !githubRepo) {
        return res.status(500).json({ 
          message: "Configuração do GitHub não encontrada. Configure GITHUB_TOKEN, GITHUB_OWNER e GITHUB_REPO nas variáveis de ambiente." 
        });
      }

      const path = `images/produtos/${fileName}`;
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`;

      // Verificar se o arquivo já existe
      let sha = null;
      try {
        const existingResponse = await fetch(githubApiUrl, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          sha = existingData.sha;
        }
      } catch (error) {
        // Arquivo não existe, isso é normal
      }

      // Upload do arquivo
      const uploadData = {
        message: message || `Upload de imagem: ${fileName}`,
        content: content,
        ...(sha && { sha })
      };

      const uploadResponse = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData)
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        return res.status(500).json({ 
          message: "Erro ao fazer upload no GitHub",
          error: errorData.message
        });
      }

      const result = await uploadResponse.json();
      
      // URL para GitHub Pages (raw content)
      const imageUrl = `https://${githubOwner}.github.io/${githubRepo}/images/produtos/${fileName}`;
      
      res.json({ 
        url: imageUrl,
        github_url: result.content.html_url
      });
    } catch (error) {
      console.error('GitHub upload error:', error);
      res.status(500).json({ message: "Erro interno ao fazer upload da imagem" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
