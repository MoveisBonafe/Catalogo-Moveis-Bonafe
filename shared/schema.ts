import { pgTable, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(),
  images: text("images").array().notNull().default([]),
  colors: jsonb("colors").notNull().default([]),
  features: text("features").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  category: z.string().min(1),
  images: z.array(z.string()).default([]),
  colors: z.array(z.object({
    name: z.string(),
    value: z.string(),
    hex: z.string()
  })).default([]),
  features: z.array(z.string()).default([])
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const categories = [
  "Sofás",
  "Poltronas", 
  "Mesas",
  "Cadeiras",
  "Estantes",
  "Camas",
  "Guarda-roupas",
  "Decoração"
] as const;

export type Category = typeof categories[number];