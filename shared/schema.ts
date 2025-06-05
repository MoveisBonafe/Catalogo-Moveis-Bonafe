import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  images: text("images").array().notNull().default([]),
  colors: text("colors").array().notNull().default([]),
  specifications: json("specifications").$type<Record<string, string>>(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const categories = [
  "Sofás",
  "Poltronas", 
  "Mesas",
  "Cadeiras",
  "Estantes",
  "Camas"
] as const;

export type Category = typeof categories[number];
