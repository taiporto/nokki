import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
  id: integer("id").primaryKey().notNull(),
  uuid: text("uuid"),
  name: text("name").notNull(),
  description: text("description"),
});

export const cards = sqliteTable("cards", {
  id: integer("id").primaryKey().notNull(),
  uuid: text("uuid"),
  title: text("title").notNull(),
  content: text("content"),
  isFavorite: integer("is_favorite", { mode: "boolean" }),
  collectionId: integer("collection_id"),
});

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;
