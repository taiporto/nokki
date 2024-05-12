import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { InsertCollection } from "../../../types";

export const createCollection = async (
  collectionData: InsertCollection
): Promise<{ insertedId: number } | null> => {
  try {
    const collections = JSON.parse(
      (await AsyncStorage.getItem("@collections")) || "[]"
    );
    const id = collections.length + 1;
    const uuid = uuidv4();
    await AsyncStorage.setItem(
      "@collections",
      JSON.stringify([...collections, { ...collectionData, id, uuid }])
    );
    return { insertedId: id };
  } catch (error) {
    console.error(error);
    return null;
  }
};
