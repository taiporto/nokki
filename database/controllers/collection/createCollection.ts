import "react-native-get-random-values";
import { InsertCollection, collections } from "../../../schema";
import { db } from "../../initDatabase";

export const createCollection = (collectionData: InsertCollection) => {
  return db
    .insert(collections)
    .values({ ...collectionData })
    .returning({ insertedId: collections.id });
};
