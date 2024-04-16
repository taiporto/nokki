import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import { Collection } from "../types";

const DATABASE_PATH = "./nokki.db";

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  const asset = await Asset.fromModule(require(DATABASE_PATH)).downloadAsync();
  await FileSystem.copyAsync({
    from: asset.localUri || "",
    to: FileSystem.documentDirectory + "SQLite/nokki.db",
  });
  return SQLite.openDatabase("nokki.db");
}

export const createCollection = async (
  data: Collection,
  successCallback?: (id?: number) => void,
  errorCallback?: (error: any) => void
) => {
  const db = await openDatabase();

  console.log(data);
  console.log("Creating collection");

  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO collections (name, description) VALUES (?, ?)`,
        [data.name, data.description],
        (_, { insertId }) => {
          console.log(insertId);
          const collectionId = insertId;
          if (!collectionId) throw new Error("Collection id not found");
          console.log("Collection created with id: ", collectionId);
          successCallback?.(collectionId);
          return collectionId;
        },
        (_, error) => {
          console.error(error);
          throw error;
        }
      );
    });
  } catch (error) {
    console.error("Error creating collection: ", error);
    errorCallback?.(error);
  }
};
