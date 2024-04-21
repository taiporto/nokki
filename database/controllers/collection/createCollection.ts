import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { InsertCollection, collections } from "../../../schema";
import { db } from "../../initDatabase";

export const createCollection = (collectionData: InsertCollection) => {
  return db
    .insert(collections)
    .values({ ...collectionData, uuid: uuidv4() })
    .returning({ insertedId: collections.id });
};
