import { Collection, TableNames } from "../../../types";
import { db } from "../..";

export async function getAllCollections(): Promise<Collection[]> {
  try {
    return (await db.from(TableNames.COLLECTIONS).select())
      .data as Collection[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCollectionById(
  collectionId: number
): Promise<Collection | null> {
  try {
    const { data, error } = await db
      .from(TableNames.COLLECTIONS)
      .select()
      .eq("id", collectionId);

    if (error) throw error;

    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
