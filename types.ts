import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export type TCollection = Tables<"collections">;

export type InsertCollection = TablesInsert<"collections">;

export type UpdateCollection = TablesUpdate<"collections">;

export type TCard = Tables<"cards">;

export type InsertCard = TablesInsert<"cards">;

export type UpdateCard = TablesUpdate<"cards">;

export enum TableNames {
  COLLECTIONS = "collections",
  CARDS = "cards",
}
