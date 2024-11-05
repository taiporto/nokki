import { UpdateCard, TableNames } from "../../../types";
import { db } from "../..";

export const updateCard = async (
  cardId: UpdateCard["id"],
  newFieldData: UpdateCard
): Promise<boolean> => {
  try {
    const { status, error } = await db
      .from(TableNames.CARDS)
      .update(newFieldData)
      .eq("id", cardId);

    if (error) {
      throw error;
    }

    if ([200, 204].includes(status)) return true;

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateIsFavorite = async (
  cardId: UpdateCard["id"],
  isFavorite: boolean
): Promise<boolean | null> => {
  try {
    const { error } = await db
      .from(TableNames.CARDS)
      .update({ is_favorite: isFavorite })
      .eq("id", cardId)
      .select();

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};
