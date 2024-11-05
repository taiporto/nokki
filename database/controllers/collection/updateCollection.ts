import { db } from "../..";
import { TableNames, UpdateCollection } from "../../../types";

export const updateCollection = async (
  collectionId: UpdateCollection["id"],
  newFieldData: UpdateCollection
): Promise<boolean> => {
  try {
    const { status, error } = await db
      .from(TableNames.COLLECTIONS)
      .update(newFieldData)
      .eq("id", collectionId);

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
