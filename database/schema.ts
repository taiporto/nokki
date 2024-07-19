import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const collection = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const collectionsRelations = relations(collection, ({ many }) => ({
  card: many(card),
}));

export const card = pgTable("cards_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  isFavorite: boolean("is_favorite").notNull().default(false),
  collectionId: integer("collection_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cardRelations = relations(card, ({ one }) => ({
  collection: one(collection, {
    fields: [card.collectionId],
    references: [collection.id],
  }),
}));

export type InsertCollection = typeof collection.$inferInsert;
export type SelectCollection = typeof collection.$inferSelect;
export type InsertCard = typeof card.$inferInsert;
export type SelectCard = typeof card.$inferSelect;
