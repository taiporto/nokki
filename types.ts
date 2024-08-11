import { Tables, TablesInsert } from "./database.types";

export type TCollection = Tables<"collections">;

export type InsertCollection = TablesInsert<"collections">;

export type TCard = Tables<"cards">;

export type InsertCard = TablesInsert<"cards">;

export enum TableNames {
  COLLECTIONS = "collections",
  CARDS = "cards",
}