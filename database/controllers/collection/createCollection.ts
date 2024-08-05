import "react-native-get-random-values";

import { InsertCollection, TableNames } from "../../../types";
import { db } from "../..";

export const createCollection = async (
  collectionData: InsertCollection
): Promise<{ insertedId: number } | null> => {
  try {
    const { data, error } = await db
      .from(TableNames.COLLECTIONS)
      .insert(collectionData)
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
