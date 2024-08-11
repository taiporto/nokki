import { TCard, TableNames } from "../../../types";
import { db } from "../..";

export async function getAllCards(): Promise<TCard[]> {
  try {
    return (await db.from(TableNames.CARDS).select()).data as TCard[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCardById(cardId: number): Promise<TCard | null> {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .select()
      .eq("id", cardId);

    if (error) throw error;

    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCardsByCollectionId(
  collectionId: number
): Promise<TCard[]> {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .select()
      .eq("collection_id", collectionId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFavoriteCards(): Promise<TCard[]> {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .select()
      .eq("is_favorite", true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
