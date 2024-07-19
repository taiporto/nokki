import { Collection } from "../../../types";
import { db } from "../..";

export async function getAllCollections(): Promise<Collection[]> {
  try {
    return (await db.from("collections_table").select()).data as Collection[];
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
      .from("collections_table")
      .select()
      .eq("id", collectionId);

    if (error) throw error;

    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
