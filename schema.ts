import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const communicationcards = sqliteTable("communicationcards", {
  id: integer("id").primaryKey().notNull(),
  title: text("title").notNull(),
  content: text("content"),
  isFavorite: integer("is_favorite", { mode: "boolean" }),
  collectionId: integer("collection_id"),
});

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
export type Card = typeof communicationcards.$inferSelect;
export type InsertCard = typeof communicationcards.$inferInsert;
