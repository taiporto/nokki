import { UpdateCard, TableNames } from "../../../types";
import { db } from "../..";

export const updateCard = async (
  cardId: UpdateCard["id"],
  newFieldData: UpdateCard
): Promise<{ updatedId: number } | null> => {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .update(newFieldData)
      .eq("id", cardId)
      .select();

    console.log(error);
    if (error) throw error;

    console.log(data);

    return { updatedId: data[0].id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateIsFavorite = async (
  cardId: UpdateCard["id"],
  isFavorite: boolean
): Promise<boolean | null> => {
  try {
    const { data, error } = await db
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
