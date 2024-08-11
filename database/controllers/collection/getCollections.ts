import { TCollection, TableNames } from "../../../types";
import { db } from "../..";

export async function getAllCollections(): Promise<TCollection[]> {
  try {
    return (await db.from(TableNames.COLLECTIONS).select())
      .data as TCollection[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCollectionById(
  collectionId: number
): Promise<TCollection | null> {
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
