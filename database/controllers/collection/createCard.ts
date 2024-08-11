import "react-native-get-random-values";

import { InsertCard, TableNames } from "../../../types";
import { db } from "../..";

export const createCard = async (
  cardData: InsertCard
): Promise<{ insertedId: number } | null> => {
  try {
    const { data, error } = await db
      .from(TableNames.CARDS)
      .insert(cardData)
      .select();

    console.log(error);
    if (error) throw error;

    console.log(data);

    return { insertedId: data[0].id };
  } catch (error) {
    console.error(error);
    return null;
  }
};
