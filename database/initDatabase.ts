import { ExpoSQLiteDatabase, drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite/next";

const expoDatabase = SQLite.openDatabaseSync("nokki.db");
export const db = drizzle(expoDatabase);

export function initDatabase(): ExpoSQLiteDatabase {
  return db;
}
