import { Database } from "./database.types";

export type Collection =
  Database["public"]["Tables"]["collections_table"]["Row"];

export type InsertCollection =
  Database["public"]["Tables"]["collections_table"]["Insert"];

export type Card = Database["public"]["Tables"]["cards_table"]["Row"];

export type InsertCard = Database["public"]["Tables"]["cards_table"]["Insert"];
