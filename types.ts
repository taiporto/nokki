import { Tables, TablesInsert } from "./database.types";

export type Collection = Tables<"collections">;

export type InsertCollection = TablesInsert<"collections">;

export type Card = Tables<"cards">;

export type InsertCard = TablesInsert<"cards">;
