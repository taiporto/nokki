import { db } from "../..";
import { TableNames, TCard } from "../../../types";

export async function deleteCardById(cardId: number): Promise<TCard | null> {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .delete()
      .eq("id", cardId);

    if (error) throw error;

    return data?.[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
